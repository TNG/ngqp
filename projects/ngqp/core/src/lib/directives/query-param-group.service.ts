import { Inject, Injectable, isDevMode, OnDestroy, Optional } from '@angular/core';
import { Params } from '@angular/router';
import { EMPTY, from, Observable, Subject } from 'rxjs';
import { catchError, concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { isMissing } from '../util';
import { Unpack } from '../types';
import { QueryParamGroup } from '../model/query-param-group';
import { QueryParam } from '../model/query-param';
import { NGQP_ROUTER_ADAPTER, NGQP_ROUTER_OPTIONS, RouterAdapter, RouterOptions } from '../router-adapter/router-adapter.interface';
import { QueryParamNameDirective } from './query-param-name.directive';

/** @internal */
function isMultiQueryParam<T>(queryParam: QueryParam<T> | QueryParam<T[]>): queryParam is QueryParam<T[]> {
    return queryParam.multi;
}

/** @internal */
function hasArrayValue<T>(queryParam: QueryParam<T> | QueryParam<T[]>, value: T | T[]): value is T[] {
    return isMultiQueryParam(queryParam);
}

/** @internal */
function hasArraySerialization(queryParam: QueryParam<any>, values: string | string[] | null): values is string[] {
    return isMultiQueryParam(queryParam);
}

/**
 * Service implementing the synchronization logic
 *
 * This service is the key to the synchronization process by binding a {@link QueryParamGroup}
 * to the router.
 *
 * @internal
 */
@Injectable()
export class QueryParamGroupService implements OnDestroy {

    /** The {@link QueryParamGroup} to bind. */
    private queryParamGroup: QueryParamGroup;

    /** List of {@link QueryParamNameDirective} directives registered to this service. */
    private directives: QueryParamNameDirective[] = [];

    /**
     * Queue of navigation parameters
     *
     * A queue is used for navigations as we need to make sure all parameter changes
     * are executed in sequence as otherwise navigations might overwrite each other.
     */
    private queue$ = new Subject<Params>();

    /** @ignore */
    private destroy$ = new Subject<void>();

    constructor(
        @Inject(NGQP_ROUTER_ADAPTER) private routerAdapter: RouterAdapter,
        @Optional() @Inject(NGQP_ROUTER_OPTIONS) private globalRouterOptions: RouterOptions
    ) {
        this.setupNavigationQueue();
    }

    /** @ignore */
    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * Uses the given {@link QueryParamGroup} for synchronization.
     */
    public setQueryParamGroup(queryParamGroup: QueryParamGroup): void {
        // FIXME: If this is called when we already have a group, we probably need to do
        //        some cleanup first.
        if (this.queryParamGroup) {
            throw new Error(`A QueryParamGroup has already been setup. Changing the group is currently not supported.`);
        }

        this.queryParamGroup = queryParamGroup;
        this.startSynchronization();
    }

    /**
     * Registers a {@link QueryParamNameDirective} directive.
     */
    public addQueryParam(directive: QueryParamNameDirective): void {
        const queryParam: QueryParam<any> = this.queryParamGroup.get(directive.name);
        if (!queryParam) {
            throw new Error(`Could not find query param with name ${directive.name}. Did you forget to add it to your QueryParamGroup?`);
        }
        if (!directive.valueAccessor) {
            throw new Error(`No value accessor found for the form control. Please make sure to implement ControlValueAccessor on this component.`);
        }

        // Chances are that we read the initial route before a directive has been registered here.
        // The value in the model will be correct, but we need to sync it to the view once initially.
        directive.valueAccessor.writeValue(queryParam.value);

        // Proxy updates from the view to debounce them (if needed).
        const debouncedQueue$ = new Subject<any>();
        debouncedQueue$.pipe(
            !isMissing(queryParam.debounceTime) ? debounceTime(queryParam.debounceTime) : tap(),
            map((newValue: any) => this.getParamsForValue(queryParam, newValue)),
            takeUntil(this.destroy$),
        ).subscribe(params => this.enqueueNavigation(params));

        directive.valueAccessor.registerOnChange((newValue: any) => debouncedQueue$.next(newValue));

        this.directives.push(directive);
    }

    /**
     * Deregisters a {@link QueryParamNameDirective} directive.
     */
    public removeQueryParam(directive: QueryParamNameDirective): void {
        const index = this.directives.indexOf(directive);
        if (index === -1) {
            return;
        }

        this.directives.splice(index, 1);
    }

    private startSynchronization() {
        this.setupGroupChangeListener();
        this.setupParamChangeListeners();
        this.setupRouterListener();
    }

    /** Listens for programmatic changes on group level and synchronizes to the router. */
    private setupGroupChangeListener() {
        this.queryParamGroup._registerOnChange((value: Record<string, any>) => {
            let params: Params = {};
            Object.keys(value).forEach(queryParamName => {
                const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
                if (isMissing(queryParam)) {
                    return;
                }

                params = { ...params, ...this.getParamsForValue(queryParam, value[ queryParamName ]) };
            });

            this.enqueueNavigation(params);
        });
    }

    /** Listens for programmatic changes on parameter level and synchronizes to the router. */
    private setupParamChangeListeners() {
        Object.keys(this.queryParamGroup.queryParams).forEach(queryParamName => {
            const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
            queryParam._registerOnChange((newValue: any) =>
                this.enqueueNavigation(this.getParamsForValue(queryParam, newValue))
            );
        });
    }

    /** Listens for changes in the router and synchronizes to the model. */
    private setupRouterListener() {
        this.routerAdapter.queryParamMap.subscribe(queryParamMap => {
            Object.keys(this.queryParamGroup.queryParams).forEach(queryParamName => {
                const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
                const newValue = queryParam.multi
                    ? this.deserialize(queryParam, queryParamMap.getAll(queryParam.param))
                    : this.deserialize(queryParam, queryParamMap.get(queryParam.param));

                // Get the directive, if it has been initialized yet.
                const directive = this.directives.find(dir => dir.name === queryParamName);
                if (!isMissing(directive)) {
                    directive.valueAccessor.writeValue(newValue);
                }

                queryParam.value = newValue;
                queryParam._updateValue({ emitEvent: true, onlySelf: true });
            });

            // We used onlySelf on the queryParams so that we can emit only once on the entire group.
            this.queryParamGroup._updateValue({ emitEvent: true });
        });
    }

    /** Subscribes to the parameter queue and executes navigations in sequence. */
    private setupNavigationQueue() {
        this.queue$.pipe(
            takeUntil(this.destroy$),
            concatMap(params => this.navigateSafely(params)),
        ).subscribe();
    }

    private navigateSafely(params: Params): Observable<any> {
        return from(this.routerAdapter.navigate(params, this.routerOptions)).pipe(
            catchError((err: any) => {
                if (isDevMode()) {
                    console.error(`There was an error while navigating`, err);
                }

                return EMPTY;
            })
        );
    }

    /** Sends a change of parameters to the queue. */
    private enqueueNavigation(params: Params): void {
        this.queue$.next(params);
    }

    /**
     * Returns the full set of parameters given a value for a parameter model.
     *
     * This consists mainly of properly serializing the model value and ensuring to take
     * side effect changes into account that may have been configured.
     */
    private getParamsForValue<T>(queryParam: QueryParam<any>, value: T | undefined | null): Params {
        const newValue = this.serialize(queryParam, value);

        const combinedParams: Params = isMissing(queryParam.combineWith)
            ? {} : queryParam.combineWith(queryParam.value, value);

        // Note that we list the side-effect parameters first so that our actual parameter can't be
        // overriden by it.
        return {
            ...(combinedParams || {}),
            [ queryParam.param ]: newValue,
        };
    }

    private serialize<T>(queryParam: QueryParam<any>, value: T): string | string[] {
        if (hasArrayValue(queryParam, value)) {
            return (value || []).map(queryParam.serialize);
        } else {
            return queryParam.serialize(value);
        }
    }

    private deserialize<T>(queryParam: QueryParam<T>, values: string | string[]): Unpack<T> | Unpack<T>[] {
        if (hasArraySerialization(queryParam, values)) {
            return values.map(queryParam.deserialize);
        } else {
            return queryParam.deserialize(values);
        }
    }

    /**
     * Returns the current set of options to pass to the router.
     *
     * This merges the global configuration with the group specific configuration.
     */
    private get routerOptions(): RouterOptions {
        const groupOptions = this.queryParamGroup ? this.queryParamGroup.routerOptions : {};

        return {
            ...(this.globalRouterOptions || {}),
            ...groupOptions,
        };
    }

}
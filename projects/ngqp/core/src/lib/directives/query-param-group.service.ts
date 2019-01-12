import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
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

/** @internal */
@Injectable()
export class QueryParamGroupService implements OnDestroy {

    private queryParamGroup: QueryParamGroup;
    private directives: QueryParamNameDirective[] = [];

    private queue$ = new Subject<Params>();
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

    public setQueryParamGroup(queryParamGroup: QueryParamGroup): void {
        this.queryParamGroup = queryParamGroup;
        this.startSynchronization();
    }

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

    private startSynchronization() {
        this.setupGroupChangeListener();
        this.setupParamChangeListeners();
        this.setupRouterListener();
    }

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

    private setupParamChangeListeners() {
        Object.keys(this.queryParamGroup.queryParams).forEach(queryParamName => {
            const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
            queryParam._registerOnChange((newValue: any) =>
                this.enqueueNavigation(this.getParamsForValue(queryParam, newValue))
            );
        });
    }

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

    private setupNavigationQueue() {
        this.queue$.pipe(
            takeUntil(this.destroy$),
            concatMap(params => this.routerAdapter.navigate(params, this.routerOptions)),
        ).subscribe();
    }

    private enqueueNavigation(params: Params): void {
        this.queue$.next(params);
    }

    private getParamsForValue<T>(queryParam: QueryParam<any>, value: T | undefined | null): Params {
        const newValue = this.serialize(queryParam, value);

        const combinedParams: Params = isMissing(queryParam.combineWith)
            ? {} : queryParam.combineWith(queryParam.value, value);

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

    private get routerOptions(): RouterOptions {
        const groupOptions = this.queryParamGroup ? this.queryParamGroup.routerOptions : {};

        return {
            ...(this.globalRouterOptions || {}),
            ...groupOptions,
        };
    }

}
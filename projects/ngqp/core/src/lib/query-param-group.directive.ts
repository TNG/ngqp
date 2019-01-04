import { Directive, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { NGQP_ROUTER_ADAPTER, NGQP_ROUTER_OPTIONS, RouterAdapter, RouterAdapterOptions } from './router-adapter/router-adapter.interface';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParam, QueryParamGroup, QueryParamGroupValue, Unpack } from './model';
import { isMissing } from './util';

/** TODO Documentation */
function isMultiQueryParam<T>(queryParam: QueryParam<T | T[]>): queryParam is QueryParam<T[]> {
    return queryParam.multi;
}

/** TODO Documentation */
function hasArrayValue<T>(queryParam: QueryParam<T | T[]>, value: T | T[]): value is T[] {
    return isMultiQueryParam(queryParam);
}

/** TODO Documentation */
function hasArraySerialization<T>(queryParam: QueryParam<T | T[]>, values: string | string[]): values is string[] {
    return isMultiQueryParam(queryParam);
}

/**
 * TODO Documentation
 */
@Directive({
    selector: '[queryParamGroup]',
})
export class QueryParamGroupDirective implements OnInit, OnDestroy {

    /** TODO Documentation */
    @Input('queryParamGroup')
    public queryParamGroup: QueryParamGroup;

    /** TODO Documentation */
    private directives: QueryParamNameDirective[] = [];

    /** TODO Documentation @internal */
    private queue$ = new Subject<Params>();
    private destroy$ = new Subject<void>();

    constructor(
        @Inject(NGQP_ROUTER_ADAPTER) private routerAdapter: RouterAdapter,
        @Optional() @Inject(NGQP_ROUTER_OPTIONS) private globalRouterOptions: RouterAdapterOptions
    ) {
        this.setupNavigationQueue();
    }

    public ngOnInit() {
        if (!this.queryParamGroup) {
            throw new Error(`You added the queryParamGroup directive, but haven't supplied a group to use.`);
        }

        this.queryParamGroup._registerOnChange((value: QueryParamGroupValue) => {
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

        Object.keys(this.queryParamGroup.queryParams).forEach(queryParamName => {
            const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
            queryParam._registerOnChange((newValue: any) =>
                this.enqueueNavigation(this.getParamsForValue(queryParam, newValue))
            );
        });

        this.routerAdapter.queryParamMap.subscribe(queryParamMap => {
            Object.keys(this.queryParamGroup.queryParams).forEach(queryParamName => {
                const queryParam: QueryParam<any> = this.queryParamGroup.get(queryParamName);
                const newValue = this.deserialize(queryParam,
                    queryParam.multi ? queryParamMap.getAll(queryParam.param) : queryParamMap.get(queryParam.param)
                );

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

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /**
     * TODO Documentation
     * @internal
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
     * TODO Documentation
     * @internal
     */
    private setupNavigationQueue() {
        this.queue$.pipe(
            takeUntil(this.destroy$),
            concatMap(params => this.routerAdapter.navigate(params, this.routerOptions)),
        ).subscribe();
    }

    private enqueueNavigation(params: Params): void {
        this.queue$.next(params);
    }

    private getParamsForValue<T = any>(queryParam: QueryParam<T | T[]>, value: T): Params {
        const newValue = this.serialize(queryParam, value);

        const combinedParams: Params = isMissing(queryParam.combineWith)
            ? {} : queryParam.combineWith(queryParam.value, value);

        return {
            ...combinedParams,
            [ queryParam.param ]: newValue,
        };
    }

    private serialize<T = any>(queryParam: QueryParam<T | T[]>, value: T): string | string[] {
        return hasArrayValue(queryParam, value)
            ? (value || <T[]>[]).map(queryParam.serialize)
            : queryParam.serialize(value);
    }

    private deserialize<T = any>(queryParam: QueryParam<T>, values: string | string[]): Unpack<T> | Unpack<T>[] {
        if (hasArraySerialization(queryParam, values)) {
            return values.map(queryParam.deserialize);
        } else {
            return queryParam.deserialize(values);
        }
    }

    private get routerOptions(): RouterAdapterOptions {
        const groupOptions = this.queryParamGroup ? this.queryParamGroup.routerOptions : {};

        return {
            ...this.globalRouterOptions,
            ...groupOptions,
        };
    }

}
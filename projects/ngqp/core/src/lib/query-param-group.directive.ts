import { Directive, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { NGQP_ROUTER_ADAPTER, NGQP_ROUTER_OPTIONS, RouterAdapter, RouterAdapterOptions } from './router-adapter/router-adapter.interface';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamControl, QueryParamGroup, QueryParamGroupValue, Unpack } from './model';
import { isMissing } from './util';

/** TODO Documentation */
function isMultiControl<T>(control: QueryParamControl<T | T[]>): control is QueryParamControl<T[]> {
    return control.multi;
}

/** TODO Documentation */
function hasArrayModel<T>(control: QueryParamControl<T | T[]>, model: T | T[]): model is T[] {
    return isMultiControl(control);
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
            Object.keys(value).forEach(controlName => {
                const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
                if (isMissing(control)) {
                    return;
                }

                params = { ...params, ...this.getParamsForModel(control, value[ controlName ]) };
            });

            this.enqueueNavigation(params);
        });

        Object.keys(this.queryParamGroup.controls).forEach(controlName => {
            const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
            control._registerOnChange((newModel: any) =>
                this.enqueueNavigation(this.getParamsForModel(control, newModel))
            );
        });

        this.routerAdapter.queryParamMap.subscribe(queryParamMap => {
            Object.keys(this.queryParamGroup.controls).forEach(controlName => {
                const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
                const newModel = this.deserialize(control,
                    control.multi ? queryParamMap.getAll(control.name) : queryParamMap.get(control.name)
                );

                // Get the directive, if it has been initialized yet.
                const directive = this.directives.find(dir => dir.name === controlName);
                if (!isMissing(directive)) {
                    directive.valueAccessor.writeValue(newModel);
                }

                control.value = newModel;
                control._updateValue({ emitEvent: true, onlySelf: true });
            });

            // We used onlySelf on the controls so that we can emit only once on the entire group.
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
    public addControl(directive: QueryParamNameDirective): void {
        const control: QueryParamControl<any> = this.queryParamGroup.get(directive.name);
        if (!control) {
            throw new Error(`Could not find control ${directive.name}. Did you forget to add it to your QueryParamGroup?`);
        }
        if (!directive.valueAccessor) {
            throw new Error(`No value accessor found for the control. Please make sure to implement ControlValueAccessor on this component.`);
        }

        // Chances are that we read the initial route before a directive has been registered here.
        // The value in the control will be correct, but we need to sync it to the view once initially.
        directive.valueAccessor.writeValue(control.value);

        // Proxy updates from the view to debounce them (if needed).
        const debouncedQueue$ = new Subject<any>();
        debouncedQueue$.pipe(
            !isMissing(control.debounceTime) ? debounceTime(control.debounceTime) : tap(),
            map((newModel: any) => this.getParamsForModel(control, newModel)),
            takeUntil(this.destroy$),
        ).subscribe(params => this.enqueueNavigation(params));

        directive.valueAccessor.registerOnChange((newModel: any) => debouncedQueue$.next(newModel));

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

    private getParamsForModel<T = any>(control: QueryParamControl<T | T[]>, model: T): Params {
        const newValue = this.serialize(control, model);

        const combinedParams: Params = isMissing(control.combineWith)
            ? {} : control.combineWith(control.value, model);

        return {
            ...combinedParams,
            [ control.name ]: newValue,
        };
    }

    private serialize<T = any>(control: QueryParamControl<T | T[]>, model: T): string[] {
        return hasArrayModel(control, model)
            ? (model || <T[]>[]).map(control.serialize)
            : [control.serialize(model)];
    }

    private deserialize<T = any>(control: QueryParamControl<T>, values: string | string[]): Unpack<T> | Unpack<T>[] {
        if (Array.isArray(values)) {
            return values.map(control.deserialize);
        } else {
            return control.deserialize(values);
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
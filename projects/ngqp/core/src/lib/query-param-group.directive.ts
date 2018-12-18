import { Directive, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { NGQP_ROUTER_ADAPTER, RouterAdapter } from './router-adapter/router-adapter.interface';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamControl, QueryParamGroup, QueryParamGroupValue } from './model';
import { isMissing } from './util';

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

    constructor(@Inject(NGQP_ROUTER_ADAPTER) private routerAdapter: RouterAdapter) {
        this.setupNavigationQueue();
    }

    public ngOnInit() {
        if (!this.queryParamGroup) {
            throw new Error(`You added the queryParamGroup directive, but haven't supplied a group to use.`);
        }

        this.queryParamGroup._registerOnChange((value: QueryParamGroupValue) => {
            const params: Params = {};
            Object.keys(value).forEach(controlName => {
                const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
                if (isMissing(control)) {
                    return;
                }

                params[ control.name ] = control.serialize(value[ controlName ]);
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
                const newModel = control.deserialize(queryParamMap.get(control.name));

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
        const paramQueue$ = new Subject<Params>();
        paramQueue$.pipe(
            !isMissing(control.debounceTime) ? debounceTime(control.debounceTime) : tap(),
            takeUntil(this.destroy$),
        ).subscribe(params => this.enqueueNavigation(params));

        directive.valueAccessor.registerOnChange((newModel: any) =>
            paramQueue$.next(this.getParamsForModel(control, newModel))
        );

        this.directives.push(directive);
    }

    /**
     * TODO Documentation
     * @internal
     */
    private setupNavigationQueue() {
        this.queue$.pipe(
            takeUntil(this.destroy$),
            concatMap(params => this.routerAdapter.navigate(params)),
        ).subscribe();
    }

    private enqueueNavigation(params: Params): void {
        this.queue$.next(params);
    }

    private getParamsForModel(control: QueryParamControl<any>, model: any): Params {
        return {
            [ control.name ]: control.serialize(model)
        };
    }

}

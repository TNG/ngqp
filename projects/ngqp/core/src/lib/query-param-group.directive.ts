import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamControl, QueryParamGroup } from './model';
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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.setupNavigationQueue();
    }

    public ngOnInit() {
        Object.keys(this.queryParamGroup.controls).forEach(controlName => {
            const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
            control.registerOnChange((newModel: any) => this.enqueueNavigation(this.getParamsForModel(control, newModel)));
        });

        this.route.queryParamMap.subscribe(queryParamMap => {
            Object.keys(this.queryParamGroup.controls).forEach(controlName => {
                const control: QueryParamControl<any> = this.queryParamGroup.get(controlName);
                const newModel = control.deserialize(queryParamMap.get(control.name));

                // Get the directive, if it has been initialized yet.
                const directive = this.directives.find(dir => dir.name === controlName);
                if (!isMissing(directive)) {
                    directive.valueAccessor.writeValue(newModel);
                }

                control.value = newModel;
                control.updateValue({ emitEvent: true, onlySelf: true });
            });

            // We used onlySelf on the controls so that we can emit only once on the entire group.
            this.queryParamGroup.updateValue({ emitEvent: true });
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

        // We proxy updates from the view to debounce them (if needed).
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
            concatMap(params => this.router.navigate([], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
                queryParams: params,
            })),
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

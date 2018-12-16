import { Directive, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamControl, QueryParamGroup } from './model';
import { isMissing } from './util';

/**
 * TODO Documentation
 */
@Directive({
    selector: '[queryParamGroup]',
})
export class QueryParamGroupDirective implements OnDestroy {

    /** TODO Documentation */
    @Input('queryParamGroup')
    public queryParamGroup: QueryParamGroup;

    /** TODO Documentation */
    private directives: QueryParamNameDirective[] = [];

    /** TODO Documentation */
    private queue$ = new Subject<Params>();
    private destroy$ = new Subject<void>();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.setupNavigationQueue();
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public addControl(directive: QueryParamNameDirective): void {
        const control: QueryParamControl<any> = this.queryParamGroup.controls[directive.name];
        if (!control) {
            throw new Error(`Could not find control ${directive.name}. Did you forget to add it to your QueryParamGroup?`);
        }
        if (!directive.valueAccessor) {
            throw new Error(`No value accessor found for the control. Please make sure to implement ControlValueAccessor on this component.`);
        }

        // Use the name defined in the control, but fall back to the name given
        // to the control itself otherwise.
        const paramName = control.name || directive.name;

        const paramQueue$ = new Subject<Params>();
        paramQueue$.pipe(
            !isMissing(control.debounceTime) ? debounceTime(control.debounceTime) : tap(),
            takeUntil(this.destroy$),
        ).subscribe(params => this.enqueueNavigation(params));

        // View -> Model
        directive.valueAccessor.registerOnChange((newModel: any) => {
            paramQueue$.next({
                [paramName]: control.serialize(newModel)
            });
        });

        // Model -> View
        this.route.queryParamMap.pipe(
            map(queryParamMap => queryParamMap.get(paramName)),
            distinctUntilChanged(),
            map(param => control.deserialize(param)),
        ).subscribe(newModel => {
            // TODO We can probably replace this with the history state in Angular 7.2.0+
            if (control.compareWith(newModel, control.value)) {
                return;
            }

            directive.valueAccessor.writeValue(newModel);
            control.value = newModel;
        });

        this.directives.push(directive);
    }

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

}

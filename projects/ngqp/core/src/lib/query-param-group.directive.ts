import { Directive, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { concatMap, map, takeUntil } from 'rxjs/operators';
import { QueryParamControl, QueryParamGroup } from './model';
import { QueryParamNameDirective } from './query-param-name.directive';

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

        directive.valueAccessor.writeValue(control.initialValue);

        // View -> Model
        directive.valueAccessor.registerOnChange((newModel: any) => {
            this.enqueueNavigation({
                [control.name]: control.serialize(newModel)
            });
        });

        // Model -> View
        this.route.queryParamMap.pipe(
            map(queryParamMap => queryParamMap.get(control.name)),
            map(param => control.deserialize(param)),
        ).subscribe(newModel => {
            if (control.serialize(newModel) === control.serialize(control.value)) {
                return;
            }

            directive.valueAccessor.writeValue(newModel);
            control.value = newModel;
        });

        this.directives.push(directive);
    }

    private setupNavigationQueue() {
        // TODO Use bufferReduceMap (https://stackoverflow.com/questions/53732408)
        this.queue$.pipe(
            takeUntil(this.destroy$),
            concatMap(params => this.router.navigate([], {
                relativeTo: this.route,
                queryParamsHandling: 'merge',
                // TODO Allow specifying skipLocationChange / replaceUrl
                queryParams: params,
            })),
        ).subscribe();
    }

    private enqueueNavigation(params: Params): void {
        this.queue$.next(params);
    }

}

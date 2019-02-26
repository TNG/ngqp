import { Directive, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core';
import { QueryParamGroupService } from './query-param-group.service';
import { QueryParamAccessor } from './query-param-accessor.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { selectValueAccessor } from '../accessors/util';
import { QueryParam } from '../model/query-param';
import { QueryParamGroup } from '../model/query-param-group';

/**
 * Binds a {@link QueryParam} to a component directly.
 *
 * This directive accepts a {@link QueryParam} without requiring an outer {@link QueryParamGroup}.
 * It binds this parameter to the host component, which is required to have a [ControlValueAccessor]
 * {@link https://angular.io/api/forms/ControlValueAccessor}.
 */
@Directive({
    selector: '[queryParam]',
    providers: [QueryParamGroupService],
})
export class QueryParamDirective implements QueryParamAccessor, OnChanges, OnDestroy  {

    /**
     * The {@link QueryParam} to bind to the host component.
     */
    @Input('queryParam')
    public queryParam: QueryParam<any>;

    /** @internal */
    public readonly name = 'param';

    /** @internal */
    public valueAccessor: ControlValueAccessor | null = null;

    constructor(
        @Optional() private groupService: QueryParamGroupService,
        @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
    ) {
        this.valueAccessor = selectValueAccessor(valueAccessors);
    }

    /** @ignore */
    public ngOnChanges(changes: SimpleChanges): void {
        const paramChange = changes['queryParam'];

        if (paramChange) {
            if (!paramChange.firstChange) {
                throw new Error('Changing the QueryParam bound in standalone mode is currently not supported.');
            }

            if (paramChange.currentValue) {
                this.groupService.setQueryParamGroup(new QueryParamGroup({[this.name]: paramChange.currentValue}));
                this.groupService.registerQueryParamDirective(this);
            }
        }
    }

    /** @ignore */
    public ngOnDestroy(): void {
        if (this.groupService) {
            this.groupService.deregisterQueryParamDirective(this.name);
        }
    }

}
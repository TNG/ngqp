import { Directive, Inject, Input, OnChanges, OnDestroy, Optional, Self, SimpleChanges } from '@angular/core';
import { QueryParamGroupService } from './query-param-group.service';
import { QueryParamAccessor } from './query-param-accessor.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { selectValueAccessor } from '../accessors/util';
import { QueryParam } from '../model/query-param';
import { QueryParamGroup } from '../model/query-param-group';

/**
 * Binds a standalone {@link QueryParam} to a DOM element.
 *
 * This directive accepts a {@link QueryParam} without having outer {@link QueryParamGroup}.
 * It binds this parameter to the host element, which is required to have a [ControlValueAccessor]
 * {@link https://angular.io/api/forms/ControlValueAccessor}.
 */
@Directive({
    selector: '[queryParam]',
    providers: [QueryParamGroupService],
})
export class QueryParamDirective implements QueryParamAccessor, OnChanges, OnDestroy  {

    /**
     * Reference to standalone {@link QueryParam} instance.
     * Note that this does not refer to the [parameter name]{@link QueryParam#urlParam}.
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
        const nameChange = changes['queryParam'];

        if (nameChange) {
            if (!nameChange.firstChange) {
                throw new Error('Changing the QueryParam bound in standalone mode is currently not supported.');
            }

            if (nameChange.currentValue) {
                this.groupService.setQueryParamGroup(new QueryParamGroup({[this.name]: nameChange.currentValue}));
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
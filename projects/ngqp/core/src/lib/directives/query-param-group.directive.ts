import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroup } from '../model/query-param-group';
import { QueryParamGroupService } from './query-param-group.service';

/**
 * Binds a {@link QueryParamGroup} to a DOM element.
 *
 * This directive accepts an instance of {@link QueryParamGroup}. Any child using
 * {@link QueryParamNameDirective} will then be matched against this group, and the
 * synchronization process can take place.
 */
@Directive({
    selector: '[queryParamGroup]',
    providers: [QueryParamGroupService],
})
export class QueryParamGroupDirective implements OnChanges {

    /**
     * The {@link QueryParamGroup} to bind.
     */
    @Input('queryParamGroup')
    public queryParamGroup: QueryParamGroup | null = null;

    /** @internal */
    constructor(private groupService: QueryParamGroupService) {
    }

    /** @ignore */
    public ngOnChanges(changes: SimpleChanges) {
        const groupChange = changes['queryParamGroup'];
        if (groupChange) {
            if (!groupChange.firstChange) {
                throw new Error(`Binding a different QueryParamGroup during runtime is currently not supported.`);
            }

            const queryParamGroup = groupChange.currentValue;
            if (!queryParamGroup) {
                throw new Error(`You added the queryParamGroup directive, but haven't supplied a group to use.`);
            }

            this.groupService.setQueryParamGroup(queryParamGroup);
        }
    }

}
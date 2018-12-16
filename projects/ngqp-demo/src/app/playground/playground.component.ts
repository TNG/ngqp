import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

@Component({
    templateUrl: './playground.component.html',
})
export class PlaygroundComponent {

    public paramGroup: QueryParamGroup;

    constructor(private queryParamBuilder: QueryParamBuilder) {
        this.paramGroup = queryParamBuilder.group({
            searchText: queryParamBuilder.param({
                name: 'q'
            }),
        });
    }

}

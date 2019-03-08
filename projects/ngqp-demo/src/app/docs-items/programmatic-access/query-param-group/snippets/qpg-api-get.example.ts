import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParam, QueryParamGroup } from '@ngqp/core';

@Component({ selector: 'app-example' })
export class ExampleComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            searchText: qpb.stringParam('q'),
        });

        const searchText: QueryParam<string> = this.paramGroup.get('searchText') as QueryParam<string>;
    }

}
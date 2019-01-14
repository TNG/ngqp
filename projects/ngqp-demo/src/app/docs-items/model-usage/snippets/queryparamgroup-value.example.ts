import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

@Component({ selector: 'app-example' })
export class ExampleComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            myParam: qpb.stringParam('q'),
        });

        const value = this.paramGroup.value;
        console.log(value.myParam);
    }

}
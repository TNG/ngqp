import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParam } from '@ngqp/core';

@Component({ selector: 'app-example' })
export class ExampleComponent {

    public param: QueryParam<string>;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');

        console.log(this.param.value);
    }

}
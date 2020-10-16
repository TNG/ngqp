import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParam } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-standalone-example',
    templateUrl: './standalone-example.component.html',
})
export class StandaloneExampleComponent {

    public param: QueryParam<string>;

    public markup = require('!raw-loader!./standalone-example.component.html').default;
    public typescript = require('!raw-loader!./standalone-example.component.ts').default;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');
    }

}

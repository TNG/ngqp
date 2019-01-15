import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-debounce-time-example',
    templateUrl: './debounce-time-example.component.html',
})
export class DebounceTimeExampleComponent {

    public paramGroup: QueryParamGroup;

    public markup = require('!raw-loader!./debounce-time-example.component.html');
    public typescript = require('!raw-loader!./debounce-time-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            searchText: qpb.stringParam('q', {
                debounceTime: 1000,
            }),
        });
    }

}

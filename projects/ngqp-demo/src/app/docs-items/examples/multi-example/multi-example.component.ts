import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-multi-example',
    templateUrl: './multi-example.component.html',
})
export class MultiExampleComponent {

    public paramGroup: QueryParamGroup;
    public fruits: string[] = [ 'Apple', 'Banana', 'Strawberry', 'Raspberry', 'Mango', 'Passion Fruit', 'Orange' ];

    public markup = require('!raw-loader!./multi-example.component.html');
    public typescript = require('!raw-loader!./multi-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            selectedFruit: qpb.stringParam('fruit', {
                multi: true,
            }),
        });
    }

}

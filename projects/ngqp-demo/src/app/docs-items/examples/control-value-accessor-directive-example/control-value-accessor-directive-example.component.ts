import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-control-value-accessor-directive-example',
    templateUrl: './control-value-accessor-directive-example.component.html',
})
export class ControlValueAccessorDirectiveExampleComponent {

    public paramGroup: QueryParamGroup;

    public markup = require('!raw-loader!./control-value-accessor-directive-example.component.html');
    public typescript = require('!raw-loader!./control-value-accessor-directive-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            page: qpb.numberParam('page', {
                emptyOn: 1,
            }),
        });
    }

}

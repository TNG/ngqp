import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-add-remove-parameter-example',
    templateUrl: './add-remove-parameter-example.component.html',
})
export class AddRemoveParameterExampleComponent {

    public paramGroup: QueryParamGroup;

    public markup = require('!raw-loader!./add-remove-parameter-example.component.html');
    public typescript = require('!raw-loader!./add-remove-parameter-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({});

        // Let's activate it by default
        this.toggleParam();
    }

    public get hasParam(): boolean {
        return !!this.paramGroup.get('param');
    }

    public toggleParam() {
        if (this.hasParam) {
            this.paramGroup.remove('param');
        } else {
            const param = this.qpb.stringParam('q');
            this.paramGroup.add('param', param);
        }
    }

}

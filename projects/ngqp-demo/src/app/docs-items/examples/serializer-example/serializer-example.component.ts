import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-serializer-example',
    templateUrl: './serializer-example.component.html',
})
export class SerializerExampleComponent {

    public paramGroup: QueryParamGroup;

    public markup = require('!raw-loader!./serializer-example.component.html');
    public typescript = require('!raw-loader!./serializer-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            status: qpb.booleanParam('status', {
                serialize: (value: boolean): string => value ? 'active' : 'inactive',
                deserialize: (value: string): boolean => !value || value === 'active',
            }),
        });
    }

}

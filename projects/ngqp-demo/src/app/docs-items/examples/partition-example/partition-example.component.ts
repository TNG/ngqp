import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'partition-example',
    templateUrl: './partition-example.component.html',
})
export class PartitionExampleComponent {

    public paramGroup: QueryParamGroup;

    public markup = require('!raw-loader!./partition-example.component.html');
    public typescript = require('!raw-loader!./partition-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            sorting: qpb.partition([
                qpb.stringParam('sortBy', {
                    emptyOn: 'name',
                }),
                qpb.booleanParam('ascending', {
                    emptyOn: true,
                }),
            ], {
                partition: (value: string) => {
                    const parts = value.split('_');
                    return [parts[0], parts[1] === 'asc'];
                },
                reduce: ([sortBy, asc]) => `${sortBy}_${asc ? 'asc' : 'desc'}`,
            }),
        });
    }

}

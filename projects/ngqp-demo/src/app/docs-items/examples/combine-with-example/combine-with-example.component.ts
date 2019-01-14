import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-combine-with-example',
    templateUrl: './combine-with-example.component.html',
})
export class CombineWithExampleComponent {

    public paramGroup: QueryParamGroup;
    public fruits: string[] = [ 'Apple', 'Banana', 'Strawberry', 'Raspberry', 'Mango', 'Passion Fruit', 'Orange' ];

    public markup = require('!raw-loader!./combine-with-example.component.html');
    public typescript = require('!raw-loader!./combine-with-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            textInput: qpb.stringParam('q', {
                combineWith: (previousValue: string, value: string) => {
                    if (!this.fruits.includes(value)) {
                        return null;
                    }

                    return { 'fruit': value };
                },
            }),
            selectedFruit: qpb.stringParam('fruit'),
        });
    }

}

import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParam } from '@ngqp/core';

@Component({
    selector: 'app-example',
    template: `<input type="text" [queryParam]="param" />`,
})
export class ExampleComponent {

    public param: QueryParam<string>;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');
    }

}
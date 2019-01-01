import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
  selector: 'demo-replace-url-example',
  templateUrl: './replace-url-example.component.html',
})
export class ReplaceUrlExampleComponent {

    public replaceParamGroup: QueryParamGroup;
    public noReplaceParamGroup: QueryParamGroup;

    public markup = require('!raw-loader!./replace-url-example.component.html');
    public typescript = require('!raw-loader!./replace-url-example.component.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.replaceParamGroup = this.qpb.group({
            text: 'q1',
        }, { replaceUrl: true });

        this.noReplaceParamGroup = this.qpb.group({
            text: 'q2',
        }, { replaceUrl: false });
    }

}

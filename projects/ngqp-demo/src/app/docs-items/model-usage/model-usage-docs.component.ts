import { Component } from '@angular/core';
import { DocsPage } from '../../docs-page';

declare const require: Function;

@Component({
    selector: 'demo-model-usage-docs',
    templateUrl: './model-usage-docs.component.html',
})
export class ModelUsageDocsComponent {

    public DocsPage = DocsPage;

    public qpgGetSnippet = require('!raw-loader!./snippets/queryparamgroup-get.example.ts');
    public qpgValueSnippet = require('!raw-loader!./snippets/queryparamgroup-value.example.ts');
    public qpgValueChangesSnippet = require('!raw-loader!./snippets/queryparamgroup-valuechanges.example.ts');

}

import { Component } from '@angular/core';
import { DocsPage } from '../../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './query-param-programmatic-access-docs.component.html',
})
export class QueryParamProgrammaticAccessDocsComponent {

    public readonly DocsPage = DocsPage;

    public readonly valueSnippet = require('!raw-loader!./snippets/qp-api-value.example.ts');
    public readonly valueChangesSnippet = require('!raw-loader!./snippets/qp-api-valueChanges.example.ts');
    public readonly setValueSnippet = require('!raw-loader!./snippets/qp-api-setValue.example.ts');

}
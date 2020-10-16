import { Component } from '@angular/core';
import { DocsPage } from '../../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './query-param-group-programmatic-access-docs.component.html',
})
export class QueryParamGroupProgrammaticAccessDocsComponent {

    public readonly DocsPage = DocsPage;

    public readonly getSnippet = require('!raw-loader!./snippets/qpg-api-get.example.ts').default;
    public readonly valueSnippet = require('!raw-loader!./snippets/qpg-api-value.example.ts').default;
    public readonly valueChangesSnippet = require('!raw-loader!./snippets/qpg-api-valueChanges.example.ts').default;


}
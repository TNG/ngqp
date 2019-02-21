import { Component } from '@angular/core';
import { DocsPage } from '../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './standalone-query-param-docs.component.html',
})
export class StandaloneQueryParamDocsComponent {

    public DocsPage = DocsPage;

    public standaloneQueryParamSnippet = require('!raw-loader!./snippets/standalone-query-param.example.ts');

}

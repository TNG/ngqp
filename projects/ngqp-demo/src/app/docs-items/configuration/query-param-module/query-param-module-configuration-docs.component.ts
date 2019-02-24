import { Component } from '@angular/core';
import { DocsPage } from '../../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './query-param-module-configuration-docs.component.html',
})
export class QueryParamModuleConfigurationDocsComponent {

    public readonly DocsPage = DocsPage;

    public readonly withConfigSnippet = require('!raw-loader!./snippets/qpm-with-config.example.ts');
    public readonly replaceUrlConfigSnippet = require('!raw-loader!./snippets/qpm-config-replaceUrl.example.ts');
    public readonly preserveFragmentConfigSnippet = require('!raw-loader!./snippets/qpm-config-preserveFragment.example.ts');

}
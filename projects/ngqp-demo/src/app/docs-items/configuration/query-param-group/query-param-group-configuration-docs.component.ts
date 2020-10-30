import { Component } from '@angular/core';
import { DocsPage } from '../../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './query-param-group-configuration-docs.component.html',
})
export class QueryParamGroupConfigurationDocsComponent {

    public readonly DocsPage = DocsPage;

    public readonly configSnippet = require('!raw-loader!./snippets/qpg-config.example.ts').default;
    public readonly preserveFragmentConfigSnippet = require('!raw-loader!./snippets/qpg-config-preserveFragment.example.ts').default;
    public readonly clearOnDestroyConfigSnippet = require('!raw-loader!./snippets/qpg-config-clearOnDestroy.example.ts').default;

}
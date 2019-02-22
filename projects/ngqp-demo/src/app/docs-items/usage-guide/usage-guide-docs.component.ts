import { Component } from '@angular/core';
import { DocsPage } from '../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './usage-guide-docs.component.html',
})
export class UsageGuideDocsComponent {

    public DocsPage = DocsPage;

    public defineModelSnippet = require('!raw-loader!./snippets/define-model.example.ts');
    public bindModelSnippet = require('!raw-loader!./snippets/bind-model.example.html');
    public usingModelSnippet = require('!raw-loader!./snippets/use-model.example.ts');

}

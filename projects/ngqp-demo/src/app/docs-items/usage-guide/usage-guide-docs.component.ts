import { Component } from '@angular/core';
import { DocsPage } from '../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './usage-guide-docs.component.html',
})
export class UsageGuideDocsComponent {

    public DocsPage = DocsPage;

    public defineModelSnippet = require('!raw-loader!./snippets/define-model.example.ts');
    public connectModelSnippet = require('!raw-loader!./snippets/connect-model.example.html');
    public usingModelSnippet = `
public ngOnInit() {
    this.paramGroup.valueChanges.pipe(
        // Don't forget to unsubscribe!
        takeUntil(this.componentDestroyed$),

        switchMap(({ simple, stringParam, boolParam }) => this.api.fetch(/* … */)),
    ).subscribe(result => { /* … */ });
}
`;

}

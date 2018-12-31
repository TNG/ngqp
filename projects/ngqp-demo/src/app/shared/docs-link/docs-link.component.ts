import { Component, Input } from '@angular/core';
import { DocsPage } from '../../docs-page';

@Component({
    selector: 'docs-link',
    templateUrl: './docs-link.component.html',
})
export class DocsLinkComponent {

    @Input()
    public page: DocsPage;

}

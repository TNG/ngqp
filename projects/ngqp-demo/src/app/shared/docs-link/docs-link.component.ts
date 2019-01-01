import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { DocsPage } from '../../docs-page';
import { DocsItemComponent } from '../docs-item/docs-item.component';

@Component({
    selector: 'docs-link',
    templateUrl: './docs-link.component.html',
})
export class DocsLinkComponent implements OnInit {

    @Input()
    public page: DocsPage;

    @Input()
    public fragment: string;

    constructor(@Host() @Optional() private docsItem: DocsItemComponent) {}

    public ngOnInit(): void {
        if (this.page || !this.docsItem) {
            return;
        }

        this.page = this.docsItem.docsPage;
    }

}

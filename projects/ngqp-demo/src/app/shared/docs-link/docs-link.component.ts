import { AfterContentInit, Component, ElementRef, Host, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DocsPage } from '../../docs-page';
import { DocsItemComponent } from '../docs-item/docs-item.component';

@Component({
    selector: 'docs-link',
    templateUrl: './docs-link.component.html',
})
export class DocsLinkComponent implements OnInit, AfterContentInit {

    @ViewChild('content', { read: ElementRef })
    private contentNode: ElementRef<HTMLDivElement>;

    @Input()
    public page: DocsPage;

    @Input()
    public fragment: string;

    public customText: string;

    constructor(@Host() @Optional() private docsItem: DocsItemComponent) {}

    public ngOnInit(): void {
        if (this.page || !this.docsItem) {
            return;
        }

        this.page = this.docsItem.docsPage;
    }

    public ngAfterContentInit(): void {
        if (!this.contentNode) {
            return;
        }

        const content = this.contentNode.nativeElement.innerText.trim();
        this.customText = content.length !== 0 ? content : null;
    }

}

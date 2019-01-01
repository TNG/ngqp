import { Component, Input } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'api-docs-link',
    templateUrl: './api-docs-link.component.html',
    styleUrls: [ './api-docs-link.component.scss' ]
})
export class ApiDocsLinkComponent {

    public icon = faExternalLinkAlt;

    @Input()
    public docsLink: string;

    @Input()
    public customText = false;

    public get automaticText(): string {
        if (!this.docsLink) {
            return null;
        }

        const part = this.docsLink.split('/').pop();
        if (!part) {
            return this.docsLink;
        }

        return part.replace(/\.html/, '');
    }

}

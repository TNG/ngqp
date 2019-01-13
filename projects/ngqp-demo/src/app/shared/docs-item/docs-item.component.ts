import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FragmentsService } from '../docs-fragment/fragments.service';
import { ActivatedRoute } from '@angular/router';
import { getPageForRoute } from '../../demo-docs.routes';
import { DocsPage } from '../../docs-page';
import { AnalyticsService } from '../analytics.service';

@Component({
    selector: 'docs-item',
    templateUrl: './docs-item.component.html',
    styleUrls: [ './docs-item.component.scss' ],
    providers: [ FragmentsService ],
})
export class DocsItemComponent {

    public docsPage: DocsPage;

    public menuIcon = faBars;
    public navigationCollapsed = true;

    constructor(public fragmentService: FragmentsService,
                private analytics: AnalyticsService,
                private route: ActivatedRoute) {
        this.docsPage = getPageForRoute(this.route.snapshot.url[0]);
    }

    public onTocClick(name: string): void {
        this.analytics.trackEvent(`Clicked TOC Link: ${this.docsPage}:${name}`);
    }

}

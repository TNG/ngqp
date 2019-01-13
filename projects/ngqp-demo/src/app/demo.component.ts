import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FragmentScrollService } from './shared/fragment-scroll.service';
import { AnalyticsService } from './shared/analytics.service';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    providers: [
        // This cannot be provided in root
        FragmentScrollService,
        AnalyticsService,
    ],
})
export class DemoComponent {

    public faGithub = faGithub;

    constructor(
        private fragmentScroller: FragmentScrollService,
        private analytics: AnalyticsService,
        private router: Router,
    ) {
        fragmentScroller.startFragmentScroller(router);
        analytics.startTracking(router);
    }

}

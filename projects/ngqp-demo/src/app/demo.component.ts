import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FragmentScrollService } from './shared/fragment-scroll.service';
import { Router } from '@angular/router';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    providers: [
        // This cannot be provided in root
        FragmentScrollService,
    ],
})
export class DemoComponent {

    public faGithub = faGithub;
    public isNavbarExpanded = false;

    constructor(
        private fragmentScroller: FragmentScrollService,
        private router: Router,
    ) {
        fragmentScroller.startFragmentScroller(router);
    }

    public closeNav() {
        this.isNavbarExpanded = false;
    }

}

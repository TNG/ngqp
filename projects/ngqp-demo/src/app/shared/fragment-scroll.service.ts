import { Injectable } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class FragmentScrollService {

    constructor(private scroller: ViewportScroller) {
        this.configureOffset();
    }

    public startFragmentScroller(router: Router): void {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd)
        ).subscribe(event => {
            const { fragment } = router.parseUrl(event.urlAfterRedirects);
            if (!fragment) {
                this.scroller.scrollToPosition([0, 0]);
                return;
            }

            setTimeout(() => this.scroller.scrollToAnchor(fragment), 0);
        });
    }

    private configureOffset(): void {
        if (!window || !window.matchMedia) {
            return this.updateOffset(true);
        }

        const matcher = window.matchMedia('(min-width: 768px)');
        this.updateOffset(matcher.matches);
        matcher.onchange = ({ matches }) => this.updateOffset(matches);
    }

    private updateOffset(matches: boolean): void {
        this.scroller.setOffset([ 0, matches ? 64 : 0 ]);
    }

}

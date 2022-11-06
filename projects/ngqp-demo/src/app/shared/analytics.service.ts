import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

declare const gtag: Function;

@Injectable()
export class AnalyticsService {

    private readonly enabled = false;

    public startTracking(router: Router): void {
        if (!this.enabled) {
            return;
        }

        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd),
            map(event => event.urlAfterRedirects),
            distinctUntilChanged(),
        ).subscribe(url => {
            try {
                gtag('config', 'UA-131508204-1', { 'page_path': url });
            } catch (ignored) {
                // Ignored
            }
        });
    }

    public trackEvent(action: string): void {
        if (!this.enabled) {
            return;
        }

        try {
            gtag('event', action);
        } catch (ignored) {
            // Ignored
        }
    }

}

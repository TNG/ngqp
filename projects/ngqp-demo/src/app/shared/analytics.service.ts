import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

declare const gtag: Function;

@Injectable()
export class AnalyticsService {

    private readonly enabled: boolean;

    constructor() {
        this.enabled = window && window.location && window.location.href.includes('ngqp.io');
    }

    public startTracking(router: Router): void {
        if (!this.enabled) {
            return;
        }

        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationEnd),
        ).subscribe(event => {
            const url = event.urlAfterRedirects;
            gtag('config', 'UA-131508204-1', { 'page_path': url });
        });
    }

    public trackEvent(action: string): void {
        if (!this.enabled) {
            return;
        }

        gtag('event', action);
    }

}
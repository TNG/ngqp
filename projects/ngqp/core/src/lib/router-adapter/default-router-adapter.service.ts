import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterAdapter, RouterAdapterOptions } from './router-adapter.interface';

/**
 * TODO Documentation
 */
export const DefaultRouterAdapterOptions: RouterAdapterOptions = {
    replaceUrl: true,
};

/**
 * TODO Documentation
 */
@Injectable()
export class DefaultRouterAdapter implements RouterAdapter {

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    public get url() {
        return this.router.url;
    }

    public get queryParamMap() {
        return this.route.queryParamMap;
    }

    public navigate(queryParams: Params, extras: RouterAdapterOptions = {}): Promise<boolean> {
        return this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: queryParams,
            ...extras,
        });
    }

}
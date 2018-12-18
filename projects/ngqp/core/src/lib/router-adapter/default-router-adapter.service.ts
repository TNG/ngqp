import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterAdapter } from './router-adapter.interface';

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

    public navigate(queryParams: Params): Promise<boolean> {
        return this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: queryParams,
        });
    }

}
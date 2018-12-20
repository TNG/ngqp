import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { NGQP_ROUTER_ADAPTER, RouterAdapter } from '@ngqp/core';
import { TestRouterAdapter } from '../test-router-adapter.service';

@Component({
    selector: 'demo-browser',
    templateUrl: './demo-browser.component.html',
    styleUrls: [ './demo-browser.component.scss' ],
    providers: [
        { provide: NGQP_ROUTER_ADAPTER, useClass: TestRouterAdapter },
    ],
})
export class DemoBrowserComponent {

    public faRedo = faRedo;
    public refreshProgress = 0;

    @Input()
    public set initialQueryParams(value: string) {
        this.updateQueryParams(value);
    }

    constructor(
        @Inject(NGQP_ROUTER_ADAPTER) public routerAdapter: RouterAdapter,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    public updateQueryParams(value: string) {
        const params: Params = {};

        const searchParams = new URLSearchParams(value);
        const it = (<any>searchParams).keys();
        let current = it.next();
        while (!current.done) {
            const paramName = current.value;
            params[ paramName ] = searchParams.getAll(paramName);
            current = it.next();
        }

        this.routerAdapter.navigate(params);
    }

    public refresh() {
        this.refreshProgress = 1;
        this.cdRef.detectChanges();
        this.refreshProgress = 100;
        setTimeout(() => this.refreshProgress = 0, 600);
    }

    public get refreshing(): boolean {
        return this.refreshProgress !== 0;
    }

}

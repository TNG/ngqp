import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { NGQP_ROUTER_ADAPTER, QueryParamGroup, RouterAdapter } from '@ngqp/core';
import { TestRouterAdapter } from '../test-router-adapter.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'demo-browser',
    templateUrl: './demo-browser.component.html',
    styleUrls: [ './demo-browser.component.scss' ],
    providers: [
        { provide: NGQP_ROUTER_ADAPTER, useClass: TestRouterAdapter },
    ],
})
export class DemoBrowserComponent implements OnInit, OnDestroy {

    @Input()
    public set initialQueryParams(value: string) {
        this.updateQueryParams(value);
    }

    @Input()
    public group: QueryParamGroup;

    public changeCounter = 0;
    public lastChange: string;

    private destroy$ = new Subject<void>();

    constructor(@Inject(NGQP_ROUTER_ADAPTER) public routerAdapter: RouterAdapter) {
    }

    public ngOnInit() {
        if (this.group) {
            this.group.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
                this.changeCounter++;
                this.lastChange = JSON.stringify(value);
            });
        }
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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

        return this.routerAdapter.navigate(params);
    }

}

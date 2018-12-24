import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NGQP_ROUTER_ADAPTER, QueryParamGroup } from '@ngqp/core';
import { TestRouterAdapter } from '../test-router-adapter.service';

@Component({
    selector: 'demo-browser',
    templateUrl: './demo-browser.component.html',
    styleUrls: [ './demo-browser.component.scss' ],
    providers: [
        { provide: NGQP_ROUTER_ADAPTER, useClass: TestRouterAdapter },
    ],
})
export class DemoBrowserComponent implements OnInit, OnDestroy {

    public faArrowLeft = faArrowLeft;

    @Input()
    public initialQueryParams: string;

    @Input()
    public group: QueryParamGroup;

    public changeCounter = 0;
    public lastChange: string;

    private destroy$ = new Subject<void>();

    constructor(@Inject(NGQP_ROUTER_ADAPTER) public routerAdapter: TestRouterAdapter) {
    }

    public ngOnInit() {
        if (this.group) {
            this.group.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
                this.changeCounter++;
                this.lastChange = JSON.stringify(value);
            });
        }

        this.routerAdapter.navigateToQueryParamString(this.initialQueryParams);
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}

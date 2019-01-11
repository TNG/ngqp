import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryParamBuilder, QueryParam, QueryParamGroup } from '@ngqp/core';

declare const require: Function;

@Component({
    selector: 'demo-manual-wiring-example',
    templateUrl: './manual-wiring-example.component.html',
})
export class ManualWiringExampleComponent implements OnDestroy {

    public paramGroup: QueryParamGroup;
    public currentPage = 1;

    public markup = require('!raw-loader!./manual-wiring-example.component.html');
    public typescript = require('!raw-loader!./manual-wiring-example.component.ts');

    private componentDestroyed$ = new Subject<void>();

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            page: qpb.numberParam({
                param: 'page',
                emptyOn: 1,
            }),
        });

        this.pageParam.valueChanges.pipe(
            takeUntil(this.componentDestroyed$)
        ).subscribe(page => this.currentPage = page);

    }

    public get pageParam(): QueryParam<number> {
        return this.paramGroup.get('page');
    }

    public onPageChange(page: number) {
        this.pageParam.setValue(page);
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

}

import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QueryParamBuilder, QueryParam } from '@ngqp/core';

@Component({ selector: 'app-example' })
export class ExampleComponent implements OnDestroy {

    public param: QueryParam<string>;
    private componentDestroyed$ = new Subject<void>();

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');

        this.param.valueChanges.pipe(
            takeUntil(this.componentDestroyed$)
        ).subscribe(value => {
            console.log('Emitted: ', value);
        });
    }

    public ngOnDestroy(): void {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

}
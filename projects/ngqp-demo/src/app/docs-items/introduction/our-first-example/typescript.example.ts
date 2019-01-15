import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';

@Component({ selector: 'app-example' })
export class ExampleComponent implements OnInit, OnDestroy {

    public paramGroup: QueryParamGroup;
    public manufacturers: string[] = [ 'Apple', 'Asus', 'Dell', 'Lenovo', 'Toshiba' ];

    private destroy$ = new Subject<void>();

    constructor(private qpb: QueryParamBuilder,
                private productsApi: any) {
        this.paramGroup = qpb.group({
            // We name the model "search", but in the URL we want it to be "q";
            // also, we want this input to be debounced by 300ms.
            search: qpb.stringParam('q', {
                debounceTime: 300,
            }),

            // If all we need is a simple string parameter, we can also use
            // this shorthand notation.
            manufacturer: 'manufacturer',

            // The price cap is a numeric parameter, and we want the default value
            // to be 0
            priceCap: qpb.numberParam('costsLessThan', {
                emptyOn: 0,
            }),
        });
    }

    public ngOnInit() {
        // We can use valueChanges on our model to update our state whenever the parameters change
        this.paramGroup.valueChanges.pipe(
            takeUntil(this.destroy$),
            switchMap(({ search, manufacturer, priceCap }) => this.productsApi.find(search, manufacturer, priceCap)),
        ).subscribe(products => { /* … */ });
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
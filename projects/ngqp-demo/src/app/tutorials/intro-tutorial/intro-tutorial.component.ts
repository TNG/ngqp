import { Component } from '@angular/core';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'demo-intro-tutorial',
    templateUrl: './intro-tutorial.component.html',
    styleUrls: [ './intro-tutorial.component.scss' ]
})
export class IntroTutorialComponent {

    public faSearch = faSearch;
    public paramGroup: QueryParamGroup;

    public manufacturers: string[] = [ 'Apple', 'Asus', 'Dell', 'Lenovo', 'Toshiba' ];

    public markup = `
<!-- NOTE: This markup has been stripped off any Bootstrap layouts you see in the demo. -->
<ng-container [queryParamGroup]="paramGroup">
    <label for="search">Keywords</label>
    <input id="search" type="text" placeholder="Search" queryParamName="search" />

    <label for="manufacturer">Manufacturer</label>
    <select id="manufacturer" queryParamName="manufacturer">
        <option *ngFor="let manufacturer of manufacturers" [value]="manufacturer">
            {{ manufacturer }}
        </option>
    </select>

    <label for="priceCap">Price less than</label>
    <input id="priceCap" type="number" min="500" max="3000" step="100" queryParamName="priceCap" />
</ng-container>
    `;

    public typescript = `
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';

@Component({ /* … */ })
export class ExampleComponent implements OnInit, OnDestroy {

    public paramGroup: QueryParamGroup;
    public manufacturers: string[] = [ 'Apple', 'Asus', 'Dell', 'Lenovo', 'Toshiba' ];

    private destroy$ = new Subject<void>();

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            // We name the control "search", but in the URL we want it to be "q";
            // also, we want this input to be debounced by 300ms.
            search: qpb.stringParam({
                name: 'q',
                debounceTime: 300,
            }),

            // If all we need is a simple string parameter, we can also use
            // this shorthand notation.
            manufacturer: 'manufacturer',

            // The price cap is a numeric parameter, and we want the default value
            // to be 0
            priceCap: qpb.numericParam({
                name: 'costsLessThan',
                emptyOn: 0,
            }),
        });
    }

    public ngOnInit() {
        // We can use valueChanges on our model to update our state whenever the parameters change
        this.paramGroup.valueChanges.pipe(
            takeUntil(this.destroy$),
            switchMap(({ search, manufacturer, priceCap }) => this.productsApi.find(search, manufacturer, priceCap)),
        ).subscribe(products => /* … */);
    }

    public ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}`;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            search: qpb.stringParam({
                name: 'q',
                debounceTime: 300,
            }),
            manufacturer: 'manufacturer',
            priceCap: qpb.numericParam({
                name: 'costsLessThan',
                emptyOn: 0,
            }),
        });
    }

}

import { Component, Inject } from '@angular/core';
import { NGQP_ROUTER_ADAPTER, QueryParamBuilder, QueryParamGroup, RouterAdapter } from '@ngqp/core';

@Component({
    templateUrl: './playground.component.html',
})
export class PlaygroundComponent {

    public paramGroup: QueryParamGroup;

    constructor(
        private queryParamBuilder: QueryParamBuilder,
        @Inject(NGQP_ROUTER_ADAPTER) public routerAdapter: RouterAdapter,
    ) {
        this.paramGroup = queryParamBuilder.group({
            searchText: queryParamBuilder.param({
                name: 'q',
                debounceTime: 1000,
                emptyOn: 'foo'
            }),
            checker: queryParamBuilder.booleanParam({
                name: 'yesOrNo',
                emptyOn: true,
            }),
            counter: queryParamBuilder.numericParam({
                name: 'ctr',
                emptyOn: 5,
            }),
            range: queryParamBuilder.numericParam({
                name: 'range',
                emptyOn: 2,
            }),
        });
    }

    public setSearchTextValue(value: string) {
        this.paramGroup.get('searchText').setValue(value);
    }

    public setSearchTextRoute(value: string) {
        this.routerAdapter.navigate({ q: value });
    }

    public patchGroupValue() {
        this.paramGroup.patchValue({
            checker: false,
            counter: 1337,
            range: 9,
        });
    }

    public setGroupValue() {
        this.paramGroup.setValue({
            checker: false,
            counter: 1337,
            range: 9,
        });
    }

}

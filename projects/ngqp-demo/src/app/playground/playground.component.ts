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
                emptyOn: 'foo',
                combineWith: (previous, current) => {
                    switch (current) {
                        case 'woof': return {
                            animal: ['Dog']
                        };
                        case 'meow': return {
                            animal: ['Cat']
                        };
                        case 'null': return {
                            animal: null
                        };
                    }

                    return {};
                },
            }),
            animals: queryParamBuilder.stringParam({
                name: 'animal',
                multi: true,
            }),
            page: queryParamBuilder.numericParam({
                name: 'page',
            }),
        }, { replaceUrl: false });
    }

}

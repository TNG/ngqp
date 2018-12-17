import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

@Component({
    templateUrl: './playground.component.html',
})
export class PlaygroundComponent {

    public paramGroup: QueryParamGroup;

    constructor(
        private queryParamBuilder: QueryParamBuilder,
        private router: Router,
        private route: ActivatedRoute,
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

        this.paramGroup.valueChanges
            .subscribe(value => console.log('group', { paramGroup: value }));

        // this.paramGroup.get('searchText').valueChanges
        //    .subscribe(value => console.log('searchText', { searchText: value }));
    }

    public setSearchTextValue(value: string) {
        this.paramGroup.get('searchText').setValue(value);
    }

    public setSearchTextRoute(value: string) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: {
                q: value,
            }
        });
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

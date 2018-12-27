import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

const SNIPPETS: { [ key: string ]: string } = {
    MODULE_IMPORT: `
        @NgModule({
            imports: [
                QueryParamModule.forRoot(),
            ],
        })
        export class AppModule {}`,
    DEMO_MARKUP: `
        <ng-container [queryParamGroup]="paramGroup">
            <input type="text" placeholder="Search" queryParamName="searchText" />
        </ng-container>
    `,
    DEMO_TYPESCRIPT: `
        import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

        @Component({ /* … */ })
        export class ExampleComponent {

            public paramGroup: QueryParamGroup;

            constructor(private queryParamBuilder: QueryParamBuilder) {
                this.paramGroup = queryParamBuilder.group({
                    searchText: queryParamBuilder.stringParam({
                        name: 'q',
                        debounceTime: 250,
                    }),
                });
            }

        }
    `,
};

@Component({
    selector: 'demo-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: [ './getting-started.component.scss' ]
})
export class GettingStartedComponent {

    public snippets = SNIPPETS;
    public paramGroup: QueryParamGroup;

    constructor(private queryParamBuilder: QueryParamBuilder) {
        this.paramGroup = queryParamBuilder.group({
            searchText: queryParamBuilder.stringParam({
                name: 'q',
                debounceTime: 250,
            }),
        });
    }

}

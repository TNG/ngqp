import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SNIPPETS: { [ key: string ]: string } = {
    MODULE_IMPORT: `
        @NgModule({
            imports: [
                QueryParamModule,
            ],
        })
        export class AppModule {}`,
    DEMO_MARKUP: `
        <!-- Provide the QueryParamGroup somewhere on a parent element using queryParamGroup. -->
        <ng-container [queryParamGroup]="paramGroup">
            <!-- Use the queryParamName directive to reference a specific param of your group. -->
            <input type="text" placeholder="Search" queryParamName="searchText" />
        </ng-container>
    `,
    DEMO_TYPESCRIPT: `
        import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

        @Component({ /* … */ })
        export class ExampleComponent {

            // This group holds the definition of our URL parameters we want to manage.
            public paramGroup: QueryParamGroup;

            constructor(private queryParamBuilder: QueryParamBuilder) {
                this.paramGroup = queryParamBuilder.group({
                    // Defines a simple string-typed parameter which will use the query
                    // parameter "q".
                    searchText: queryParamBuilder.stringParam('q'),
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
    public faSearch = faSearch;

    public paramGroup: QueryParamGroup;

    constructor(private queryParamBuilder: QueryParamBuilder) {
        this.paramGroup = queryParamBuilder.group({
            searchText: queryParamBuilder.stringParam('q'),
        });
    }

}

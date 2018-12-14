import { Component } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    public paramGroup: QueryParamGroup;

    constructor(private queryParamBuilder: QueryParamBuilder) {
        this.paramGroup = queryParamBuilder.group({
            search: queryParamBuilder.param({
                name: 'q',
            }),
        });
    }

}

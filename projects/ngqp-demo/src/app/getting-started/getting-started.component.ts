import { Component } from '@angular/core';

const SNIPPETS: { [ key: string ]: string } = {
    MODULE_IMPORT: `
        @NgModule({
            imports: [
                QueryParamModule.forRoot(),
            ],
        })
        export class AppModule {}`,
};

@Component({
    selector: 'demo-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: [ './getting-started.component.scss' ]
})
export class GettingStartedComponent {

    public snippets = SNIPPETS;

}

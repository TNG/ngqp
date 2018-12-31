import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { DOCS_ROUTES } from './demo-docs.routes';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'getting-started',
        component: GettingStartedComponent,
    },
    {
        path: 'docs',
        children: DOCS_ROUTES,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            // FIXME: These don't work as expected at the moment, but we can revisit activating them later.
            // We explicitly disable them as they will become enabled by default in the future, and as long
            // as we have our own solution, we need to avoid that.
            scrollPositionRestoration: 'disabled',
            anchorScrolling: 'disabled',
        }),
    ],
    exports: [ RouterModule ],
})
export class DemoRoutingModule {
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { TutorialComponent } from './shared/tutorial/tutorial.component';
import { IntroTutorialComponent } from './tutorials/intro-tutorial/intro-tutorial.component';

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
        component: TutorialComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: IntroTutorialComponent,
            },
        ],
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
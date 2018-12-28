import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { TutorialComponent } from './shared/tutorial/tutorial.component';
import { BasicsTutorialComponent } from './tutorials/basics-tutorial/basics-tutorial.component';
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
            {
                path: 'basics',
                component: BasicsTutorialComponent,
            }
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
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
        }),
    ],
    exports: [ RouterModule ],
})
export class DemoRoutingModule {
}
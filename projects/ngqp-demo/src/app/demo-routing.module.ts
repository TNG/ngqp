import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
    },
    {
        path: 'guide',
        component: HomeComponent,
    },
    {
        path: 'playground',
        component: PlaygroundComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [ RouterModule ],
})
export class DemoRoutingModule {
}
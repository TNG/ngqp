import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
    {
        path: 'playground',
        component: PlaygroundComponent,
    },
    {
        path: '**',
        redirectTo: '/playground',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}
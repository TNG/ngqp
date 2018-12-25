import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryParamModule } from '@ngqp/core';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { PlaygroundComponent } from './playground/playground.component';
import { DemoBrowserComponent } from './demo-browser/demo-browser.component';
import { DemoPaginationComponent } from './demo-pagination/demo-pagination.component';

@NgModule({
    declarations: [
        DemoComponent,
        PlaygroundComponent,
        DemoBrowserComponent,
        DemoPaginationComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DemoRoutingModule,
        NgbModule,
        FontAwesomeModule,
        QueryParamModule.forRoot(),
    ],
    bootstrap: [ DemoComponent ]
})
export class DemoModule {
}

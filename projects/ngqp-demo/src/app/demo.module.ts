import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryParamModule } from '@ngqp/core';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { DemoBrowserComponent } from './shared/demo-browser/demo-browser.component';
import { DemoPaginationComponent } from './shared/demo-pagination/demo-pagination.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        DemoComponent,
        DemoBrowserComponent,
        DemoPaginationComponent,
        HomeComponent,
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

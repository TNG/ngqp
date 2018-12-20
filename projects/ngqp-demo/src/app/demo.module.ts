import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryParamModule, NGQP_ROUTER_ADAPTER } from '@ngqp/core';
import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import { PlaygroundComponent } from './playground/playground.component';
import { TestRouterAdapter } from './test-router-adapter.service';

@NgModule({
    declarations: [
        DemoComponent,
        PlaygroundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DemoRoutingModule,
        NgbModule,
        FontAwesomeModule,
        QueryParamModule
    ],
    providers: [
        // TODO Sandbox this
        { provide: NGQP_ROUTER_ADAPTER, useClass: TestRouterAdapter },
    ],
    bootstrap: [ DemoComponent ]
})
export class DemoModule {
}

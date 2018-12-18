import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QueryParamModule, NGQP_ROUTER_ADAPTER } from '@ngqp/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { TestRouterAdapter } from './test-router-adapter.service';

@NgModule({
    declarations: [
        AppComponent,
        PlaygroundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule,
        FontAwesomeModule,
        QueryParamModule
    ],
    providers: [
        // TODO Sandbox this
        // { provide: NGQP_ROUTER_ADAPTER, useClass: TestRouterAdapter },
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { QueryParamModule } from '@ngqp/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([]),
        QueryParamModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

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
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { DemoSnippetComponent } from './shared/demo-snippet/demo-snippet.component';
import { TutorialComponent } from './shared/tutorial/tutorial.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { TutorialItemComponent } from './shared/tutorial-item/tutorial-item.component';
import { BasicsTutorialComponent } from './tutorials/basics-tutorial/basics-tutorial.component';
import { TutorialFragmentComponent } from './shared/tutorial-item/tutorial-fragment.component';
import { IntroTutorialComponent } from './tutorials/intro-tutorial/intro-tutorial.component';

@NgModule({
    declarations: [
        DemoComponent,
        DemoBrowserComponent,
        DemoPaginationComponent,
        HomeComponent,
        GettingStartedComponent,
        DemoSnippetComponent,
        TutorialComponent,
        NavigationComponent,
        TutorialItemComponent,
        BasicsTutorialComponent,
        TutorialFragmentComponent,
        IntroTutorialComponent,
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

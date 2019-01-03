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
import { DocsItemComponent } from './shared/docs-item/docs-item.component';
import { DocsNavigationComponent } from './shared/navigation/docs-navigation.component';
import { DocsFragmentComponent } from './shared/docs-fragment/docs-fragment.component';
import { IntroductionDocsComponent } from './docs-items/introduction/introduction-docs.component';
import { DemoExampleComponent } from './shared/demo-example/demo-example.component';
import { UsageGuideDocsComponent } from './docs-items/usage-guide/usage-guide-docs.component';
import { DocsPageNamePipe, DocsPageRoutePipe } from './shared/docs-page.pipes';
import { DocsLinkComponent } from './shared/docs-link/docs-link.component';
import { GettingHelpDocsComponent } from './docs-items/getting-help/getting-help-docs.component';
import { ModelConfigurationDocsComponent } from './docs-items/model-configuration/model-configuration-docs.component';
import { ApiDocsLinkComponent } from './shared/api-docs-link/api-docs-link.component';
import { ReplaceUrlExampleComponent } from './docs-items/examples/replace-url-example/replace-url-example.component';
import { SerializerExampleComponent } from './docs-items/examples/serializer-example/serializer-example.component';
import { MultiExampleComponent } from './docs-items/examples/multi-example/multi-example.component';
import { DebounceTimeExampleComponent } from './docs-items/examples/debounce-time-example/debounce-time-example.component';

@NgModule({
    declarations: [
        DemoComponent,

        DemoBrowserComponent,
        DemoPaginationComponent,
        DemoSnippetComponent,
        DemoExampleComponent,

        DocsItemComponent,
        DocsNavigationComponent,
        DocsFragmentComponent,
        DocsPageNamePipe,
        DocsPageRoutePipe,
        DocsLinkComponent,

        HomeComponent,
        GettingStartedComponent,

        IntroductionDocsComponent,
        UsageGuideDocsComponent,
        GettingHelpDocsComponent,
        ModelConfigurationDocsComponent,
        ApiDocsLinkComponent,
        ReplaceUrlExampleComponent,
        SerializerExampleComponent,
        MultiExampleComponent,
        DebounceTimeExampleComponent,
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

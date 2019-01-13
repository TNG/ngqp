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
import { EmptyOnExampleComponent } from './docs-items/examples/empty-on-example/empty-on-example.component';
import { CombineWithExampleComponent } from './docs-items/examples/combine-with-example/combine-with-example.component';
import { ModelUsageDocsComponent } from './docs-items/model-usage/model-usage-docs.component';
import { PatchSetValueExampleComponent } from './docs-items/examples/patch-set-value-example/patch-set-value-example.component';
import { GlobalConfigurationDocsComponent } from './docs-items/global-configuration/global-configuration-docs.component';
import { CustomControlValueAccessorDocsComponent } from './docs-items/custom-control-value-accessor/custom-control-value-accessor-docs.component';
import { ControlValueAccessorDirectiveExampleComponent } from './docs-items/examples/control-value-accessor-directive-example/control-value-accessor-directive-example.component';
import { ManualWiringExampleComponent } from './docs-items/examples/manual-wiring-example/manual-wiring-example.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
        EmptyOnExampleComponent,
        CombineWithExampleComponent,
        ModelUsageDocsComponent,
        PatchSetValueExampleComponent,
        GlobalConfigurationDocsComponent,
        CustomControlValueAccessorDocsComponent,
        ControlValueAccessorDirectiveExampleComponent,
        ManualWiringExampleComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        DemoRoutingModule,
        NgbModule,
        FontAwesomeModule,
        QueryParamModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    bootstrap: [ DemoComponent ]
})
export class DemoModule {
}

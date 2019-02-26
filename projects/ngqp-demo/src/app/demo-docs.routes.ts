import { Routes, UrlSegment } from '@angular/router';
import { DocsPage } from './docs-page';
import { IntroductionDocsComponent } from './docs-items/introduction/introduction-docs.component';
import { UsageGuideDocsComponent } from './docs-items/usage-guide/usage-guide-docs.component';
import { GettingHelpDocsComponent } from './docs-items/getting-help/getting-help-docs.component';
import { CustomControlValueAccessorDocsComponent } from './docs-items/advanced/custom-control-value-accessor/custom-control-value-accessor-docs.component';
import { QueryParamModuleConfigurationDocsComponent } from './docs-items/configuration/query-param-module/query-param-module-configuration-docs.component';
import { QueryParamGroupConfigurationDocsComponent } from './docs-items/configuration/query-param-group/query-param-group-configuration-docs.component';
import { QueryParamConfigurationDocsComponent } from './docs-items/configuration/query-param/query-param-configuration-docs.component';
import { QueryParamGroupProgrammaticAccessDocsComponent } from './docs-items/programmatic-access/query-param-group/query-param-group-programmatic-access-docs.component';
import { QueryParamProgrammaticAccessDocsComponent } from './docs-items/programmatic-access/query-param/query-param-programmatic-access-docs.component';

export const DOCS_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/docs/introduction',
    },

    {
        path: 'introduction',
        component: IntroductionDocsComponent,
        data: {
            docsPage: DocsPage.INTRODUCTION,
        },
    },
    {
        path: 'usage',
        component: UsageGuideDocsComponent,
        data: {
            docsPage: DocsPage.USAGE_GUIDE,
        },
    },
    {
        path: 'getting-help',
        component: GettingHelpDocsComponent,
        data: {
            docsPage: DocsPage.GETTING_HELP,
        },
    },
    {
        path: 'configuration/query-param-module',
        component: QueryParamModuleConfigurationDocsComponent,
        data: {
            docsPage: DocsPage.CONFIGURATION_QUERYPARAMMODULE,
        },
    },
    {
        path: 'configuration/query-param-group',
        component: QueryParamGroupConfigurationDocsComponent,
        data: {
            docsPage: DocsPage.CONFIGURATION_QUERYPARAMGROUP,
        },
    },
    {
        path: 'configuration/query-param',
        component: QueryParamConfigurationDocsComponent,
        data: {
            docsPage: DocsPage.CONFIGURATION_QUERYPARAM,
        },
    },
    {
        path: 'programmatic-access/query-param-group',
        component: QueryParamGroupProgrammaticAccessDocsComponent,
        data: {
            docsPage: DocsPage.PROGRAMMATIC_QUERYPARAMGROUP,
        },
    },
    {
        path: 'programmatic-access/query-param',
        component: QueryParamProgrammaticAccessDocsComponent,
        data: {
            docsPage: DocsPage.PROGRAMMATIC_QUERYPARAM,
        },
    },
    {
        path: 'advanced/custom-accessor',
        component: CustomControlValueAccessorDocsComponent,
        data: {
            docsPage: DocsPage.CUSTOM_CONTROL_VALUE_ACCESSOR,
        },
    },
];

export function getRouteForPage(page: DocsPage): string {
    const foundRoute = DOCS_ROUTES.find(route => route.data && route.data.docsPage === page);
    if (!foundRoute) {
        throw new Error(`Cannot find route for docs page ${page}`);
    }

    return `/docs/${foundRoute.path}`;
}

export function getPageForRoute(path: string): DocsPage {
    const foundPage = DOCS_ROUTES.find(route => route.path === path);
    if (!foundPage) {
        throw new Error(`Cannot find route for segment ${path}`);
    }

    return foundPage.data.docsPage as DocsPage;
}
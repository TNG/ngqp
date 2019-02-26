import { Pipe, PipeTransform } from '@angular/core';
import { getRouteForPage } from '../demo-docs.routes';
import { DocsPage } from '../docs-page';

@Pipe({
    name: 'docsPageName',
})
export class DocsPageNamePipe implements PipeTransform {

    public transform(page: DocsPage): string {
        switch (page) {
            case DocsPage.INTRODUCTION:
                return 'Introduction';
            case DocsPage.USAGE_GUIDE:
                return 'How to Use';
            case DocsPage.GETTING_HELP:
                return 'Getting Help';
            case DocsPage.CONFIGURATION_QUERYPARAMMODULE:
                return 'QueryParamModule';
            case DocsPage.CONFIGURATION_QUERYPARAMGROUP:
                return 'QueryParamGroup';
            case DocsPage.CONFIGURATION_QUERYPARAM:
                return 'QueryParam';
            case DocsPage.PROGRAMMATIC_QUERYPARAMGROUP:
                return 'QueryParamGroup';
            case DocsPage.PROGRAMMATIC_QUERYPARAM:
                return 'QueryParam';
            case DocsPage.CUSTOM_CONTROL_VALUE_ACCESSOR:
                return 'Controls without ControlValueAccessor';
            default:
                return page;
        }
    }

}

@Pipe({
    name: 'docsPageRoute',
})
export class DocsPageRoutePipe implements PipeTransform {

    public transform(page: DocsPage): string {
        return getRouteForPage(page);
    }

}
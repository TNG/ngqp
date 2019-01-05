import { Component, EventEmitter, Output } from '@angular/core';
import { DocsPage } from '../../docs-page';

interface DocsNavigationItem {
    page: DocsPage;
}

interface DocsNavigationItemGroup {
    name: string;
    children?: DocsNavigationItem[];
}

@Component({
    selector: 'demo-docs-navigation',
    templateUrl: './docs-navigation.component.html',
    styleUrls: [ './docs-navigation.component.scss' ]
})
export class DocsNavigationComponent {

    @Output()
    public navigate = new EventEmitter<void>();

    public items: (DocsNavigationItem | DocsNavigationItemGroup)[] = [
        { page: DocsPage.INTRODUCTION },
        { page: DocsPage.USAGE_GUIDE },
        { page: DocsPage.GETTING_HELP },
        {
            name: 'Fundamentals',
            children: [
                { page: DocsPage.MODEL_CONFIGURATION },
                { page: DocsPage.MODEL_USAGE },
                { page: DocsPage.GLOBAL_CONFIGURATION },
            ],
        },
        {
            name: 'Advanced',
            children: [
                { page: DocsPage.CUSTOM_CONTROL_VALUE_ACCESSOR },
            ],
        },
    ];

}

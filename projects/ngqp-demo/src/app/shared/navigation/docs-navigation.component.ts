import { Component, EventEmitter, Output } from '@angular/core';
import { DocsPage } from '../../docs-page';
import { faHandsHelping, faRibbon, faStar } from '@fortawesome/free-solid-svg-icons';

interface DocsNavigationItem {
    page: DocsPage;
    icon?: unknown;
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
        {
            page: DocsPage.INTRODUCTION,
            icon: faRibbon,
        },
        {
            page: DocsPage.USAGE_GUIDE,
            icon: faStar,
        },
        {
            page: DocsPage.GETTING_HELP,
            icon: faHandsHelping,
        },
        {
            name: 'Configuration',
            children: [
                { page: DocsPage.CONFIGURATION_QUERYPARAMMODULE },
                { page: DocsPage.CONFIGURATION_QUERYPARAMGROUP },
                { page: DocsPage.CONFIGURATION_QUERYPARAM },
            ],
        },
        {
            name: 'Programmatic Access',
            children: [
                { page: DocsPage.PROGRAMMATIC_QUERYPARAMGROUP },
                { page: DocsPage.PROGRAMMATIC_QUERYPARAM },
            ],
        },
        {
            name: 'Advanced',
            children: [
                { page: DocsPage.CUSTOM_CONTROL_VALUE_ACCESSOR },
                // TODO: Custom URL Serializer
            ],
        },
        // {
        //     name: 'Examples',
        //     children: [
        //     ],
        // },
    ];

}

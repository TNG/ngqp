import { Component, EventEmitter, Output } from '@angular/core';

interface TutorialItem {
    name: string;
    route?: string;
    children?: TutorialItem[];
}

@Component({
    selector: 'demo-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent {

    @Output()
    public navigate = new EventEmitter<void>();

    public items: TutorialItem[] = [
        { name: 'Introduction', route: '' },
        { name: 'Usage Guide', route: 'usage' },
        { name: 'Getting Help', route: 'getting-help' },
        {
            name: 'Fundamentals',
            children: [
                { name: 'Configuring the Model', route: 'model-configuration' },
                { name: 'Using the Model', route: 'model-usage' },
                { name: 'Global Configuration', route: 'global-configuration' },
            ],
        },
        {
            name: 'Advanced',
            children: [
                { name: 'Validating query parameters', route: 'validation' },
                { name: 'Form controls without ControlValueAccessor', route: 'custom-control-value-accessor' },
            ],
        },
    ];

}

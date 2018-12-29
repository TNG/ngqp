import { Component, EventEmitter, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

    public faCaretDown = faCaretDown;

    @Output()
    public navigate = new EventEmitter<void>();

    public items: TutorialItem[] = [
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
                { name: 'Form controls without ControlValueAccessor', route: 'custom-control-value-accessor' },
            ],
        },
    ];

}

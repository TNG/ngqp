import { Component, EventEmitter, Output } from '@angular/core';

interface TutorialItem {
    name: string;
    route: string;
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
        { name: 'Basics', route: 'basics' },
    ];

}

import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'demo-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: [ './tutorial.component.scss' ]
})
export class TutorialComponent {

    public menuIcon = faBars;
    public navigationCollapsed = true;

}

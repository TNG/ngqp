import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FragmentsService } from '../tutorial-fragment/fragments.service';

@Component({
    selector: 'demo-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: [ './tutorial.component.scss' ],
    providers: [ FragmentsService ],
})
export class TutorialComponent {

    @Input()
    public pageTitle: string;

    public menuIcon = faBars;
    public navigationCollapsed = true;

    constructor(public fragmentService: FragmentsService) {}

}

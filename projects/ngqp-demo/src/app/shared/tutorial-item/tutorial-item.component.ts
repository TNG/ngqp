import { Component, Input } from '@angular/core';
import { FragmentsService } from './fragments.service';

@Component({
    selector: 'demo-tutorial-item',
    templateUrl: './tutorial-item.component.html',
    styleUrls: [ './tutorial-item.component.scss' ],
    providers: [ FragmentsService ],
})
export class TutorialItemComponent {

    @Input()
    public pageTitle: string;

    constructor(public fragmentService: FragmentsService) {}

}

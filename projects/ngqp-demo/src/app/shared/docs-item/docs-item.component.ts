import { Component, Input } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FragmentsService } from '../docs-fragment/fragments.service';

@Component({
    selector: 'docs-item',
    templateUrl: './docs-item.component.html',
    styleUrls: [ './docs-item.component.scss' ],
    providers: [ FragmentsService ],
})
export class DocsItemComponent {

    @Input()
    public pageTitle: string;

    public menuIcon = faBars;
    public navigationCollapsed = true;

    constructor(public fragmentService: FragmentsService) {}

}

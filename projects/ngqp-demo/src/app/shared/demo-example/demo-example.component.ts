import { Component, Input } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsService } from '../analytics.service';

@Component({
    selector: 'demo-example',
    templateUrl: './demo-example.component.html',
    styleUrls: [ './demo-example.component.scss' ]
})
export class DemoExampleComponent {

    @Input()
    public markup: string;

    @Input()
    public typescript: string;

    constructor(private analytics: AnalyticsService) {}

    public onTabChange(event: NgbTabChangeEvent) {
        this.analytics.trackEvent(`Switched to ${event.nextId} tab`);
    }

}

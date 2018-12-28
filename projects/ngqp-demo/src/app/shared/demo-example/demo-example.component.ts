import { Component, Input } from '@angular/core';

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

}

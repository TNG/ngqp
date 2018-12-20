import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styles: [`
        .logo-container {
            background-color: white;
            border-radius: 50%;
            margin-right: 8px;
        }
    `],
})
export class DemoComponent {

    public faGithub = faGithub;
    public isNavbarExpanded = false;

}

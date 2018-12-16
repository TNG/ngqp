import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [`
        .logo-container {
            background-color: white;
            border-radius: 50%;
            margin-right: 8px;
        }
    `],
})
export class AppComponent {

    public isNavbarExpanded = false;

}

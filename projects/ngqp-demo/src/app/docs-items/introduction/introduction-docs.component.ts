import { Component } from '@angular/core';
import { DocsPage } from '../../docs-page';

@Component({
    templateUrl: './introduction-docs.component.html',
    styleUrls: [ './introduction-docs.component.scss' ]
})
export class IntroductionDocsComponent {

    public DocsPage = DocsPage;

}

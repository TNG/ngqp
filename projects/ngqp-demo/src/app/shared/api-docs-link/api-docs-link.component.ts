import { Component, Input } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export type ApiDocType = 'classes' | 'injectables';

const LOOKUP: { [ name: string ]: ApiDocType } = {
    'QueryParam': 'classes',
    'QueryParamGroup': 'classes',
    'QueryParamBuilder': 'injectables',
};

@Component({
    selector: 'api-docs-link',
    templateUrl: './api-docs-link.component.html',
    styleUrls: [ './api-docs-link.component.scss' ]
})
export class ApiDocsLinkComponent {

    public icon = faExternalLinkAlt;

    @Input()
    public type: ApiDocType;

    @Input()
    public name: string;

    public get url(): string {
        const [ name, fragment = '' ] = this.name.split('#');
        return `/api-docs/${this.type ? this.type : LOOKUP[ name ]}/${name}.html#${fragment}`;
    }

}

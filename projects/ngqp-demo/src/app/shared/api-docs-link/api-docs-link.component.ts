import { AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

export type ApiDocType = 'modules' | 'classes' | 'directives' | 'injectables';

const LOOKUP: { [ name: string ]: ApiDocType } = {
    'QueryParamModule': 'modules',
    'QueryParam': 'classes',
    'QueryParamGroup': 'classes',
    'QueryParamBuilder': 'injectables',
    'QueryParamGroupDirective': 'directives',
    'QueryParamNameDirective': 'directives',
    'ControlValueAccessorDirective': 'directives',
};

@Component({
    selector: '[apiDocsLink]',
    templateUrl: './api-docs-link.component.html',
    styleUrls: [ './api-docs-link.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiDocsLinkComponent implements AfterContentInit {

    public icon = faExternalLinkAlt;
    public url: string;

    @ViewChild('content', { read: ElementRef })
    private contentNode: ElementRef<HTMLElement>;

    @Input()
    public apiDocsLink: string;

    public ngAfterContentInit(): void {
        const [ name, fragment = '' ] = (this.apiDocsLink ? this.apiDocsLink : this.contentNode.nativeElement.innerText)
            .split('#');
        const type = this.getTypeByName(name);

        this.url = `/api-docs/${type}/${name}.html#${fragment}`;
    }

    private getTypeByName(name: string): ApiDocType {
        return LOOKUP[ name ];
    }

}

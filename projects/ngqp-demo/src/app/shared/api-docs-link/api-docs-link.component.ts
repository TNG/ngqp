import {
    AfterContentInit, AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {combineLatest, Subject} from 'rxjs';

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
export class ApiDocsLinkComponent implements OnInit, AfterViewInit, AfterContentInit {

    public icon = faExternalLinkAlt;
    public url: string;

    @ViewChild('content', { read: ElementRef })
    private contentNode: ElementRef<HTMLElement>;

    @Input()
    public apiDocsLink: string;

    private readonly viewInit$ = new Subject<void>();
    private readonly contentInit$ = new Subject<void>();

    constructor(private readonly cdRef: ChangeDetectorRef) {
    }

    public ngOnInit() {
        combineLatest([this.viewInit$, this.contentInit$]).subscribe(() => {
            const [ name, fragment = '' ] = (this.apiDocsLink ? this.apiDocsLink : this.contentNode.nativeElement.innerText)
                .split('#');
            const type = this.getTypeByName(name);

            this.url = `/api-docs/${type}/${name}.html#${fragment}`;
            this.cdRef.detectChanges();
        });
    }

    public ngAfterViewInit() {
        this.viewInit$.next();
        this.viewInit$.complete();
    }

    public ngAfterContentInit() {
        this.contentInit$.next();
        this.contentInit$.complete();
    }

    private getTypeByName(name: string): ApiDocType {
        return LOOKUP[ name ];
    }

}

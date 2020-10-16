import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostBinding,
    Input, OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import { FragmentsService } from './fragments.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import {combineLatest, Subject} from 'rxjs';

const MAX_LEVEL = 3;

@Component({
    selector: 'docs-fragment',
    templateUrl: './docs-fragment.component.html',
    styleUrls: ['./docs-fragment.component.scss'],
})
export class DocsFragmentComponent implements OnInit, AfterViewInit, AfterContentInit {

    public faLink = faLink;

    @ViewChild('content', {read: ElementRef})
    private content: ElementRef<HTMLDivElement>;

    @Input()
    @HostBinding('attr.id')
    public fragment: string;

    private readonly viewInit$ = new Subject<void>();
    private readonly contentInit$ = new Subject<void>();

    constructor(
        @Optional() private fragmentsService: FragmentsService,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    public ngOnInit() {
        combineLatest([this.viewInit$, this.contentInit$]).subscribe(() => {
            if (!this.fragmentsService) {
                return;
            }

            const level = this.getHeadingLevel(this.content.nativeElement.innerHTML);
            if (level > MAX_LEVEL) {
                return;
            }

            this.fragmentsService.addFragment({
                id: this.fragment,
                name: this.content.nativeElement.innerText.trim(),
                indent: level,
            });

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

    private getHeadingLevel(html: string): number {
        const match = html.match(/h\d/);
        return match ? +(match[0].substr(1)) : 1;
    }

}

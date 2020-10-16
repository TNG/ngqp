import {
    AfterContentInit,
    AfterViewInit, ChangeDetectorRef,
    Component,
    ElementRef,
    Host,
    Input,
    OnInit,
    Optional,
    ViewChild
} from '@angular/core';
import { DocsPage } from '../../docs-page';
import { DocsItemComponent } from '../docs-item/docs-item.component';
import {combineLatest, Subject} from 'rxjs';

@Component({
    selector: 'docs-link',
    templateUrl: './docs-link.component.html',
})
export class DocsLinkComponent implements OnInit, AfterViewInit, AfterContentInit {

    @ViewChild('content', { read: ElementRef })
    private contentNode: ElementRef<HTMLDivElement>;

    @Input()
    public page: DocsPage;

    @Input()
    public fragment: string;

    public customText: string;

    private readonly viewInit$ = new Subject<void>();
    private readonly contentInit$ = new Subject<void>();

    constructor(
        @Host() @Optional() private docsItem: DocsItemComponent,
        private cdRef: ChangeDetectorRef,
    ) {}

    public ngOnInit(): void {
        this.setPage();
        this.setCustomText();
    }

    public ngAfterViewInit() {
        this.viewInit$.next();
        this.viewInit$.complete();
    }

    public ngAfterContentInit() {
        this.contentInit$.next();
        this.contentInit$.complete();
    }

    private setPage(): void {
        if (this.page || !this.docsItem) {
            return;
        }

        this.page = this.docsItem.docsPage;
    }

    private setCustomText(): void {
        combineLatest([this.viewInit$, this.contentInit$]).subscribe(() => {
            if (!this.contentNode) {
                return;
            }

            const content = this.contentNode.nativeElement.innerText.trim();
            this.customText = content.length !== 0 ? content : null;
            this.cdRef.detectChanges();
        });
    }

}

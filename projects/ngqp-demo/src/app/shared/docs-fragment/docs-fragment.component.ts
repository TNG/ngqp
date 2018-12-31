import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, Optional, ViewChild } from '@angular/core';
import { FragmentsService } from './fragments.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const MAX_LEVEL = 3;

@Component({
    selector: 'docs-fragment',
    templateUrl: './docs-fragment.component.html',
    styleUrls: ['./docs-fragment.component.scss'],
})
export class DocsFragmentComponent implements AfterContentInit {

    public faLink = faLink;

    @ViewChild('content', {read: ElementRef})
    private content: ElementRef<HTMLDivElement>;

    @Input()
    @HostBinding('attr.id')
    public fragment: string;

    constructor(
        @Optional() private fragmentsService: FragmentsService,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    public ngAfterContentInit() {
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
    }

    private getHeadingLevel(html: string): number {
        const match = html.match(/h\d/);
        return match ? +(match[0].substr(1)) : 1;
    }

}

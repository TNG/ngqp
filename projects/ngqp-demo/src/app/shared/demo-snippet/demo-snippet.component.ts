import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PrismService } from './prism.service';

@Component({
    selector: 'demo-snippet',
    templateUrl: './demo-snippet.component.html',
    styleUrls: [ './demo-snippet.component.scss' ],
})
export class DemoSnippetComponent implements AfterViewInit {

    @ViewChild('code', { read: ElementRef })
    private container: ElementRef<HTMLElement>;

    @Input()
    public code: string;

    @Input()
    public type: 'typescript' | 'html' | 'bash' = 'typescript';

    constructor(private prism: PrismService) {
    }

    public ngAfterViewInit() {
        const code = this.normalizeIndentation(this.code).trim();
        console.log(this.code);
        console.log(code);
        this.container.nativeElement.innerHTML = this.prism.highlight(code, this.type);
    }

    private normalizeIndentation(text: string): string {
        const lines = text.split('\n');

        const indents = lines
            .filter(line => line.trim().length !== 0)
            .map(line => line.search(/\S/))
            .map(lineIndent => lineIndent === -1 ? Number.MAX_VALUE : lineIndent);
        const indent = Math.min(...indents);

        return lines.map(line => line.substr(indent)).join('\n').trim();
    }

}

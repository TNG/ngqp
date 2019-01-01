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
    public type: 'none' | 'typescript' | 'html' | 'bash' = 'typescript';

    constructor(private prism: PrismService) {
    }

    public ngAfterViewInit() {
        let code = this.code;
        code = this.removeDocsReferences(code);
        code = this.removeDoubleEmptyLines(code);
        code = this.normalizeIndentation(code);
        code = code.trim();

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

    private removeDocsReferences(text: string): string {
        switch (this.type) {
            case 'html':
                return text
                    .split('\n')
                    .filter(line => !line.includes('demo-example') && !line.includes('demo-browser'))
                    .join('\n');
            case 'typescript':
                return text
                    .split('\n')
                    .filter(line => !line.includes('require'))
                    .join('\n');
            default:
                return text;
        }
    }

    private removeDoubleEmptyLines(text: string): string {
        return text
            .split('\n')
            .filter((line, idx, lines) => idx === 0 || line.trim().length !== 0 || lines[idx - 1].trim().length !== 0)
            .join('\n');
    }

}

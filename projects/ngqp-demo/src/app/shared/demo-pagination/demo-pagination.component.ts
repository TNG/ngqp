import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'demo-pagination',
    templateUrl: './demo-pagination.component.html',
    styleUrls: [ './demo-pagination.component.scss' ],
    encapsulation: ViewEncapsulation.None,
})
export class DemoPaginationComponent {

    @Input()
    public set numberOfPages(value: number) {
        this.pages = Array(value).fill(undefined).map((_, idx) => idx + 1);
    }

    @Input()
    public currentPage: number;

    @Output()
    public currentPageChange = new EventEmitter<number>();

    public pages: number[] = [];

}

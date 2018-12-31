import { Component } from '@angular/core';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DocsPage } from '../../docs-page';

declare const require: Function;

@Component({
    templateUrl: './introduction-docs.component.html',
    styleUrls: [ './introduction-docs.component.scss' ]
})
export class IntroductionDocsComponent {

    public faSearch = faSearch;
    public DocsPage = DocsPage;

    public paramGroup: QueryParamGroup;

    public manufacturers: string[] = [ 'Apple', 'Asus', 'Dell', 'Lenovo', 'Toshiba' ];

    public markup = require('!raw-loader!./our-first-example/markup.example.html');
    public typescript = require('!raw-loader!./our-first-example/typescript.example.ts');

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            search: qpb.stringParam({
                name: 'q',
                debounceTime: 300,
            }),
            manufacturer: 'manufacturer',
            priceCap: qpb.numericParam({
                name: 'costsLessThan',
                emptyOn: 0,
            }),
        });
    }

}

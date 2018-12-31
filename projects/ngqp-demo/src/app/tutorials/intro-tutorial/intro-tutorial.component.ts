import { Component } from '@angular/core';
import { QueryParamGroup, QueryParamBuilder } from '@ngqp/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

declare const require: Function;

@Component({
    selector: 'demo-intro-tutorial',
    templateUrl: './intro-tutorial.component.html',
    styleUrls: [ './intro-tutorial.component.scss' ]
})
export class IntroTutorialComponent {

    public faSearch = faSearch;
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

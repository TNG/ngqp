import { NgModule, Type } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroupDirective } from './query-param-group.directive';

const DIRECTIVES: Type<any>[] = [
    QueryParamNameDirective,
    QueryParamGroupDirective,
];

@NgModule({
    imports: [],
    declarations: [ DIRECTIVES ],
    exports: [ DIRECTIVES ],
})
export class QueryParamModule {
}

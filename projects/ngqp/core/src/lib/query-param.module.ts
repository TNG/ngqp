import { NgModule, Type } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroupDirective } from './query-param-group.directive';
import {
    NgqpDefaultControlValueAccessorDirective,
    NgqpSelectControlValueAccessorDirective,
    NgqpSelectOptionDirective
} from './accessors/accessors';

const DIRECTIVES: Type<any>[] = [
    QueryParamNameDirective,
    QueryParamGroupDirective,

    // Accessors
    NgqpDefaultControlValueAccessorDirective,
    NgqpSelectControlValueAccessorDirective,
    NgqpSelectOptionDirective,
];

@NgModule({
    imports: [],
    declarations: [ DIRECTIVES ],
    exports: [ DIRECTIVES ],
})
export class QueryParamModule {
}

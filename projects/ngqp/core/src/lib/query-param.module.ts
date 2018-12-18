import { NgModule, Type } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroupDirective } from './query-param-group.directive';
import {
    CheckboxControlValueAccessorDirective,
    DefaultControlValueAccessorDirective,
    NgqpSelectOptionDirective,
    NumberControlValueAccessorDirective,
    RangeControlValueAccessorDirective,
    SelectControlValueAccessorDirective
} from './accessors/accessors';
import { DefaultRouterAdapter, NGQP_ROUTER_ADAPTER } from './router-adapter/router-adapter';

const DIRECTIVES: Type<any>[] = [
    QueryParamNameDirective,
    QueryParamGroupDirective,

    // Accessors
    DefaultControlValueAccessorDirective,
    NumberControlValueAccessorDirective,
    RangeControlValueAccessorDirective,
    CheckboxControlValueAccessorDirective,
    SelectControlValueAccessorDirective,
    NgqpSelectOptionDirective,
];

@NgModule({
    imports: [],
    declarations: [ DIRECTIVES ],
    exports: [ DIRECTIVES ],
    providers: [
        { provide: NGQP_ROUTER_ADAPTER, useClass: DefaultRouterAdapter },
    ],
})
export class QueryParamModule {
}

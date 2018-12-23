import { NgModule, Type } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroupDirective } from './query-param-group.directive';
import {
    CheckboxControlValueAccessorDirective,
    DefaultControlValueAccessorDirective,
    MultiSelectControlValueAccessorDirective,
    MultiSelectOptionDirective,
    NumberControlValueAccessorDirective,
    RangeControlValueAccessorDirective,
    SelectControlValueAccessorDirective,
    SelectOptionDirective
} from './accessors/accessors';
import {
    DefaultRouterAdapter,
    DefaultRouterAdapterOptions,
    NGQP_ROUTER_ADAPTER,
    NGQP_ROUTER_OPTIONS
} from './router-adapter/router-adapter';

const DIRECTIVES: Type<any>[] = [
    QueryParamNameDirective,
    QueryParamGroupDirective,

    // Accessors
    DefaultControlValueAccessorDirective,
    NumberControlValueAccessorDirective,
    RangeControlValueAccessorDirective,
    CheckboxControlValueAccessorDirective,
    SelectControlValueAccessorDirective,
    SelectOptionDirective,
    MultiSelectControlValueAccessorDirective,
    MultiSelectOptionDirective,
];

@NgModule({
    imports: [],
    declarations: [ DIRECTIVES ],
    exports: [ DIRECTIVES ],
    providers: [
        {
            provide: NGQP_ROUTER_ADAPTER,
            useClass: DefaultRouterAdapter
        },
        {
            provide: NGQP_ROUTER_OPTIONS,
            useValue: DefaultRouterAdapterOptions,
        },
    ],
})
export class QueryParamModule {
}

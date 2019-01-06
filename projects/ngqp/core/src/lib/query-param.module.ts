import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { QueryParamNameDirective } from './query-param-name.directive';
import { QueryParamGroupDirective } from './query-param-group.directive';
import { ControlValueAccessorDirective } from './control-value-accessor.directive';
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
    NGQP_ROUTER_OPTIONS,
    RouterAdapterOptions
} from './router-adapter/router-adapter';

/** @ignore */
const DIRECTIVES: Type<any>[] = [
    QueryParamNameDirective,
    QueryParamGroupDirective,
    ControlValueAccessorDirective,

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

    public static forRoot(config: { routerOptions?: RouterAdapterOptions } = {}): ModuleWithProviders<QueryParamModule> {
        return {
            ngModule: QueryParamModule,
            providers: [
                {
                    provide: NGQP_ROUTER_OPTIONS,
                    useValue: config.routerOptions ? config.routerOptions : DefaultRouterAdapterOptions,
                },
            ],
        };
    }

}

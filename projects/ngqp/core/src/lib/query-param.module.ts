import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import {
    ControlValueAccessorDirective,
    QueryParamDirective,
    QueryParamNameDirective,
    QueryParamGroupDirective
} from './directives/directives';
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
    DefaultRouterOptions,
    NGQP_ROUTER_ADAPTER,
    NGQP_ROUTER_OPTIONS,
    RouterOptions
} from './router-adapter/router-adapter';

/** @ignore */
const DIRECTIVES: Type<any>[] = [
    QueryParamDirective,
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
            useValue: DefaultRouterOptions,
        },
    ],
})
export class QueryParamModule {

    public static withConfig(config: { routerOptions?: RouterOptions } = {}): ModuleWithProviders<QueryParamModule> {
        return {
            ngModule: QueryParamModule,
            providers: [
                {
                    provide: NGQP_ROUTER_OPTIONS,
                    useValue: {
                        ...DefaultRouterOptions,
                        ...config.routerOptions
                    },
                },
            ],
        };
    }

}

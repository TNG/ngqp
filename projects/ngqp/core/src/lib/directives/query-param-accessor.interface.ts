import { ControlValueAccessor } from '@angular/forms';

/**
 * Unified abstraction for {@link QueryParamNameDirective} and {@link QueryParamDirective}.
 * Allows to process query params bound to the group as well as standalone query params.
 *
 * @internal
 */
export interface QueryParamAccessor {
    name: string;
    valueAccessor: ControlValueAccessor;
}
import { ControlValueAccessor } from '@angular/forms';
import { DefaultControlValueAccessorDirective } from './default-control-value-accessor.directive';
import { NGQP_BUILT_IN_ACCESSORS } from './ngqp-accessors';

/**
 * This resembles the selectControlValueAccessor function from
 *   https://github.com/angular/angular/blob/7.1.2/packages/forms/src/directives/shared.ts#L186
 * We can't use it directly since it isn't exported in the public API, but let's hope choosing
 * any accessor is good enough for our purposes.
 *
 * @internal
 */
export function selectValueAccessor(
    valueAccessors: ControlValueAccessor[],
    excludeAccessor?: ControlValueAccessor,
): ControlValueAccessor | null {
    const orderedAccessors = orderByPriority(valueAccessors)
        .filter(accessor => !excludeAccessor || accessor !== excludeAccessor);

    if (orderedAccessors.length === 0) {
        throw new Error(`No matching ControlValueAccessor has been found for this form control`);
    }

    return orderedAccessors[0];
}

function orderByPriority(valueAccessors: ControlValueAccessor[]): ControlValueAccessor[] {
    if (!valueAccessors || !Array.isArray(valueAccessors)) {
        return null;
    }

    let defaultAccessor: ControlValueAccessor | null = null;
    let builtInAccessor: ControlValueAccessor | null = null;
    let customAccessor: ControlValueAccessor | null = null;

    valueAccessors.forEach(valueAccessor => {
        if (valueAccessor.constructor === DefaultControlValueAccessorDirective) {
            defaultAccessor = valueAccessor;
        } else if (NGQP_BUILT_IN_ACCESSORS.some(current => valueAccessor.constructor === current)) {
            if (builtInAccessor !== null) {
                throw new Error(`More than one built-in ControlValueAccessor matches`);
            }

            builtInAccessor = valueAccessor;
        } else {
            if (customAccessor !== null) {
                throw new Error(`More than one custom ControlValueAccessor has been found on the form control`);
            }

            customAccessor = valueAccessor;
        }
    });

    const result = new Set<ControlValueAccessor>();
    if (customAccessor !== null) {
        result.add(customAccessor);
    }

    if (builtInAccessor !== null) {
        result.add(builtInAccessor);
    }

    if (defaultAccessor !== null) {
        result.add(defaultAccessor);
    }

    valueAccessors.forEach(accessor => result.add(accessor));
    return Array.from(result);
}
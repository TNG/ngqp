import { Directive, Host, Inject, Input, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QueryParamGroupDirective } from './query-param-group.directive';
import { DefaultControlValueAccessorDirective, NGQP_BUILT_IN_ACCESSORS } from './accessors/accessors';

/**
 * Binds a {@link QueryParam} to a DOM element.
 *
 * This directive accepts the name of a {@link QueryParam} inside its parent
 * {@link QueryParamGroup}. It binds this parameter to the host element,
 * which is required to have a [ControlValueAccessor]{@link https://angular.io/api/forms/ControlValueAccessor}.
 */
@Directive({
    selector: '[queryParamName]',
})
export class QueryParamNameDirective implements OnInit {

    /**
     * The name of the {@link QueryParam} inside its parent {@link QueryParamGroup}.
     * Note that this does not refer to the [parameter name]{@link QueryParam#param}.
     */
    @Input('queryParamName')
    public name: string;

    /** @internal */
    public valueAccessor: ControlValueAccessor | null = null;

    constructor(
        @Optional() @Host() @SkipSelf() private parent: QueryParamGroupDirective,
        @Optional() @Self() @Inject(NG_VALUE_ACCESSOR) valueAccessors: ControlValueAccessor[],
    ) {
        if (!this.parent) {
            throw new Error(`No parent configuration found. Did you forget to add [queryParamGroup]?`);
        }

        this.valueAccessor = this.selectValueAccessor(valueAccessors);
    }

    /** @ignore */
    public ngOnInit() {
        if (!this.name) {
            throw new Error(`queryParamName has been added, but without specifying the name.`);
        }

        this.setupQueryParam();
    }

    /**
     * This resembles the selectControlValueAccessor function from
     *   https://github.com/angular/angular/blob/7.1.2/packages/forms/src/directives/shared.ts#L186
     * We can't use it directly since it isn't exported in the public API, but let's hope choosing
     * any accessor is good enough for our purposes.
     */
    private selectValueAccessor(valueAccessors: ControlValueAccessor[]): ControlValueAccessor | null {
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

        if (customAccessor !== null) {
            return customAccessor;
        }

        if (builtInAccessor !== null) {
            return builtInAccessor;
        }

        if (defaultAccessor !== null) {
            return defaultAccessor;
        }

        throw new Error(`No matching ControlValueAccessor has been found for this form control`);
    }

    private setupQueryParam(): void {
        this.parent.addQueryParam(this);
    }

}

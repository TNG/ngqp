import { Directive, Host, Inject, Input, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QueryParamGroupDirective } from './query-param-group.directive';
import { DefaultControlValueAccessorDirective, NGQP_BUILT_IN_ACCESSORS } from './accessors/accessors';

/**
 * TODO Documentation
 */
@Directive({
    selector: '[queryParamName]',
})
export class QueryParamNameDirective implements OnInit {

    /** TODO Documentation */
    @Input('queryParamName')
    public name: string;

    /** TODO Documentation */
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

    public ngOnInit() {
        if (!this.name) {
            throw new Error(`queryParamName has been added, but without specifying the name.`);
        }

        this.setupControl();
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
                    throw new Error(`More than one built-in control value accessor matches`);
                }

                builtInAccessor = valueAccessor;
            } else {
                if (customAccessor !== null) {
                    throw new Error(`More than one custom ControlValueAccessor has been found on the control`);
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

        throw new Error(`No matching control value accessor has been found for this form control`);
    }

    private setupControl(): void {
        this.parent.addControl(this);
    }

}

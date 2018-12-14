import { Directive, Host, Inject, Input, OnChanges, OnInit, Optional, Self, SimpleChanges, SkipSelf } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QueryParamGroupDirective } from './query-param-group.directive';
import { NgqpDefaultControlValueAccessorDirective } from './accessors/accessors';

/**
 * TODO Documentation
 */
@Directive({
    selector: '[queryParamName]',
})
export class QueryParamNameDirective implements OnInit, OnChanges {

    /** TODO Documentation */
    @Input('queryParamName')
    public name: string;

    /** TODO Documentation */
    public valueAccessor: ControlValueAccessor | null = null;

    private added = false;

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
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (!this.added) {
            this.setupControl();
        }
    }

    /**
     * This resembles the selectControlValueAccessor function from
     *   https://github.com/angular/angular/blob/7.1.2/packages/forms/src/directives/shared.ts#L186
     * We can't use it directly since it isn't exported in the public API, but let's hope choosing
     * any accessor is good enough for our purposes.
     */
    private selectValueAccessor(valueAccessors: ControlValueAccessor[]): ControlValueAccessor | null {
        if (!valueAccessors) {
            return null;
        }

        // TODO Check against all our custom accessors (similar to selectValueAccessor in @angular/forms)

        const customAccessor = valueAccessors
            .find(valueAccessor => valueAccessor.constructor !== NgqpDefaultControlValueAccessorDirective);
        if (customAccessor !== undefined) {
            return customAccessor;
        }

        const defaultAccessor = valueAccessors
            .find(valueAccessor => valueAccessor.constructor === NgqpDefaultControlValueAccessorDirective);
        if (defaultAccessor !== undefined) {
            return defaultAccessor;
        }

        return null;
    }

    private setupControl(): void {
        this.parent.addControl(this);
        this.added = true;
    }

}

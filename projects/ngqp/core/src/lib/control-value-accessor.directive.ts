import { Directive, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * TODO Documentation
 *
 * <app-foo #ctrl
 *          controlValueAccessor #accessor="controlValueAccessor"
 *          (fooChange)="accessor.notifyChange($event)"
 *          (valueChange)="ctrl.foo = $event">
 * </app-foo>
 */
@Directive({
    selector: '[controlValueAccessor]',
    exportAs: 'controlValueAccessor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ControlValueAccessorDirective),
            multi: true
        }
    ],
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor {

    /** TODO Documentation */
    @Output('valueChange')
    public valueChange = new EventEmitter<T>();

    /** TODO Documentation */
    @Output('disabledChange')
    public disabledChange = new EventEmitter<boolean>();

    private fnChange = (_: T) => {};
    private fnTouched = () => {};

    /** TODO Documentation */
    public notifyChange(value: T): void {
        this.fnChange(value);
    }

    public writeValue(value: T) {
        this.valueChange.emit(value);
    }

    public registerOnChange(fn: (value: T) => any) {
        this.fnChange = fn;
    }

    public registerOnTouched(fn: () => any) {
        this.fnTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.disabledChange.emit(isDisabled);
    }

}
import { Directive, EventEmitter, forwardRef, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Provides an ad-hoc ControlValueAccessor to a component.
 *
 * This directive provides a ControlValueAccessor for the host on which it is applied
 * by proxying the required interface through events and an API.
 *
 *
 *     <app-item-selector #ctrl
 *              controlValueAccessor #accessor="controlValueAccessor"
 *              (itemChange)="accessor.notifyChange($event)"
 *              (controlValueChange)="ctrl.item = $event">
 *     </app-item-selector>
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

    /**
     * Fired when a value should be written (model -> view).
     *
     * From the ControlValueAccessor perspective, this is the equivalent of
     * writeValue. You should bind to this event and update your component's
     * state with the given value.
     */
    @Output('controlValueChange')
    public controlValueChange = new EventEmitter<T>();

    /**
     * Fired when the control's disabled change should change.
     *
     * From the ControlValueAccessor perspective, this is the equivalent of
     * setDisabledState.
     *
     * This is currently not used by ngqp.
     */
    @Output('disabledChange')
    public disabledChange = new EventEmitter<boolean>();

    private fnChange = (_: T) => {};
    private fnTouched = () => {};

    /**
     * Write a new value to the model (view -> model)
     *
     * When your component's value changes, call this method to inform
     * the model about the change.
     */
    public notifyChange(value: T): void {
        this.fnChange(value);
    }

    /**
     * Inform that the component has been touched by the user.
     *
     * This is currently not used by ngqp.
     */
    public notifyTouched(): void {
        this.fnTouched();
    }

    /** @internal */
    public writeValue(value: T) {
        this.controlValueChange.emit(value);
    }

    /** @internal */
    public registerOnChange(fn: (value: T) => any) {
        this.fnChange = fn;
    }

    /** @internal */
    public registerOnTouched(fn: () => any) {
        this.fnTouched = fn;
    }

    /** @internal */
    public setDisabledState(isDisabled: boolean) {
        this.disabledChange.emit(isDisabled);
    }

}
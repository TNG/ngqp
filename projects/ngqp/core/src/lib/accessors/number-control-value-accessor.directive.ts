import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** @ignore */
export const NGQP_NUMBER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberControlValueAccessorDirective),
    multi: true
};

/** @ignore */
@Directive({
    selector: 'input[type=number][queryParamName],input[type=number][queryParam]',
    providers: [NGQP_NUMBER_VALUE_ACCESSOR],
})
export class NumberControlValueAccessorDirective implements ControlValueAccessor {

    private fnChange = (_: number | null) => {};
    private fnTouched = () => {};

    @HostListener('input', ['$event'])
    public onInput(event: UIEvent) {
        const value = (event.target as HTMLInputElement).value;
        this.fnChange(value === '' ? null : parseFloat(value));
    }

    @HostListener('blur')
    public onBlur() {
        this.fnTouched();
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLInputElement>) {
    }

    public writeValue(value: any) {
        const normalizedValue = value === null ? '' : value;
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', normalizedValue);
    }

    public registerOnChange(fn: any) {
        this.fnChange = fn;
    }

    public registerOnTouched(fn: any) {
        this.fnTouched = fn;
    }

    public setDisabledState(isDisabled: boolean) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
    }

}
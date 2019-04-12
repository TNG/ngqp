import { Directive, ElementRef, forwardRef, HostListener, Provider, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** @ignore */
const NGQP_CHECKBOX_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxControlValueAccessorDirective),
    multi: true
};

/** @ignore */
@Directive({
    selector: 'input[type=checkbox][queryParamName],input[type=checkbox][queryParam]',
    providers: [NGQP_CHECKBOX_VALUE_ACCESSOR],
})
export class CheckboxControlValueAccessorDirective implements ControlValueAccessor {

    private fnChange = (_: boolean) => {};
    private fnTouched = () => {};

    @HostListener('change', ['$event'])
    public onInput(event: UIEvent) {
        this.fnChange((event.target as HTMLInputElement).checked);
    }

    @HostListener('blur')
    public onBlur() {
        this.fnTouched();
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLInputElement>) {
    }

    public writeValue(value: boolean) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
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
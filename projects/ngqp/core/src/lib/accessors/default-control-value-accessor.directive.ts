import { Directive, ElementRef, forwardRef, HostListener, Inject, Optional, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

/** @ignore */
export const NGQP_DEFAULT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DefaultControlValueAccessorDirective),
    multi: true
};

/** @ignore */
function isAndroid(navigator: Navigator): boolean {
    return /android (\d+)/.test(navigator.userAgent.toLowerCase());
}

/** @ignore */
@Directive({
    selector: 'input:not([type=checkbox]):not([type=radio])[queryParamName],textarea[queryParamName],' +
              'input:not([type=checkbox]):not([type=radio])[queryParam],textarea[queryParam]',
    providers: [NGQP_DEFAULT_VALUE_ACCESSOR],
})
export class DefaultControlValueAccessorDirective implements ControlValueAccessor {

    private readonly supportsComposition: boolean;
    private composing = false;

    private fnChange = (_: string) => {};
    private fnTouched = () => {};

    @HostListener('input', ['$event'])
    public onInput(event: UIEvent) {
        if (this.supportsComposition && this.composing) {
            return;
        }

        this.fnChange((event.target as HTMLInputElement).value);
    }

    @HostListener('blur')
    public onBlur() {
        this.fnTouched();
    }

    @HostListener('compositionstart')
    public onCompositionStart() {
        this.composing = true;
    }

    @HostListener('compositionend', ['$event'])
    public onCompositionEnd(event: UIEvent) {
        this.composing = false;
        if (this.supportsComposition) {
            this.fnChange((event.target as HTMLInputElement).value);
        }
    }

    constructor(
        @Optional() @Inject(PLATFORM_ID) private platformId: string | null,
        private renderer: Renderer2,
        private elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>
    ) {
        this.supportsComposition = isPlatformBrowser(this.platformId || '') && !isAndroid(window.navigator);
    }

    public writeValue(value: string) {
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
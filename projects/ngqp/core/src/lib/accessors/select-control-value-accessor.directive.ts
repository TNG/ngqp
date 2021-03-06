import { Directive, ElementRef, forwardRef, HostListener, Provider, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { undefinedToNull } from '../util';

/** @ignore */
const NGQP_SELECT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlValueAccessorDirective),
    multi: true
};

/** @ignore */
@Directive({
    selector: 'select:not([multiple])[queryParamName],select:not([multiple])[queryParam]',
    providers: [NGQP_SELECT_VALUE_ACCESSOR],
})
export class SelectControlValueAccessorDirective<T> implements ControlValueAccessor {

    public value: T | null = null;
    private selectedId: string | null = null;
    private optionMap = new Map<string, T>();

    private idCounter = 0;
    private fnChange = (_: T | null) => {};
    private fnTouched = () => {};

    @HostListener('change', ['$event'])
    public onChange(event: UIEvent) {
        this.selectedId = (event.target as HTMLOptionElement).value;
        this.value = undefinedToNull(this.optionMap.get(this.selectedId));
        this.fnChange(this.value);
    }

    @HostListener('blur')
    public onTouched() {
        this.fnTouched();
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLSelectElement>) {
    }

    public writeValue(value: T | null) {
        this.value = value;

        this.selectedId = value === null ? null : this.getOptionId(value);
        if (this.selectedId === null) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'selectedIndex', -1);
        }

        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.selectedId);
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

    public registerOption(): string {
        return (this.idCounter++).toString();
    }

    public deregisterOption(id: string): void {
        this.optionMap.delete(id);
    }

    public updateOptionValue(id: string, value: T): void {
        this.optionMap.set(id, value);

        if (this.selectedId === id) {
            this.fnChange(value);
        }
    }

    private getOptionId(value: T): string | null {
        for (const id of Array.from(this.optionMap.keys())) {
            if (this.optionMap.get(id) === value) {
                return id;
            }
        }

        return null;
    }

}
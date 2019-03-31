import { Directive, ElementRef, forwardRef, HostListener, Renderer2, StaticProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectOptionDirective } from './multi-select-option.directive';

/** @ignore */
export const NGQP_MULTI_SELECT_VALUE_ACCESSOR: StaticProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectControlValueAccessorDirective),
    multi: true
};

/** @ignore */
@Directive({
    selector: 'select[multiple][queryParamName],select[multiple][queryParam]',
    providers: [NGQP_MULTI_SELECT_VALUE_ACCESSOR],
})
export class MultiSelectControlValueAccessorDirective<T> implements ControlValueAccessor {

    private selectedIds: string[] = [];
    private options = new Map<string, MultiSelectOptionDirective<T>>();
    private optionMap = new Map<string, T>();

    private idCounter = 0;
    private fnChange = (_: T[]) => {};
    private fnTouched = () => {};

    @HostListener('change')
    public onChange() {
        this.selectedIds = Array.from(this.options.entries())
            .filter(([id, option]) => option.selected)
            .map(([id]) => id);
        const values = this.selectedIds.map(id => this.optionMap.get(id)!);
        this.fnChange(values);
    }

    @HostListener('blur')
    public onTouched() {
        this.fnTouched();
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef<HTMLSelectElement>) {
    }

    public writeValue(values: T[]) {
        values = values === null ? <T[]>[] : values;
        if (!Array.isArray(values)) {
            throw new Error(`Provided a non-array value to select[multiple]: ${values}`);
        }

        this.selectedIds = values
            .map(value => this.getOptionId(value))
            .filter(id => id !== null)
            .map(id => id as string);
        this.options.forEach((option, id) => option.selected = this.selectedIds.includes(id));
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

    public registerOption(option: MultiSelectOptionDirective<T>): string {
        const newId = (this.idCounter++).toString();
        this.options.set(newId, option);
        return newId;
    }

    public deregisterOption(id: string): void {
        this.optionMap.delete(id);
    }

    public updateOptionValue(id: string, value: T): void {
        this.optionMap.set(id, value);
        if (this.selectedIds.includes(id)) {
            this.onChange();
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
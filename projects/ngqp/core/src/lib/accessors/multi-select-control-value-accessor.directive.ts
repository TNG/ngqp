import {
    Directive,
    ElementRef,
    forwardRef,
    Host,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    StaticProvider
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const NGQP_MULTI_SELECT_VALUE_ACCESSOR: StaticProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectControlValueAccessorDirective),
    multi: true
};

@Directive({
    selector: 'select[multiple][queryParamName]',
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
        const values = this.selectedIds.map(id => this.optionMap.get(id));
        this.fnChange(values);
    }

    @HostListener('blur')
    public onTouched() {
        this.fnTouched();
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    }

    public writeValue(values: T[]) {
        values = values === null ? <T[]>[] : values;
        if (!Array.isArray(values)) {
            throw new Error(`Provided a non-array value to select[multiple]: ${values}`);
        }

        this.selectedIds = values
            .map(value => this.getOptionId(value))
            .filter(id => id !== null);
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

@Directive({
    selector: 'option',
})
export class MultiSelectOptionDirective<T> implements OnInit, OnDestroy {

    private readonly id: string | null = null;

    constructor(
        @Optional() @Host() private parent: MultiSelectControlValueAccessorDirective<T>,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        this.id = this.parent.registerOption(this);
    }

    public ngOnInit() {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.id);
    }

    public ngOnDestroy() {
        this.parent.deregisterOption(this.id);
    }

    @Input('value')
    public set value(value: T) {
        this.parent.updateOptionValue(this.id, value);
    }

    public get selected(): boolean {
        return (this.elementRef.nativeElement as HTMLOptionElement).selected;
    }

    public set selected(selected: boolean) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'selected', this.selected);
    }

}
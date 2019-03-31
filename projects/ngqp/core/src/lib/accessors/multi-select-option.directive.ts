import { Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { MultiSelectControlValueAccessorDirective } from './multi-select-control-value-accessor.directive';

/** @ignore */
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
        if (this.parent) {
            this.id = this.parent.registerOption(this);
        }
    }

    public ngOnInit() {
        if (this.parent) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.id);
        }
    }

    public ngOnDestroy() {
        if (this.parent) {
            this.parent.deregisterOption(this.id!);
        }
    }

    @Input('value')
    public set value(value: T) {
        if (this.parent) {
            this.parent.updateOptionValue(this.id!, value);
        }
    }

    public get selected(): boolean {
        return (this.elementRef.nativeElement as HTMLOptionElement).selected;
    }

    public set selected(selected: boolean) {
        if (this.parent) {
            this.renderer.setProperty(this.elementRef.nativeElement, 'selected', selected);
        }
    }

}
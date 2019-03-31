import { Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { SelectControlValueAccessorDirective } from './select-control-value-accessor.directive';

/** @ignore */
@Directive({
    selector: 'option',
})
export class SelectOptionDirective<T> implements OnInit, OnDestroy {

    private readonly id: string | null = null;

    constructor(
        @Optional() @Host() private parent: SelectControlValueAccessorDirective<T>,
        private renderer: Renderer2,
        private elementRef: ElementRef,
    ) {
        if (this.parent) {
            this.id = this.parent.registerOption();
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
            this.parent.writeValue(this.parent.value);
        }
    }

    @Input('value')
    public set value(value: T) {
        if (this.parent) {
            this.parent.updateOptionValue(this.id!, value);
            this.parent.writeValue(this.parent.value);
        }
    }

}
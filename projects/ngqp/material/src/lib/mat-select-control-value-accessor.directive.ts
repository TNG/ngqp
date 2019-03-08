import { AfterViewInit, Directive, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: 'mat-select[queryParamName], mat-select[queryParam]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatSelectControlValueAccessorDirective),
            multi: true,
        },
    ],
})
export class MatSelectControlValueAccessorDirective implements ControlValueAccessor, AfterViewInit, OnDestroy {

    private value: unknown;
    private readonly destroy$ = new Subject<void>();

    constructor(private matSelect: MatSelect) {
    }

    public ngAfterViewInit(): void {
        this.matSelect.options.changes.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => Promise.resolve().then(() => this.matSelect.writeValue(this.value)));
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    public registerOnChange(fn: any): void {
        this.matSelect.registerOnChange((value: unknown) => {
            this.value = value;
            fn(value);
        });
    }

    public registerOnTouched(fn: any): void {
        this.matSelect.registerOnTouched(fn);
    }

    public setDisabledState(isDisabled: boolean): void {
        this.matSelect.setDisabledState(isDisabled);
    }

    public writeValue(value: unknown): void {
        this.value = value;

        const selectedOption = this.matSelect.selected;

        if (selectedOption) {
            if (Array.isArray(selectedOption) && Array.isArray(value)) {
                if (value.length === selectedOption.length && value.every((v: unknown, i) => v === selectedOption[ i ])) {
                    return;
                }
            } else if (!Array.isArray(selectedOption)) {
                if (value === selectedOption.value) {
                    return;
                }
            }
        }

        setTimeout(() => this.matSelect.writeValue(value), 0);
    }

}
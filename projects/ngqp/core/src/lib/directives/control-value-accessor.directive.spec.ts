import { Component, getDebugNode } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlValueAccessorDirective } from './control-value-accessor.directive';

@Component({
    template: `
        <input #input type="text"
               controlValueAccessor #accessor="controlValueAccessor"
               (controlValueChange)="input.value = $event"
               (input)="accessor.notifyChange($event.target.value)"
        />
    `
})
export class TextInputControlValueAccessorDirectiveTestComponent {}

describe(ControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<TextInputControlValueAccessorDirectiveTestComponent>;
    let component: TextInputControlValueAccessorDirectiveTestComponent;
    let element: HTMLInputElement;
    let accessor: ControlValueAccessorDirective<string>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                ControlValueAccessorDirective,
                TextInputControlValueAccessorDirectiveTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextInputControlValueAccessorDirectiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        accessor = getDebugNode(element).injector.get<ControlValueAccessorDirective<string>>(ControlValueAccessorDirective);
    });

    it('should attach the accessor', () => expect(accessor).toBeDefined());

    it('should update the view when the model changes', () => {
        accessor.writeValue('Hello World');
        expect(element.value).toBe('Hello World');
    });

    it('should update the model when the view changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        element.value = 'Hello World';
        element.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalledWith('Hello World');
    });

});
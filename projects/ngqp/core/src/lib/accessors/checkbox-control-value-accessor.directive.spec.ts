import { Component, getDebugNode } from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { CheckboxControlValueAccessorDirective } from './checkbox-control-value-accessor.directive';

@Component({
    selector: 'checkbox-test',
    template: `<input type="checkbox" queryParamName="test"/>`,
})
class CheckboxAccessorTestComponent {
}

describe(CheckboxControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<CheckboxAccessorTestComponent>;
    let component: CheckboxAccessorTestComponent;
    let element: HTMLInputElement;
    let accessor: CheckboxControlValueAccessorDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                CheckboxControlValueAccessorDirective,
                CheckboxAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        accessor = getDebugNode(element).injector.get<CheckboxControlValueAccessorDirective>(CheckboxControlValueAccessorDirective);
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        accessor.writeValue(true);
        expect(element.checked).toBe(true);
    });

    it('should call the registered function whenever the value changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        element.checked = true;
        element.dispatchEvent(new Event('change'));

        expect(spy).toHaveBeenCalledWith(true);
    });
});
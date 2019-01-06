import { Component, getDebugNode } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberControlValueAccessorDirective } from './number-control-value-accessor.directive';

@Component({
    selector: 'number-test',
    template: `<input type="number" queryParamName="test"/>`,
})
export class NumberAccessorTestComponent {
}

describe(NumberControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<NumberAccessorTestComponent>;
    let component: NumberAccessorTestComponent;
    let element: HTMLInputElement;
    let accessor: NumberControlValueAccessorDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NumberControlValueAccessorDirective,
                NumberAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        accessor = getDebugNode(element).injector.get<NumberControlValueAccessorDirective>(NumberControlValueAccessorDirective);
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        const newValue = 42;
        accessor.writeValue(newValue);
        expect(element.value).toBe(`${newValue}`);
    });

    it('should write an empty string to the view if null is written', () => {
        accessor.writeValue(null);
        expect(element.value).toBe('');
    });

    it('should call the registered function whenever the value changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        const newValue = 42;
        element.value = `${newValue}`;
        element.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalledWith(newValue);
    });
});
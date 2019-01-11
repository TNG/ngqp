import { Component, getDebugNode } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RangeControlValueAccessorDirective } from './range-control-value-accessor.directive';

@Component({
    selector: 'range-test',
    template: `<input type="range" min="0" max="100" queryParamName="test"/>`,
})
class RangeAccessorTestComponent {
}

describe(RangeControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<RangeAccessorTestComponent>;
    let component: RangeAccessorTestComponent;
    let element: HTMLInputElement;
    let accessor: RangeControlValueAccessorDirective;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RangeControlValueAccessorDirective,
                RangeAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RangeAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        accessor = getDebugNode(element).injector.get<RangeControlValueAccessorDirective>(RangeControlValueAccessorDirective);
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        const newValue = 42;
        accessor.writeValue(newValue);
        expect(element.value).toBe(`${newValue}`);
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
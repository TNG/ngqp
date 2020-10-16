import { Component, getDebugNode } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultControlValueAccessorDirective } from './default-control-value-accessor.directive';

@Component({
    selector: 'default-test',
    template: `<input type="text" queryParamName="test"/>`,
})
class DefaultAccessorTestComponent {
}

describe(DefaultControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<DefaultAccessorTestComponent>;
    let component: DefaultAccessorTestComponent;
    let element: HTMLInputElement;
    let accessor: DefaultControlValueAccessorDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultControlValueAccessorDirective,
                DefaultAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        accessor = getDebugNode(element).injector.get<DefaultControlValueAccessorDirective>(DefaultControlValueAccessorDirective);
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        const newValue = 'Test 123';
        accessor.writeValue(newValue);
        expect(element.value).toBe(newValue);
    });

    it('should write an empty string to the view if null is written', () => {
        accessor.writeValue(null);
        expect(element.value).toBe('');
    });

    it('should call the registered function whenever the value changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        const newValue = 'Test 123';
        element.value = newValue;
        element.dispatchEvent(new Event('input'));

        expect(spy).toHaveBeenCalledWith(newValue);
    });
});
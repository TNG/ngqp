import { Component, getDebugNode } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectControlValueAccessorDirective } from './select-control-value-accessor.directive';
import { SelectOptionDirective } from './select-option.directive';

@Component({
    selector: 'select-test',
    template: `
        <select queryParamName="test">
            <option value="v1" selected>Option 1</option>
            <option value="v2">Option 2</option>
        </select>
`,
})
class SelectAccessorTestComponent {
}

describe(SelectControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<SelectAccessorTestComponent>;
    let component: SelectAccessorTestComponent;
    let element: HTMLSelectElement;
    let option1: HTMLOptionElement;
    let option2: HTMLOptionElement;
    let accessor: SelectControlValueAccessorDirective<any>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                SelectControlValueAccessorDirective,
                SelectOptionDirective,
                SelectAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('select');
        option1 = element.querySelectorAll('option')[0];
        option2 = element.querySelectorAll('option')[1];
        accessor = getDebugNode(element).injector.get<SelectControlValueAccessorDirective<any>>(SelectControlValueAccessorDirective);
        fixture.detectChanges();
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        accessor.writeValue('v2');
        expect(element.value).toBe('1');
        expect(option1.selected).toBe(false);
        expect(option2.selected).toBe(true);
    });

    it('should call the registered function whenever the value changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        element.value = '1';
        element.dispatchEvent(new Event('change'));

        expect(spy).toHaveBeenCalledWith('v2');
    });
});
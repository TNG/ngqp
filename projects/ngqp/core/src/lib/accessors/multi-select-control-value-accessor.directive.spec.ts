import { Component, getDebugNode } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectControlValueAccessorDirective } from './multi-select-control-value-accessor.directive';
import { MultiSelectOptionDirective } from './multi-select-option.directive';

@Component({
    selector: 'multi-select-test',
    template: `
        <select multiple queryParamName="test">
            <option value="v1" selected>Option 1</option>
            <option value="v2">Option 2</option>
        </select>
`,
})
class MultiSelectAccessorTestComponent {
}

describe(MultiSelectControlValueAccessorDirective.name, () => {
    let fixture: ComponentFixture<MultiSelectAccessorTestComponent>;
    let component: MultiSelectAccessorTestComponent;
    let element: HTMLSelectElement;
    let option1: HTMLOptionElement;
    let option2: HTMLOptionElement;
    let accessor: MultiSelectControlValueAccessorDirective<any>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                MultiSelectControlValueAccessorDirective,
                MultiSelectOptionDirective,
                MultiSelectAccessorTestComponent,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiSelectAccessorTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        element = (fixture.nativeElement as HTMLElement).querySelector('select');
        option1 = element.querySelectorAll('option')[0];
        option2 = element.querySelectorAll('option')[1];
        accessor = getDebugNode(element).injector.get<MultiSelectControlValueAccessorDirective<any>>(MultiSelectControlValueAccessorDirective);
        fixture.detectChanges();
    });

    it('should attach the accessor if queryParamName is set', () => expect(accessor).toBeDefined());

    it('should write the value to the view', () => {
        accessor.writeValue([ 'v2' ]);
        expect(option1.selected).toBe(false);
        expect(option2.selected).toBe(true);
    });

    it('should allow selecting more than one option', () => {
        accessor.writeValue([ 'v1', 'v2' ]);
        expect(option1.selected).toBe(true);
        expect(option2.selected).toBe(true);
    });

    it('should call the registered function whenever the value changes', () => {
        const spy = jasmine.createSpy('fn');
        accessor.registerOnChange(spy);

        option2.selected = true;
        element.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith([ 'v1', 'v2' ]);

        option1.selected = false;
        element.dispatchEvent(new Event('change'));
        expect(spy).toHaveBeenCalledWith([ 'v2' ]);
    });
});
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material';
import { QueryParamGroup, QueryParamBuilder, QueryParamModule } from '../../../core/src/public_api';
import { QueryParamMaterialModule } from './core';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <mat-select #matSelect queryParamName="param">
                <option value="A">A</option>
                <option value="B">B</option>
            </mat-select>
        </div>
    `,
})
export class TestComponent {

    @ViewChild('matSelect')
    public matSelect: MatSelect;

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param: qpb.stringParam('p'),
        });
    }

}

describe('mat-select', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                MatSelectModule,
                QueryParamModule,
                QueryParamMaterialModule,
            ],
            declarations: [
                TestComponent,
            ],
        });

        router = TestBed.get(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('has a ControlValueAccessor to make ngqp work', fakeAsync(() => {
        router.navigateByUrl('/?p=B');
        tick(100);

        fixture.whenStable().then(() => {
            const selected = component.matSelect.selected as MatOption;

            expect(selected).not.toBeNull();
            expect(selected.value).toBe('B');
        });
    }));

    it('changes an already selected option', fakeAsync(() => {
        component.matSelect.writeValue('A');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const selected = component.matSelect.selected as MatOption;

            expect(selected).not.toBeNull();
            expect(selected.value).toBe('A');
        });

        router.navigateByUrl('/?p=B');
        tick(100);

        fixture.whenStable().then(() => {
            const selected = component.matSelect.selected as MatOption;

            expect(selected).not.toBeNull();
            expect(selected.value).toBe('B');
        });
    }));
});
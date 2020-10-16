import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <select multiple queryParamName="param">
                <option *ngFor="let i of [1,2,3,4,5]" [value]="'Test_' + i">Test {{ i }}</option>
            </select>
        </div>
    `,
})
class TestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param: qpb.stringParam('q', {
                multi: true,
            }),
        });
    }

}

describe('ngqp', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let select: HTMLSelectElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                TestComponent,
            ],
        });

        router = TestBed.inject(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        select = (fixture.nativeElement as HTMLElement).querySelector('select') as HTMLSelectElement;
        fixture.detectChanges();
    });

    it('synchronizes multiple values to the URL', fakeAsync(() => {
        (select.querySelectorAll('option')[0] as HTMLOptionElement).selected = true;
        (select.querySelectorAll('option')[1] as HTMLOptionElement).selected = true;
        select.dispatchEvent(new Event('change'));
        tick();

        expect(router.url).toBe('/?q=Test_1&q=Test_2');
    }));

    it('synchronizes multiple values from the URL', fakeAsync(() => {
        router.navigateByUrl('/?q=Test_1&q=Test_5');
        tick();

        select.querySelectorAll('option').forEach((option: HTMLOptionElement, idx) => {
            expect(option.selected).toBe(idx === 0 || idx === 4);
        });
    }));
});
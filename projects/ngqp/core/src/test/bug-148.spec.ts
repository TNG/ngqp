import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { captureObservable, scheduler, setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input type="text" queryParamName="singleParam">
            <select multiple queryParamName="multiParam">
                <option *ngFor="let i of [1,2,3,4,5]" [value]="'Test_' + i">Test {{ i }}</option>
            </select>
        </div>
    `,
})
class TestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            singleParam: qpb.stringParam('p1'),
            multiParam: qpb.stringParam('p2', {
                multi: true,
            }),
        });
    }

}

describe('ngqp', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let input: HTMLInputElement;
    let select: HTMLSelectElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
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

        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        select = (fixture.nativeElement as HTMLElement).querySelector('select') as HTMLSelectElement;
        fixture.detectChanges();
    });

    it('emits with single and multi params if the multi param has no value set', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const valueChange$ = captureObservable(component.paramGroup.valueChanges);

            input.value = 'Test';
            input.dispatchEvent(new Event('input'));
            tick();

            expectObservable(valueChange$).toBe('a', { a: { singleParam: 'Test', multiParam: [] } });
        });
    }));
});

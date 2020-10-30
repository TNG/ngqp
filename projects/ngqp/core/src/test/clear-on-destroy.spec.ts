import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { setupNavigationWarnStub } from './util';

@Component({
    template: `<child *ngIf="shown" [paramGroup]="paramGroup"></child>`,
})
class TestComponent {
    public shown = true;
    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            stringParam: qpb.stringParam('p1'),
            partitionedParam: qpb.partition([
                qpb.stringParam('p2a'),
                qpb.stringParam('p2b'),
            ], {
                partition: (v: string): [string, string] => [v[0], v[1]],
                reduce: ([v1, v2]) => v1 + v2,
            }),
        }, {
            clearOnDestroy: true,
        });
    }
}

@Component({
    selector: 'child',
    template: `<div [queryParamGroup]="paramGroup"></div>`,
})
class ChildComponent {
    @Input()
    public paramGroup: QueryParamGroup;
}

describe('ngqp', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
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
                ChildComponent,
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
    });

    it('clears managed query parameters if clearOnDestroy is set', fakeAsync(() => {
        // Make sure non-managed parameters are not cleared
        router.navigate([], {
            queryParams: {
                q: 'Test'
            },
        });
        tick();

        component.paramGroup.setValue({
            stringParam: 'S',
            partitionedParam: ['A', 'B'],
        });
        tick();
        expect(router.url).toBe('/?q=Test&p1=S&p2a=A&p2b=B');

        component.shown = false;
        fixture.detectChanges();
        tick();
        expect(router.url).toBe('/?q=Test');
    }));
});

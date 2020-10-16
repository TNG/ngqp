import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { captureObservable, scheduler, setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input *ngIf="showInput" type="text" queryParamName="param" />
        </div>
    `,
})
class TestComponent {

    public paramGroup: QueryParamGroup;
    public showInput = false;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({});
    }

}

describe('QueryParamGroup#add', () => {
    let paramGroup: QueryParamGroup;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let router: Router;
    let qpb: QueryParamBuilder;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule.withConfig(),
            ],
            declarations: [
                TestComponent,
            ],
        });

        router = TestBed.inject(Router);
        qpb = TestBed.inject(QueryParamBuilder);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        paramGroup = component.paramGroup;
    });

    it('adds a parameter with an initial null value if the URL is not set', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const value$ = captureObservable(paramGroup.valueChanges);

            paramGroup.add('param', qpb.stringParam('q'));
            component.showInput = true;
            fixture.detectChanges();

            expectObservable(value$).toBe('a', {
                a: { param: null },
            });
        });
    }));

    it('synchronizes a new parameter from the URL', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            router.navigateByUrl('/?q=Test');
            tick();

            const value$ = captureObservable(paramGroup.valueChanges);

            paramGroup.add('param', qpb.stringParam('q'));
            component.showInput = true;
            fixture.detectChanges();

            expectObservable(value$).toBe('a', {
                a: { param: 'Test' },
            });
        });
    }));

    it('binds the value accessor correctly', fakeAsync(() => {
        paramGroup.add('param', qpb.stringParam('q'));
        component.showInput = true;
        fixture.detectChanges();

        const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        fixture.detectChanges();

        input.value = 'Test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?q=Test');
    }));
});
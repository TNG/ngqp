import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParam, QueryParamGroup, QueryParamModule } from '../public_api';
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
    public param: QueryParam<string>;
    public showInput = true;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');
        this.paramGroup = qpb.group({
            param: this.param,
        });
    }

}

describe('QueryParamGroup#remove', () => {
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

    it('removes a parameter from value changes', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            paramGroup.remove('param');
            fixture.detectChanges();

            const groupValue$ = captureObservable(paramGroup.valueChanges);
            const value$ = captureObservable(component.param.valueChanges);

            router.navigateByUrl('/?q=Test');
            tick();

            expectObservable(groupValue$).toBe('');
            expectObservable(value$).toBe('');
        });
    }));

    it('detaches the value accessor', fakeAsync(() => {
        paramGroup.remove('param');
        fixture.detectChanges();

        const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        input.value = 'Test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/');
    }));

    it('re-attaches the value accessor when the parameter is added back', fakeAsync(() => {
        paramGroup.remove('param');
        fixture.detectChanges();

        paramGroup.add('param', component.param);
        fixture.detectChanges();

        const input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        input.value = 'Test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?q=Test');
    }));
});
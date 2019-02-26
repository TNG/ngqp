import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParam, QueryParamBuilder, QueryParamModule } from '../public_api';
import { captureObservable, scheduler, setupNavigationWarnStub } from './util';

@Component({
    template: `<input type="text" [queryParam]="param" />`,
})
class StaticStandaloneExampleComponent {

    public param: QueryParam<string>;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');
    }

}

@Component({
    template: `<input type="text" [queryParam]="bound ? param : null" />`,
})
class ToggleStandaloneExampleComponent {

    public param: QueryParam<string>;
    public bound = false;

    constructor(private qpb: QueryParamBuilder) {
        this.param = qpb.stringParam('q');
    }

}

describe('ngqp standalone parameters', () => {
    let fixture: ComponentFixture<StaticStandaloneExampleComponent>;
    let component: StaticStandaloneExampleComponent;
    let input: HTMLInputElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                StaticStandaloneExampleComponent,
            ],
        });

        router = TestBed.get(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StaticStandaloneExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        fixture.detectChanges();
    });

    it('synchronizes a form control value change to the URL', fakeAsync(() => {
        input.value = 'Test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?q=Test');
    }));

    it('synchronizes a URL change to the form control', fakeAsync(() => {
        router.navigateByUrl('/?q=Test');
        tick();

        expect(input.value).toBe('Test');
    }));

    it('synchronizes a programmatic change of the param to the URL', fakeAsync(() => {
        component.param.setValue('Test');
        tick();

        expect(router.url).toBe('/?q=Test');
    }));

    it('emits the current value on a URL change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const paramValueChanges$ = captureObservable(component.param.valueChanges);

            router.navigateByUrl('/?q=Test');
            tick();

            expectObservable(paramValueChanges$).toBe('a', { a: 'Test' });
        });
    }));

    it('emits the current value on a programmatic change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const paramValueChanges$ = captureObservable(component.param.valueChanges);

            component.param.setValue('Test');
            tick();

            expectObservable(paramValueChanges$).toBe('a', { a: 'Test' });
        });
    }));

    it('does not emit the current value on a programmatic change if instructed not to', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const paramValueChanges$ = captureObservable(component.param.valueChanges);

            component.param.setValue('Test', { emitEvent: false });
            tick();

            expectObservable(paramValueChanges$).toBe('');
        });
    }));

    it('does not emit if unrelated URL parameters change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const value$ = captureObservable(component.param.valueChanges);

            router.navigateByUrl(`/?unrelated=42`);
            tick();

            expectObservable(value$).toBe('');
        });
    }));
});

describe('Standalone parameters', () => {
    let fixture: ComponentFixture<ToggleStandaloneExampleComponent>;
    let component: ToggleStandaloneExampleComponent;
    let input: HTMLInputElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                ToggleStandaloneExampleComponent,
            ],
        });

        router = TestBed.get(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleStandaloneExampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        fixture.detectChanges();
    });

    it('can be bound at runtime', fakeAsync(() => {
        component.bound = true;
        fixture.detectChanges();

        input.value = 'Test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe(`/?q=Test`);
    }));

    it('can be unbound at runtime', fakeAsync(() => {
        component.bound = true;
        fixture.detectChanges();

        router.navigateByUrl(`/?q=One`);
        tick();
        expect(input.value).toBe('One');

        component.bound = false;
        fixture.detectChanges();

        router.navigateByUrl(`/?q=Two`);
        tick();
        expect(input.value).toBe('One');
    }));

    it('synchronizes with the URL upon being bound', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            router.navigateByUrl(`/?q=One`);
            tick();

            const paramValueChanges$ = captureObservable(component.param.valueChanges);

            component.bound = true;
            fixture.detectChanges();

            expectObservable(paramValueChanges$).toBe('a', {a: 'One'});
        });
    }));
});
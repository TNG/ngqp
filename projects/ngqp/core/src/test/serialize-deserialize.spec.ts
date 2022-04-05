import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input type="text" queryParamName="param" />
        </div>
    `,
})
class BasicTestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param: qpb.stringParam('q', {
                serialize: value => value ? value.toUpperCase() : null,
                deserialize: value => value ? value.toLowerCase() : null,
            }),
        });
    }

}

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <select multiple queryParamName="param">
                <option id="a" value="v1">Option 1</option>
                <option id="b" value="v2">Option 2</option>
                <option id="c" value="v3">Option 3</option>
            </select>
        </div>
    `,
})
class MultiTestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param: qpb.stringParam('q', {
                multi: true,
                serializeAll: values => (values.length === 1 && values[0] === 'v2')
                    ? null
                    : values.map(v => v.toUpperCase()),
                deserializeAll: values => values.length === 0
                    ? ['v2']
                    : values.map(v => v.toLowerCase()),
            }),
        });
    }

}

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input type="text" queryParamName="param" />
        </div>
    `,
})
class AsyncTestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param: qpb.stringParam('q', {
                serialize: value => value ? value.toUpperCase() : null,
                deserialize: value => of(value ? value.toLowerCase() : null).pipe(delay(500)),
            }),
        });
    }

}

describe('(de-)serialize', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;
    let input: HTMLInputElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                BasicTestComponent,
            ],
        });

        router = TestBed.inject(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        fixture.detectChanges();
    });

    it('applies a custom serializer when changing the form control', fakeAsync(() => {
        input.value = 'test';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?q=TEST');
    }));

    it('applies the deserializer when the URL changes', fakeAsync(() => {
        router.navigateByUrl('/?q=TEST');
        tick();

        expect(input.value).toBe('test');
    }));
});

describe('(de-)serialize for multi', () => {
    let fixture: ComponentFixture<MultiTestComponent>;
    let component: MultiTestComponent;
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
                MultiTestComponent,
            ],
        });

        router = TestBed.inject(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        select = (fixture.nativeElement as HTMLElement).querySelector('select') as HTMLSelectElement;
        fixture.detectChanges();
    });

    it('selects the default value on initial routing', fakeAsync(() => {
        tick();

        expect(select.namedItem('a').selected).toBe(false);
        expect(select.namedItem('b').selected).toBe(true);
        expect(select.namedItem('c').selected).toBe(false);
    }));

    it('applies a custom serializer when changing the form control', fakeAsync(() => {
        select.namedItem('a').selected = true;
        select.dispatchEvent(new Event('change'));
        tick();

        expect(router.url).toBe('/?q=V1&q=V2');
    }));

    it('applies the deserializer when the URL changes', fakeAsync(() => {
        router.navigateByUrl('/?q=V3');
        tick();

        expect(select.namedItem('a').selected).toBe(false);
        expect(select.namedItem('b').selected).toBe(false);
        expect(select.namedItem('c').selected).toBe(true);
    }));
});

describe('asynchronous (de-)serialize', () => {
    let fixture: ComponentFixture<AsyncTestComponent>;
    let component: AsyncTestComponent;
    let input: HTMLInputElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                AsyncTestComponent,
            ],
        });

        router = TestBed.inject(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AsyncTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        fixture.detectChanges();
    });

    it('applies the async deserializer when the URL changes', fakeAsync(() => {
        router.navigateByUrl('/?q=TEST');

        tick();
        expect(input.value).toBe('');

        tick(500);
        expect(input.value).toBe('test');
    }));
});
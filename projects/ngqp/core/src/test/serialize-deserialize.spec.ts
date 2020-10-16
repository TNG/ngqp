import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
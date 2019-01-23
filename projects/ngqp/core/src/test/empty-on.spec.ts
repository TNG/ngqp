import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input type="text" queryParamName="param1" />
            <input type="text" queryParamName="param2" />
        </div>
    `,
})
class BasicTestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            param1: qpb.stringParam('q1', {
                emptyOn: 'Test',
            }),
            param2: qpb.stringParam('q2', {
                emptyOn: 'Test',
                compareWith: (a, b) => (a || '').toLowerCase() === (b || '').toLowerCase(),
            }),
        });
    }

}

describe('emptyOn', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;
    let input1: HTMLInputElement;
    let input2: HTMLInputElement;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                BasicTestComponent,
            ],
        });

        router = TestBed.get(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        input1 = (fixture.nativeElement as HTMLElement).querySelectorAll('input')[0] as HTMLInputElement;
        input2 = (fixture.nativeElement as HTMLElement).querySelectorAll('input')[1] as HTMLInputElement;
        fixture.detectChanges();
    });

    it('removes the parameter if the default value is set to the form control', fakeAsync(() => {
        input1.value = 'Test';
        input1.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/');
    }));

    it('sets the form control value to the specified default if the query parameter is not set', fakeAsync(() => {
        input1.value = 'Other';
        fixture.detectChanges();

        // We need to pass some other argument since the router won't trigger a navigation for the URL
        // we are already on
        router.navigateByUrl('/?t=1');
        tick();

        fixture.detectChanges();
        expect(input1.value).toBe('Test');
    }));

    it('uses a custom comparator if provided', fakeAsync(() => {
        input2.value = 'Other';
        input2.dispatchEvent(new Event('input'));
        tick();
        expect(router.url).toBe('/?q2=Other');

        input2.value = 'TEST';
        input2.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/');
    }));
});
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
            param: qpb.stringParam('q'),
        });
    }

}

describe('ngqp', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;
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
        component.paramGroup.get('param').setValue('Test');
        tick();

        expect(router.url).toBe('/?q=Test');
    }));

    it('synchronizes a programmatic change of the group to the URL', fakeAsync(() => {
        component.paramGroup.setValue({ param: 'Test' });
        tick();

        expect(router.url).toBe('/?q=Test');
    }));
});
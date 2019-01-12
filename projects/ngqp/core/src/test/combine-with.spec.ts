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
            param: qpb.stringParam({
                param: 'q',
                combineWith: (previous, current) => {
                    return { previous, current };
                },
            }),
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
                QueryParamModule.withConfig(),
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

    it('applies side effect parameter changes when the form control value changes', fakeAsync(() => {
        input.value = 'Test_1';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?current=Test_1&q=Test_1');

        input.value = 'Test_2';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?current=Test_2&q=Test_2&previous=Test_1');
    }));

    it('does not consider combineWith if the URL changes', fakeAsync(() => {
        router.navigateByUrl('/?q=Test');
        tick();

        expect(router.url).toBe('/?q=Test');
    }));
});
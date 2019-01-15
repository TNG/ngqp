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
            param: qpb.stringParam('q', {
                serialize: value => value ? value.toUpperCase() : null,
                deserialize: value => value ? value.toLowerCase() : null,
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
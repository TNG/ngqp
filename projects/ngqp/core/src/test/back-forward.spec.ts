import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { captureObservable, scheduler, setupNavigationWarnStub } from './util';

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
        }, { replaceUrl: false });
    }

}

describe('Location', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;
    let router: Router;
    let location: Location;

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
        location = TestBed.get(Location);

        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasicTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('#back triggers a value emission', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            component.paramGroup.setValue({ param: 'Test1' });
            tick();

            component.paramGroup.setValue({ param: 'Test2' });
            tick();

            const values$ = captureObservable(component.paramGroup.valueChanges);

            location.back();
            tick();

            expectObservable(values$).toBe('a', {
                a: { param: 'Test1' },
            });
        });
    }));

    it('#forward triggers a value emission', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            component.paramGroup.setValue({ param: 'Test1' });
            tick();

            location.back();
            tick();

            const values$ = captureObservable(component.paramGroup.valueChanges);

            location.forward();
            tick();

            expectObservable(values$).toBe('a', {
                a: { param: 'Test1' },
            });
        });
    }));

});
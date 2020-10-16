import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { waitForAsync, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PartitionedQueryParam, QueryParam, QueryParamBuilder, QueryParamGroup, QueryParamModule } from '../public_api';
import { captureObservable, scheduler, setupNavigationWarnStub } from './util';

@Component({
    template: `
        <div [queryParamGroup]="paramGroup">
            <input type="text" queryParamName="partitioned" />
        </div>
    `,
})
class SimplePartitionedParamTestComponent {

    public paramGroup: QueryParamGroup;

    constructor(private qpb: QueryParamBuilder) {
        this.paramGroup = qpb.group({
            partitioned: qpb.partition([
                qpb.stringParam('p1'),
                qpb.stringParam('p2'),
            ], {
                partition: (v: string): [string, string] => [v[0], v[1]],
                reduce: ([v1, v2]) => v1 + v2,
            }),
        });
    }

}

describe('Partitioned parameters', () => {
    let fixture: ComponentFixture<SimplePartitionedParamTestComponent>;
    let component: SimplePartitionedParamTestComponent;
    let input: HTMLInputElement;
    let partitionedParam: PartitionedQueryParam<string, [string, string]>;
    let router: Router;

    beforeEach(() => setupNavigationWarnStub());

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                SimplePartitionedParamTestComponent,
            ],
        });

        router = TestBed.inject(Router);
        TestBed.compileComponents();
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimplePartitionedParamTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        input = (fixture.nativeElement as HTMLElement).querySelector('input') as HTMLInputElement;
        partitionedParam = component.paramGroup.get('partitioned') as PartitionedQueryParam<string, [string, string]>;
        fixture.detectChanges();
    });

    it('synchronizes a form control value change to the URL', fakeAsync(() => {
        input.value = 'ab';
        input.dispatchEvent(new Event('input'));
        tick();

        expect(router.url).toBe('/?p1=a&p2=b');
    }));

    it('synchronizes a URL change to the form control', fakeAsync(() => {
        router.navigateByUrl('/?p1=a&p2=b');
        tick();

        expect(input.value).toBe('ab');
    }));

    it('synchronizes a programmatic change of the param to the URL', fakeAsync(() => {
        partitionedParam.setValue('ab');
        tick();

        expect(router.url).toBe('/?p1=a&p2=b');
    }));

    it('synchronizes a programmatic change of the group to the URL', fakeAsync(() => {
        component.paramGroup.setValue({ partitioned: 'ab' });
        tick();

        expect(router.url).toBe('/?p1=a&p2=b');
    }));

    it('emits the current value on a URL change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const groupValueChanges$ = captureObservable(component.paramGroup.valueChanges);
            const partitionedValueChanges$ = captureObservable(partitionedParam.valueChanges);
            const param1ValueChanges$ = captureObservable((partitionedParam.queryParams[0] as QueryParam<string>).valueChanges);
            const param2ValueChanges$ = captureObservable((partitionedParam.queryParams[1] as QueryParam<string>).valueChanges);

            router.navigateByUrl('/?p1=a&p2=b');
            tick();

            expectObservable(groupValueChanges$).toBe('a', { a: { partitioned: 'ab' } });
            expectObservable(partitionedValueChanges$).toBe('a', { a: 'ab' });
            expectObservable(param1ValueChanges$).toBe('a', { a: 'a' });
            expectObservable(param2ValueChanges$).toBe('a', { a: 'b' });
        });
    }));

    it('emits the current value on a programmatic change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const groupValueChanges$ = captureObservable(component.paramGroup.valueChanges);
            const partitionedValueChanges$ = captureObservable(partitionedParam.valueChanges);
            const param1ValueChanges$ = captureObservable((partitionedParam.queryParams[0] as QueryParam<string>).valueChanges);
            const param2ValueChanges$ = captureObservable((partitionedParam.queryParams[1] as QueryParam<string>).valueChanges);

            component.paramGroup.setValue({ partitioned: 'ab' });
            tick();

            expectObservable(groupValueChanges$).toBe('a', { a: { partitioned: 'ab' } });
            expectObservable(partitionedValueChanges$).toBe('a', { a: 'ab' });
            expectObservable(param1ValueChanges$).toBe('a', { a: 'a' });
            expectObservable(param2ValueChanges$).toBe('a', { a: 'b' });
        });
    }));

    it('does not emit the current value on a programmatic change if instructed not to', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const groupValueChanges$ = captureObservable(component.paramGroup.valueChanges);
            const partitionedValueChanges$ = captureObservable(partitionedParam.valueChanges);
            const param1ValueChanges$ = captureObservable((partitionedParam.queryParams[0] as QueryParam<string>).valueChanges);
            const param2ValueChanges$ = captureObservable((partitionedParam.queryParams[1] as QueryParam<string>).valueChanges);

            component.paramGroup.setValue({ partitioned: 'ab' }, { emitEvent: false });
            tick();

            expectObservable(groupValueChanges$).toBe('');
            expectObservable(partitionedValueChanges$).toBe('');
            expectObservable(param1ValueChanges$).toBe('');
            expectObservable(param2ValueChanges$).toBe('');
        });
    }));

    it('does not emit if unrelated URL parameters change', fakeAsync(() => {
        scheduler.run(({ expectObservable }) => {
            const value$ = captureObservable(component.paramGroup.valueChanges);

            router.navigateByUrl(`/?unrelated=42`);
            tick();

            expectObservable(value$).toBe('');
        });
    }));
});
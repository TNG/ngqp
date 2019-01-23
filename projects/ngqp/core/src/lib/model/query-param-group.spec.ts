import { fakeAsync } from '@angular/core/testing';
import { QueryParamGroup } from './query-param-group';
import { QueryParam } from './query-param';
import { DEFAULT_STRING_DESERIALIZER, DEFAULT_STRING_SERIALIZER } from '../serializers';
import { captureObservable, scheduler } from '../../test/util';

describe(QueryParamGroup.name, () => {
    let stringParam: QueryParam<string>;

    beforeEach(() => {
        stringParam = new QueryParam('q', {
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
        });
    });

    it('installs itself as the parent on its children', () => {
        spyOn(stringParam, '_setParent');
        const group = new QueryParamGroup({ q: stringParam });

        expect(stringParam._setParent).toHaveBeenCalledWith(group);
    });

    describe('get', () => {
        it('returns the QueryParam instance if found', () => {
            const group = new QueryParamGroup({ q: stringParam });
            expect(group.get('q')).toBe(stringParam);
        });

        it('returns null if the QueryParam instance is not found', () => {
            const group = new QueryParamGroup({ q: stringParam });
            expect(group.get('foo')).toBeNull();
        });
    });

    describe('value', () => {
        it('returns the current group value', () => {
            const group = new QueryParamGroup({ q: stringParam });
            stringParam.value = 'Test';

            expect(group.value).toEqual({ q: 'Test' });
        });
    });

    describe('patchValue', () => {
        let group: QueryParamGroup;
        let queryParam: QueryParam<string>;
        beforeEach(() => group = new QueryParamGroup({ q: stringParam }));
        beforeEach(() => queryParam = group.get('q'));

        it('updates the parameter value', () => {
            group.patchValue({ q: 'Test' });
            expect(stringParam.value).toBe('Test');
        });

        it('does not throw if a parameter is not included', () => {
            expect(() => group.patchValue({})).not.toThrow();
        });

        it('does not change a parameter which is not included', () => {
            stringParam.value = 'Test';
            group.patchValue({});
            expect(stringParam.value).toBe('Test');
        });

        it('ignores non-existing parameters', () => {
            expect(() => group.patchValue({ foo: 42 })).not.toThrow();
        });

        it('informs listener about a change', () => {
            const spy = jasmine.createSpy('fn');
            group._registerOnChange(spy);

            const value = { q: 'Test' };
            group.patchValue(value);
            expect(spy).toHaveBeenCalledWith(value);
        });

        it('does not inform listeners if instructed not to', () => {
            const spy = jasmine.createSpy('fn');
            group._registerOnChange(spy);

            group.patchValue({ q: 'Test' }, { emitModelToViewChange: false });
            expect(spy).not.toHaveBeenCalled();
        });

        it('emits the current value', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                const value = { q: 'Test' };
                group.patchValue(value);

                expectObservable(groupValueChanges$).toBe('a', { a: value });
                expectObservable(paramValueChanges$).toBe('a', { a: value.q });
            });
        }));

        it('does not emit the current value if instructed not to', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                group.patchValue({ q: 'Test' }, { emitEvent: false });

                expectObservable(groupValueChanges$).toBe('');
                expectObservable(paramValueChanges$).toBe('');
            });
        }));
    });

    describe('setValue', () => {
        let group: QueryParamGroup;
        let queryParam: QueryParam<string>;
        beforeEach(() => group = new QueryParamGroup({ q: stringParam }));
        beforeEach(() => queryParam = group.get('q'));

        it('updates the parameter value', () => {
            group.setValue({ q: 'Test' });
            expect(stringParam.value).toBe('Test');
        });

        it('updates the parameter value to null if it is not provided', () => {
            stringParam.value = 'Test';
            group.setValue({});
            expect(stringParam.value).toBeNull();
        });

        it('ignores non-existing parameters', () => {
            expect(() => group.setValue({ foo: 42 })).not.toThrow();
        });

        it('informs listener about a change', () => {
            const spy = jasmine.createSpy('fn');
            group._registerOnChange(spy);

            const value = { q: 'Test' };
            group.setValue(value);
            expect(spy).toHaveBeenCalledWith(value);
        });

        it('does not inform listeners if instructed not to', () => {
            const spy = jasmine.createSpy('fn');
            group._registerOnChange(spy);

            group.setValue({ q: 'Test' }, { emitModelToViewChange: false });
            expect(spy).not.toHaveBeenCalled();
        });

        it('emits the current value', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                const value = { q: 'Test' };
                group.setValue(value);

                expectObservable(groupValueChanges$).toBe('a', { a: value });
                expectObservable(paramValueChanges$).toBe('a', { a: value.q });
            });
        }));

        it('does not emit the current value if instructed not to', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                group.setValue({ q: 'Test' }, { emitEvent: false });

                expectObservable(groupValueChanges$).toBe('');
                expectObservable(paramValueChanges$).toBe('');
            });
        }));
    });

    describe('param#setValue', () => {
        let group: QueryParamGroup;
        let queryParam: QueryParam<string>;
        beforeEach(() => group = new QueryParamGroup({ q: stringParam }));
        beforeEach(() => queryParam = group.get('q'));

        it('emits the current value', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                queryParam.setValue('Test');

                expectObservable(groupValueChanges$).toBe('a', { a: { q: 'Test' } });
                expectObservable(paramValueChanges$).toBe('a', { a: 'Test' });
            });
        }));

        it('does not emit the current value if instructed not to', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const groupValueChanges$ = captureObservable(group.valueChanges);
                const paramValueChanges$ = captureObservable(queryParam.valueChanges);

                queryParam.setValue('Test', { emitEvent: false });

                expectObservable(groupValueChanges$).toBe('');
                expectObservable(paramValueChanges$).toBe('');
            });
        }));
    });
});
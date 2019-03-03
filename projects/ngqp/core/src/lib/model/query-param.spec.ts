import { fakeAsync } from '@angular/core/testing';
import { QueryParam, MultiQueryParam } from './query-param';
import { QueryParamOpts } from './query-param-opts';
import { LOOSE_IDENTITY_COMPARATOR } from '../util';
import { DEFAULT_STRING_DESERIALIZER, DEFAULT_STRING_SERIALIZER } from '../serializers';
import { QueryParamGroup } from './query-param-group';
import { captureObservable, scheduler } from '../../test/util';

describe('QueryParam', () => {
    describe('constructor', () => {
        const opts: Required<QueryParamOpts<any, any>> = {
            serialize: (value: any) => '',
            deserialize: (value: string) => value,
            multi: false,
            debounceTime: undefined,
            emptyOn: undefined,
            compareWith: undefined,
            combineWith: undefined,
        };

        it('throws an error if no parameter is provided', () => {
            expect(() => new QueryParam(null, {
                ...opts
            })).toThrowError('Please provide a URL parameter name for each query parameter.');
        });

        it('throws an error if no serializer is provided', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                serialize: undefined,
            })).toThrowError('serialize must be a function, but received undefined');
        });

        it('throws an error if no deserializer is provided', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                deserialize: undefined,
            })).toThrowError('deserialize must be a function, but received undefined');
        });

        it('does not require compareWith if no emptyOn is provided', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                compareWith: undefined,
            })).not.toThrow();
        });

        it('throws an error if emptyOn, but no compareWith is provided', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                emptyOn: 42,
                compareWith: undefined,
            })).toThrowError('compareWith must be a function, but received undefined');
        });

        it('does not require combineWith', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                combineWith: undefined,
            })).not.toThrow();
        });

        it('throws an error if combineWith is not a function', () => {
            expect(() => new QueryParam('q', {
                ...opts,
                combineWith: 42 as any,
            })).toThrowError('combineWith must be a function, but received 42');
        });
    });

    describe('setValue', () => {
        let queryParam: QueryParam<string>;

        beforeEach(() => {
            queryParam = new QueryParam<string>('q', {
                serialize: DEFAULT_STRING_SERIALIZER,
                deserialize: DEFAULT_STRING_DESERIALIZER,
            });
        });

        it('updates the value immediately', () => {
            queryParam.setValue('Test');
            expect(queryParam.value).toBe('Test');
        });

        it('forwards the value change to registered listeners', () => {
            const spy = jasmine.createSpy('fn');
            queryParam._registerOnChange(spy);

            queryParam.setValue('Test');
            expect(spy).toHaveBeenCalledWith('Test');
        });

        it('does not forward the value change if instructed not to', () => {
            const spy = jasmine.createSpy('fn');
            queryParam._registerOnChange(spy);

            queryParam.setValue('Test',  { emitModelToViewChange: false });
            expect(spy).not.toHaveBeenCalled();
        });

        it('emits the current value', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const valueChanges$ = captureObservable(queryParam.valueChanges);

                queryParam.setValue('Test');
                expectObservable(valueChanges$).toBe('a', { a: 'Test' });
            });
        }));

        it('does not emit if instructed not to', fakeAsync(() => {
            scheduler.run(({ expectObservable }) => {
                const valueChanges$ = captureObservable(queryParam.valueChanges);

                queryParam.setValue('Test', { emitEvent: false });
                expectObservable(valueChanges$).toBe('');
            });
        }));

        it('notifies the parent', fakeAsync(() => {
            const parent: Partial<QueryParamGroup> = {
                _updateValue: jasmine.createSpy('fn'),
            };

            queryParam._setParent(parent as QueryParamGroup);
            queryParam.setValue('Test');

            expect(parent._updateValue).toHaveBeenCalled();
        }));

        it('does not notify the parent if instructed not to', fakeAsync(() => {
            const parent: Partial<QueryParamGroup> = {
                _updateValue: jasmine.createSpy('fn'),
            };

            queryParam._setParent(parent as QueryParamGroup);
            queryParam.setValue('Test', { onlySelf: true });

            expect(parent._updateValue).not.toHaveBeenCalled();
        }));
    });
});
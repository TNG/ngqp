import { QueryParam } from './query-param';
import { QueryParamOpts } from './query-param-opts';
import { LOOSE_IDENTITY_COMPARATOR } from '../util';
import { DEFAULT_STRING_DESERIALIZER, DEFAULT_STRING_SERIALIZER } from '../serializers';
import { fakeAsync } from '@angular/core/testing';
import { take } from 'rxjs/operators';

describe(QueryParam.name, () => {
    describe('constructor', () => {
        const opts: Required<QueryParamOpts<any>> = {
            param: 'q',
            serialize: (value: any) => '',
            deserialize: (value: string) => value,
            multi: false,
            debounceTime: undefined,
            emptyOn: undefined,
            compareWith: undefined,
            combineWith: undefined,
        };

        it('throws an error if no parameter is provided', () => {
            expect(() => new QueryParam({
                ...opts,
                param: undefined,
            })).toThrowError('Please provide a parameter name for each query parameter.');
        });

        it('throws an error if no serializer is provided', () => {
            expect(() => new QueryParam({
                ...opts,
                serialize: undefined,
            })).toThrowError('serialize must be a function, but received undefined');
        });

        it('throws an error if no deserializer is provided', () => {
            expect(() => new QueryParam({
                ...opts,
                deserialize: undefined,
            })).toThrowError('deserialize must be a function, but received undefined');
        });

        it('does not require compareWith if no emptyOn is provided', () => {
            expect(() => new QueryParam({
                ...opts,
                compareWith: undefined,
            })).not.toThrow();
        });

        it('throws an error if emptyOn, but no compareWith is provided', () => {
            expect(() => new QueryParam({
                ...opts,
                emptyOn: 42,
                compareWith: undefined,
            })).toThrowError('compareWith must be a function, but received undefined');
        });

        it('throws an error if emptyOn is provided together with multi', () => {
            expect(() => new QueryParam({
                ...opts,
                multi: true,
                emptyOn: 42,
                compareWith: LOOSE_IDENTITY_COMPARATOR,
            })).toThrowError('emptyOn is only supported for single-value parameters, but q is a multi-value parameter.');
        });

        it('does not require combineWith', () => {
            expect(() => new QueryParam({
                ...opts,
                combineWith: undefined,
            })).not.toThrow();
        });

        it('throws an error if combineWith is not a function', () => {
            expect(() => new QueryParam({
                ...opts,
                combineWith: 42 as any,
            })).toThrowError('combineWith must be a function, but received 42');
        });
    });

    describe('setValue', () => {
        let queryParam: QueryParam<string>;

        beforeEach(() => {
            queryParam = new QueryParam<string>({
                param: 'q',
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

            queryParam.setValue('Test',  { emitEvent: false });
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe('updateValue', () => {
        let queryParam: QueryParam<string>;

        beforeEach(() => {
            queryParam = new QueryParam<string>({
                param: 'q',
                serialize: DEFAULT_STRING_SERIALIZER,
                deserialize: DEFAULT_STRING_DESERIALIZER,
            });
        });

        it('emits the current value', fakeAsync(() => {
            queryParam.value = 'Test';
            queryParam.valueChanges.pipe(take(1)).subscribe({
                next: value => expect(value).toBe('Test'),
                error: () => fail('Expected emission'),
            });

            queryParam._updateValue();
        }));

        it('does not emit if instructed not to', fakeAsync(() => {
            queryParam.value = 'Test';
            queryParam.valueChanges.pipe(take(1)).subscribe({
                next: value => fail(`Expected no emission, but received ${value}`),
                error: () => fail('Expected no error'),
            });

            queryParam._updateValue({ emitEvent: false });
        }));

        it('notifies the parent', fakeAsync(() => {
            const parent = {
                _updateValue: jasmine.createSpy('fn'),
            };

            queryParam._setParent(parent as any);
            queryParam.value = 'Test';
            queryParam._updateValue();

            expect(parent._updateValue).toHaveBeenCalled();
        }));

        it('does not notify the parent if instructed not to', fakeAsync(() => {
            const parent = {
                _updateValue: jasmine.createSpy('fn'),
            };

            queryParam._setParent(parent as any);
            queryParam.value = 'Test';
            queryParam._updateValue({ onlySelf: true });

            expect(parent._updateValue).not.toHaveBeenCalled();
        }));
    });
});
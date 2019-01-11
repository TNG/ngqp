import { QueryParam } from './query-param';
import { QueryParamOpts } from './query-param-opts';
import { LOOSE_IDENTITY_COMPARATOR } from '../util';

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

describe(QueryParam.name, () => {
    describe('constructor', () => {
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
});
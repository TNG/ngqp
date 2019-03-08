import { QueryParamBuilder } from './query-param-builder.service';
import { QueryParamGroup } from './model/query-param-group';
import { MultiQueryParam, QueryParam } from './model/query-param';

interface Item {
    name: string;
}

describe(QueryParamBuilder.name, () => {
    let qpb: QueryParamBuilder;
    beforeEach(() => qpb = new QueryParamBuilder());

    describe('group', () => {
        it('can create a QueryParamGroup', () => {
            const group: QueryParamGroup = qpb.group({
                q: qpb.stringParam('q'),
            });

            expect(group).toBeTruthy();
        });
    });

    describe('stringParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<string> = qpb.stringParam('q');
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: MultiQueryParam<string> = qpb.stringParam('q', { multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('numberParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<number> = qpb.numberParam('q');
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: MultiQueryParam<number> = qpb.numberParam('q', { multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('booleanParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<boolean> = qpb.booleanParam('q');
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: MultiQueryParam<boolean> = qpb.booleanParam('q', { multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('param', () => {
        it('can create a parameter', () => {
            const param: QueryParam<Item> = qpb.param<Item>('q', {
                serialize: () => '',
                deserialize: () => undefined,
            });
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: MultiQueryParam<Item> = qpb.param<Item>('q', {
                multi: true,
                serialize: () => '',
                deserialize: () => undefined,
            });
            expect(param).toBeTruthy();
        });
    });
});
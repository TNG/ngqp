import { QueryParamBuilder } from './query-param-builder.service';
import { QueryParamGroup } from './model/query-param-group';
import { QueryParam } from './model/query-param';

interface Item {
    name: string;
}

describe(QueryParamBuilder.name, () => {
    let qpb: QueryParamBuilder;
    beforeEach(() => qpb = new QueryParamBuilder());

    describe('group', () => {
        it('can create a QueryParamGroup', () => {
            const group: QueryParamGroup = qpb.group({
                q: qpb.stringParam({ param: 'q' }),
            });

            expect(group).toBeTruthy();
        });
    });

    describe('stringParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<string> = qpb.stringParam({ param: 'q' });
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: QueryParam<string[]> = qpb.stringParam({ param: 'q', multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('numericParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<number> = qpb.numericParam({ param: 'q' });
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: QueryParam<number[]> = qpb.numericParam({ param: 'q', multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('booleanParam', () => {
        it('can create a parameter', () => {
            const param: QueryParam<boolean> = qpb.booleanParam({ param: 'q' });
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: QueryParam<boolean[]> = qpb.booleanParam({ param: 'q', multi: true });
            expect(param).toBeTruthy();
        });
    });

    describe('param', () => {
        it('can create a parameter', () => {
            const param: QueryParam<Item> = qpb.param<Item>({
                param: 'q',
                serialize: () => '',
                deserialize: () => undefined,
            });
            expect(param).toBeTruthy();
        });

        it('can create a multi parameter', () => {
            const param: QueryParam<Item[]> = qpb.param<Item>({
                param: 'q',
                multi: true,
                serialize: () => '',
                deserialize: () => undefined,
            });
            expect(param).toBeTruthy();
        });
    });
});
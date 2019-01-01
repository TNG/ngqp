import { Injectable } from '@angular/core';
import { QueryParam, QueryParamOpts, QueryParamGroup } from './model';
import {
    DEFAULT_BOOLEAN_DESERIALIZER,
    DEFAULT_BOOLEAN_SERIALIZER,
    DEFAULT_NUMBER_DESERIALIZER,
    DEFAULT_NUMBER_SERIALIZER,
    DEFAULT_STRING_DESERIALIZER,
    DEFAULT_STRING_SERIALIZER
} from './serializers';
import { LOOSE_IDENTITY_COMPARATOR } from './util';
import { RouterAdapterOptions } from './router-adapter/router-adapter.interface';

type OverwritePartial<T1, T2 extends keyof T1> = Pick<T1, Exclude<keyof T1, T2>> & Partial<Pick<T1, T2>>;
export type QueryParamOptsInput<T> = OverwritePartial<QueryParamOpts<T>, 'serialize' | 'deserialize' | 'compareWith'>;

/**
 * TODO Documentation
 */
@Injectable({
    providedIn: 'root'
})
export class QueryParamBuilder {

    /**
     * TODO Documentation
     */
    public group(
        queryParams: { [ name: string ]: QueryParam<any> | string },
        extras: RouterAdapterOptions = {}
    ): QueryParamGroup {
        const mappedQueryParams: { [ queryParamName: string ]: QueryParam<any> } = {};
        Object.keys(queryParams).forEach(queryParamName => {
            mappedQueryParams[ queryParamName ] = this.createQueryParam(queryParams[ queryParamName ]);
        });

        // TODO Maybe we should first validate that no two queryParams defined the same "param".
        return new QueryParamGroup(mappedQueryParams, extras);
    }

    /**
     * TODO Documentation
     */
    public stringParam(opts: QueryParamOptsInput<string[]> & { multi: true }): QueryParam<string[]>;
    public stringParam(opts: QueryParamOptsInput<string>): QueryParam<string>;
    public stringParam(opts: QueryParamOptsInput<string | string[]>): QueryParam<string | string[]> {
        return new QueryParam({
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public numericParam(opts: QueryParamOptsInput<number[]> & { multi: true }): QueryParam<number[]>;
    public numericParam(opts: QueryParamOptsInput<number>): QueryParam<number>;
    public numericParam(opts: QueryParamOptsInput<number | number[]>): QueryParam<number | number[]> {
        return new QueryParam({
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public booleanParam(opts: QueryParamOptsInput<boolean[]> & { multi: true }): QueryParam<boolean[]>;
    public booleanParam(opts: QueryParamOptsInput<boolean>): QueryParam<boolean>;
    public booleanParam(opts: QueryParamOptsInput<boolean | boolean[]>): QueryParam<boolean | boolean[]> {
        return new QueryParam({
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public param<T>(opts: QueryParamOpts<T[]> & { multi: true }): QueryParam<T[]>;
    public param<T>(opts: QueryParamOpts<T>): QueryParam<T>;
    public param<T>(opts: QueryParamOpts<T | T[]>): QueryParam<T | T[]> {
        return new QueryParam(opts);
    }

    private createQueryParam<T>(queryParam: QueryParam<T> | string): QueryParam<T | string> {
        if (queryParam instanceof QueryParam) {
            return queryParam;
        }

        return this.stringParam({
            param: queryParam,
        });
    }

}

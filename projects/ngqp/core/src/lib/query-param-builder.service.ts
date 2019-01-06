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

/** See {@link QueryParamOpts}. */
export interface QueryParamOptsInput<T> extends OverwritePartial<QueryParamOpts<T>, 'serialize' | 'deserialize' | 'compareWith'> {
}

/**
 * Service to create parameters and groups.
 *
 * This service provides a simple API to create {@link QueryParamGroup} and {@link QueryParam}
 * instances and is the recommended way to set them up.
 */
@Injectable({
    providedIn: 'root'
})
export class QueryParamBuilder {

    /**
     * Creates a new {@link QueryParamGroup}.
     *
     * This is the primary method to create a new group of parameters. Pass a list of
     * {@link QueryParam} instances by using the `xxxParam` methods.
     *
     * @param queryParams List of {@link QueryParam}s keyed by a unique name.
     * @param extras Additional parameters for this group, overriding global configuration.
     * @returns The new {@link QueryParamGroup}.
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

    /** @ignore */
    public stringParam(opts: QueryParamOptsInput<string[]> & { multi: true }): QueryParam<string[]>;
    /** @ignore */
    public stringParam(opts: QueryParamOptsInput<string>): QueryParam<string>;
    /**
     * Create a new parameter of type `string`.
     *
     * See {@link QueryParamOptsInput}.
     */
    public stringParam(opts: QueryParamOptsInput<string | string[]>): QueryParam<string | string[]> {
        return new QueryParam({
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /** @ignore */
    public numericParam(opts: QueryParamOptsInput<number[]> & { multi: true }): QueryParam<number[]>;
    /** @ignore */
    public numericParam(opts: QueryParamOptsInput<number>): QueryParam<number>;
    /**
     * Create a new parameter of type `number`.
     *
     * See {@link QueryParamOptsInput}.
     */
    public numericParam(opts: QueryParamOptsInput<number | number[]>): QueryParam<number | number[]> {
        return new QueryParam({
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /** @ignore */
    public booleanParam(opts: QueryParamOptsInput<boolean[]> & { multi: true }): QueryParam<boolean[]>;
    /** @ignore */
    public booleanParam(opts: QueryParamOptsInput<boolean>): QueryParam<boolean>;
    /**
     * Create a new parameter of type `boolean`.
     *
     * See {@link QueryParamOptsInput}.
     */
    public booleanParam(opts: QueryParamOptsInput<boolean | boolean[]>): QueryParam<boolean | boolean[]> {
        return new QueryParam({
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /** @ignore */
    public param<T>(opts: QueryParamOpts<T[]> & { multi: true }): QueryParam<T[]>;
    /** @ignore */
    public param<T>(opts: QueryParamOpts<T>): QueryParam<T>;
    /**
     * Create a new parameter for a complex type.
     *
     * See {@link QueryParamOptsInput}.
     */
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

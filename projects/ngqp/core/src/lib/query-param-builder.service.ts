import { Injectable } from '@angular/core';
import {
    DEFAULT_BOOLEAN_DESERIALIZER,
    DEFAULT_BOOLEAN_SERIALIZER,
    DEFAULT_NUMBER_DESERIALIZER,
    DEFAULT_NUMBER_SERIALIZER,
    DEFAULT_STRING_DESERIALIZER,
    DEFAULT_STRING_SERIALIZER
} from './serializers';
import { LOOSE_IDENTITY_COMPARATOR } from './util';
import { RouterOptions } from './router-adapter/router-adapter.interface';
import { QueryParam } from './model/query-param';
import { QueryParamGroup } from './model/query-param-group';
import { QueryParamOpts } from './model/query-param-opts';

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
        queryParams: { [ name: string ]: QueryParam<any> },
        extras: RouterOptions = {}
    ): QueryParamGroup {
        // TODO Maybe we should first validate that no two queryParams defined the same "param".
        return new QueryParamGroup(queryParams, extras);
    }

    /** @ignore */
    public stringParam(urlParam: string, opts: QueryParamOpts<string[]> & { multi: true }): QueryParam<string[]>;
    /** @ignore */
    public stringParam(urlParam: string, opts?: QueryParamOpts<string>): QueryParam<string>;
    /**
     * Create a new parameter of type `string`.
     *
     * See {@link QueryParamOpts}.
     */
    public stringParam(
        urlParam: string,
        opts: QueryParamOpts<string> | QueryParamOpts<string[]> = {}
    ): QueryParam<string> | QueryParam<string[]> {
        return new QueryParam<any>(urlParam, {
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        } as QueryParamOpts<any>);
    }

    /** @ignore */
    public numberParam(urlParam: string, opts: QueryParamOpts<number[]> & { multi: true }): QueryParam<number[]>;
    /** @ignore */
    public numberParam(urlParam: string, opts?: QueryParamOpts<number>): QueryParam<number>;
    /**
     * Create a new parameter of type `number`.
     *
     * See {@link QueryParamOpts}.
     */
    public numberParam(
        urlParam: string,
        opts: QueryParamOpts<number> | QueryParamOpts<number[]> = {}
    ): QueryParam<number> | QueryParam<number[]> {
        return new QueryParam<any>(urlParam, {
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        } as QueryParamOpts<any>);
    }

    /** @ignore */
    public booleanParam(urlParam: string, opts: QueryParamOpts<boolean[]> & { multi: true }): QueryParam<boolean[]>;
    /** @ignore */
    public booleanParam(urlParam: string, opts?: QueryParamOpts<boolean>): QueryParam<boolean>;
    /**
     * Create a new parameter of type `boolean`.
     *
     * See {@link QueryParamOpts}.
     */
    public booleanParam(
        urlParam: string,
        opts: QueryParamOpts<boolean> | QueryParamOpts<boolean[]> = {}
    ): QueryParam<boolean> | QueryParam<boolean[]> {
        return new QueryParam<any>(urlParam, {
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        } as QueryParamOpts<any>);
    }

    /** @ignore */
    public param<T>(urlParam: string, opts: QueryParamOpts<T[]> & { multi: true }): QueryParam<T[]>;
    /** @ignore */
    public param<T>(urlParam: string, opts?: QueryParamOpts<T>): QueryParam<T>;
    /**
     * Create a new parameter for a complex type.
     *
     * See {@link QueryParamOpts}.
     */
    public param<T>(
        urlParam: string,
        opts: QueryParamOpts<T> | QueryParamOpts<T[]> = {}
    ): QueryParam<T> | QueryParam<T[]> {
        return new QueryParam<any>(urlParam, {
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        } as QueryParamOpts<any>);
    }

}

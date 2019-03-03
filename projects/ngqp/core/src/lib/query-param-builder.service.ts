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
import { MultiQueryParam, QueryParam } from './model/query-param';
import { QueryParamGroup } from './model/query-param-group';
import { MultiQueryParamOpts, QueryParamOpts } from './model/query-param-opts';

function isMultiOpts<T>(opts: QueryParamOpts<T> | MultiQueryParamOpts<T>): opts is MultiQueryParamOpts<T> {
    return opts.multi === true;
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
        queryParams: { [ name: string ]: QueryParam<unknown> | MultiQueryParam<unknown> },
        extras: RouterOptions = {}
    ): QueryParamGroup {
        // TODO Maybe we should first validate that no two queryParams defined the same "param".
        return new QueryParamGroup(queryParams, extras);
    }

    /** @ignore */
    public stringParam(urlParam: string, opts: MultiQueryParamOpts<string>): MultiQueryParam<string>;
    /** @ignore */
    public stringParam(urlParam: string, opts?: QueryParamOpts<string>): QueryParam<string>;
    /**
     * Create a new parameter of type `string`.
     *
     * See {@link QueryParamOpts}.
     */
    public stringParam(
        urlParam: string,
        opts: QueryParamOpts<string> | MultiQueryParamOpts<string> = {}
    ): QueryParam<string> | MultiQueryParam<string> {
        opts = {
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        };

        if (isMultiOpts(opts)) {
            return new MultiQueryParam<string>(urlParam, opts);
        } else {
            return new QueryParam<string>(urlParam, opts);
        }
    }

    /** @ignore */
    public numberParam(urlParam: string, opts: MultiQueryParamOpts<number>): MultiQueryParam<number>;
    /** @ignore */
    public numberParam(urlParam: string, opts?: QueryParamOpts<number>): QueryParam<number>;
    /**
     * Create a new parameter of type `number`.
     *
     * See {@link QueryParamOpts}.
     */
    public numberParam(
        urlParam: string,
        opts: QueryParamOpts<number> | MultiQueryParamOpts<number> = {}
    ): QueryParam<number> | MultiQueryParam<number> {
        opts = {
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        };

        if (isMultiOpts(opts)) {
            return new MultiQueryParam<number>(urlParam, opts);
        } else {
            return new QueryParam<number>(urlParam, opts);
        }
    }

    /** @ignore */
    public booleanParam(urlParam: string, opts: MultiQueryParamOpts<boolean>): MultiQueryParam<boolean>;
    /** @ignore */
    public booleanParam(urlParam: string, opts?: QueryParamOpts<boolean>): QueryParam<boolean>;
    /**
     * Create a new parameter of type `boolean`.
     *
     * See {@link QueryParamOpts}.
     */
    public booleanParam(
        urlParam: string,
        opts: QueryParamOpts<boolean> | MultiQueryParamOpts<boolean> = {}
    ): QueryParam<boolean> | MultiQueryParam<boolean> {
        opts = {
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        };

        if (isMultiOpts(opts)) {
            return new MultiQueryParam<boolean>(urlParam, opts);
        } else {
            return new QueryParam<boolean>(urlParam, opts);
        }
    }

    /** @ignore */
    public param<T>(urlParam: string, opts: MultiQueryParamOpts<T>): MultiQueryParam<T>;
    /** @ignore */
    public param<T>(urlParam: string, opts?: QueryParamOpts<T>): QueryParam<T>;
    /**
     * Create a new parameter for a complex type.
     *
     * See {@link QueryParamOpts}.
     */
    public param<T>(
        urlParam: string,
        opts: QueryParamOpts<T> | MultiQueryParamOpts<T> = {}
    ): QueryParam<T> | MultiQueryParam<T> {
        opts = {
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        };

        if (isMultiOpts(opts)) {
            return new MultiQueryParam<T>(urlParam, opts);
        } else {
            return new QueryParam<T>(urlParam, opts);
        }
    }

}
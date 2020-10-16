import { Comparator, Reducer, Partitioner, ParamCombinator, ParamDeserializer, ParamSerializer } from '../types';

/**
 * List of options which can be passed to {@link QueryParam}.
 */
export interface QueryParamOptsBase<U, T> {

    /**
     * The serializer used for this parameter.
     *
     * See {@link ParamSerializer}.
     */
    serialize?: ParamSerializer<U>;

    /**
     * The deserializer used for this parameter.
     *
     * See {@link ParamDeserializer}.
     */
    deserialize?: ParamDeserializer<U>;

    /**
     * Defines, in milliseconds, how much changes to the value should be debounced.
     *
     * When set, a change of the parameter value coming from either the form control
     * or a programmatic change will be debounced by the given value (in milliseconds).
     * This is useful for, e.g., text inputs.
     *
     * If the value changes through a change of the URL, this debounce will not apply.
     */
    debounceTime?: number | null;

    /**
     * Default value of the parameter.
     *
     * If set, the parameter will be considered to default to this value. This means
     * that if the parameter is not defined on the URL, this value will be written
     * to the form control. Vice versa, if the form control takes on this value,
     * the URL parameter will be removed.
     */
    emptyOn?: T | null;

    /**
     * The comparator to be used with {@link QueryParamOpts#emptyOn}.
     *
     * This function will be used to determine whether the current value equals the defined
     * default value. By default, a loose equals comparison is made (i.e., "==").
     *
     * See {@link Comparator}.
     */
    compareWith?: Comparator<T | null>;

    /**
     * Execute a side effect on other query parameters.
     *
     * If the value of this parameter changes, this function is invoked. It can return an
     * additional set of query parameters to change, e.g., to reset the current page in a
     * pagination when the direction in which to sort has been changed.
     *
     * NOTE: This function must return the raw query parameter names and values. No
     *       (de-)serializers are run and no recursion is applied.
     */
    combineWith?: ParamCombinator<T>;
}

/** See {@link QueryParamOpts}. */
export interface QueryParamOpts<T> extends QueryParamOptsBase<T | null, T | null> {
    /** See {@link MultiQueryParamOpts}. */
    multi?: false;
}

/** See {@link QueryParamOpts}. */
export interface MultiQueryParamOpts<T> extends QueryParamOptsBase<T | null, (T | null)[]> {
    /**
     * Whether this parameter can take on multiple values at once.
     *
     * If set to true, this parameter is array-typed. How this is represented
     * on the URL is defined by the Angular Router, which defines the parameter
     * multiple times, e.g. `https://www.app.io?param=A&param=B&param=C`.
     */
    multi: true;
}

/**
 * Options when creating a partitioned query parameter.
 */
export interface PartitionedQueryParamOpts<T, R extends unknown[]> {
    /**
     * Partitioner function to split a value into its parts.
     *
     * The individual parts are used as the value passed to the {@link QueryParam}
     * instances into which the parameter is partitioned.
     */
    partition: Partitioner<T, R>;

    /**
     * Reducer function to combine parts back to a value.
     *
     */
    reduce: Reducer<R, T>;
}
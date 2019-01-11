import { Comparator, ParamCombinator, ParamDeserializer, ParamSerializer, Unpack } from '../types';

/**
 * List of options which can be passed to {@link QueryParam}.
 */
export interface QueryParamOpts<T> {
    /**
     * The name of the parameter to be used in the URL.
     *
     * This represents the name of the query parameter which will be
     * used in the URL (e.g., `?q=`), which differs from the name of
     * the {@link QueryParam} model used inside {@link QueryParamGroup}.
     */
    param: string;

    /**
     * The serializer used for this parameter.
     *
     * See {@link ParamSerializer}.
     */
    serialize?: ParamSerializer<Unpack<T>>;

    /**
     * The deserializer used for this parameter.
     *
     * See {@link ParamDeserializer}.
     */
    deserialize?: ParamDeserializer<Unpack<T>>;

    /**
     * Whether this parameter can take on multiple values at once.
     *
     * If set to true, this parameter is array-typed. How this is represented
     * on the URL is defined by the Angular Router, which defines the parameter
     * multiple times, e.g. `https://www.app.io?param=A&param=B&param=C`.
     */
    multi?: boolean;

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
     *
     * NOTE: This does currently not work in combination with {@link QueryParamOpts#multi}.
     */
    emptyOn?: Unpack<T>;

    /**
     * The comparator to be used with {@link QueryParamOpts#emptyOn}.
     *
     * This function will be used to determine whether the current value equals the defined
     * default value. By default, a loose equals comparison is made (i.e., "==").
     *
     * See {@link Comparator}.
     */
    compareWith?: Comparator<Unpack<T>>;

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
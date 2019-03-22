import { Params } from '@angular/router';

/**
 * A serializer defines how the represented form control's
 * value is converted into a string to be used in the URL.
 */
export type ParamSerializer<T> = (model: T | undefined | null) => string | null;

/**
 * A deserializer defines how a URL parameter is converted
 * into the represented form control's value.
 */
export type ParamDeserializer<T> = (value: string | null) => T | undefined | null;

/**
 * A partitioner can split a value into an array of parts.
 */
export type Partitioner<T, R extends unknown[]> = (value: T) => R;

/**
 * A reducer can combine an array of values into a single value.
 */
export type Reducer<T extends unknown[], R> = (values: T) => R;

/**
 * Defines a function which describes side effects on other
 * URL parameters.
 *
 * See {@link QueryParamOpts#combineWith}.
 */
export type ParamCombinator<T> = (newValue: T | undefined | null) => Params | null;

/** @internal */
export type OnChangeFunction<T> = (value: T | null) => void;

/**
 * A function which compares two values of the same type to determine
 * if they are equal. To support traditional comparator functions, you
 * can also return a number where "0" means equality.
 *
 * @param a First value to compare.
 * @param b Second value to compare.
 * @returns `true` or `0` if and only if `a` and `b` should be considered equal.
 */
export type Comparator<T> = (a: T | undefined | null, b: T | undefined | null) => boolean | number;
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * A serializer defines how the represented form control's
 * value is converted into a string to be used in the URL.
 */
export type ParamSerializer<T> = (model: T | null) => (string | null) | Observable<string | null>;

/**
 * A deserializer defines how a URL parameter is converted
 * into the represented form control's value.
 */
export type ParamDeserializer<T> = (value: string | null) => (T | null) | Observable<T | null>;

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
export type ParamCombinator<T> = (newValue: T | null) => Params | null;

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
export type Comparator<T> = (a: T | null, b: T | null) => boolean | number;
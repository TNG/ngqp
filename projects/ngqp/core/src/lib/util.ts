import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { isObservable, Observable, of } from 'rxjs';
import { Comparator } from './types';

/** @internal */
// tslint:disable-next-line:triple-equals
export const LOOSE_IDENTITY_COMPARATOR = <T>(a: T, b: T) => a == b;

/** @internal */
export const NOP: Function = () => {};

/** @internal */
export function isMissing(obj: any): obj is null | undefined {
    return obj === undefined || obj === null;
}

/** @internal */
export function undefinedToNull<T>(obj: T | undefined): T | null {
    if (obj === undefined) {
        return null;
    }

    return obj;
}

/** @internal */
export function isPresent<T>(obj: T): obj is Exclude<T, null | undefined> {
    return !isMissing(obj);
}

/** @internal */
export function isFunction(obj: any): obj is Function {
    return isPresent(obj) && typeof obj === 'function';
}

/** @internal */
export function wrapTryCatch<T extends Function>(fn: T, msg: string): T {
    return <any>function (this: any) {
        try {
            return fn.apply(this, arguments);
        } catch (err) {
            console.error(msg, err);
            return null;
        }
    };
}

/** @internal */
export function areEqualUsing<T>(first: T | null, second: T | null, comparator: Comparator<T | null>): boolean {
    const comparison = comparator(first, second);
    if (typeof comparison === 'boolean') {
        return comparison;
    }

    return comparison === 0;
}

/** @internal */
export function filterParamMap(paramMap: ParamMap, keys: string[]): ParamMap {
    const params: Params = {};
    keys
        .filter(key => paramMap.keys.includes(key))
        .forEach(key => params[ key ] = paramMap.getAll(key));

    return convertToParamMap(params);
}

/** @internal */
export function compareParamMaps(first: ParamMap, second: ParamMap): boolean {
    if ((first && !second) || (second && !first)) {
        return false;
    }

    if (!compareStringArraysUnordered(first.keys, second.keys)) {
        return false;
    }

    return first.keys.every(key =>
        compareStringArraysUnordered(first.getAll(key), second.getAll(key))
    );
}

/** @internal */
export function compareStringArraysUnordered(first: string[], second: string[]): boolean {
    if (!first && !second) {
        return true;
    }

    if ((first && !second) || (second && !first)) {
        return false;
    }

    if (first.length !== second.length) {
        return false;
    }

    const sortedFirst = first.sort();
    const sortedSecond = second.sort();
    return sortedFirst.every((firstKey, index) => firstKey === sortedSecond[index]);
}

/** @internal */
export function wrapIntoObservable<T>(input: T | Observable<T>): Observable<T> {
    if (isObservable(input)) {
        return input;
    }

    return of(input);
}
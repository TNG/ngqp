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
export function areEqualUsing<T>(first: T, second: T, comparator: Comparator<T>): boolean {
    const comparison = comparator(first, second);
    if (typeof comparison === 'boolean') {
        return comparison;
    }

    return comparison === 0;
}
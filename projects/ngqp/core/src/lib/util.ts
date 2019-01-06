/**
 * A function which compares two values of the same type to determine
 * if they are equal.
 *
 * @param a First value to compare.
 * @param b Second value to compare.
 * @returns `true` if and only if `a` and `b` should be considered equal.
 */
export type Comparator<T> = (a: T, b: T) => boolean;

/** @internal */
// tslint:disable-next-line:triple-equals
export const LOOSE_IDENTITY_COMPARATOR = <T>(a: T, b: T) => a == b;

/** @internal */
export function isMissing(obj: any): obj is null | undefined {
    return obj === undefined || obj === null;
}

/** @internal */
export function isFunction(obj: any): boolean {
    return !isMissing(obj) && typeof obj === 'function';
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
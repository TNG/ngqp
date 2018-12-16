/** TODO Documentation */
export type Comparator<T> = (a: T, b: T) => boolean;

/** TODO Documentation */
// tslint:disable-next-line:triple-equals
export const LOOSE_IDENTITY_COMPARATOR = <T>(a: T, b: T) => a == b;

/**
 * TODO Documentation
 */
export function isMissing(obj: any): obj is null | undefined {
    return obj === undefined || obj === null;
}

/**
 * TODO Documentation
 */
export function isFunction(obj: any): boolean {
    return !isMissing(obj) && typeof obj === 'function';
}

/**
 * TODO Documentation
 */
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
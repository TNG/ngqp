/**
 * TODO Documentation
 */
export function isDefined(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

/**
 * TODO Documentation
 */
export function isOptionalFunction(obj: any): boolean {
    return !isDefined(obj) || typeof obj === 'function';
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
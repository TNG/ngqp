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
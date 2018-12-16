import { isOptionalFunction, wrapTryCatch } from './util';

/** TODO Documentation */
export type ParamSerializer<T> = (model: T | null) => string | null;

/** TODO Documentation */
export type ParamDeserializer<T> = (value: string | null) => T | null;

/**
 * TODO Documentation
 */
export interface QueryParamControlOpts<T> {
    name: string;
    serialize: ParamSerializer<T>;
    deserialize: ParamDeserializer<T>;
    debounceTime?: number | null;
}

/**
 * TODO Documentation
 */
export class QueryParamGroup {

    /** @internal Maps each control name to the corresponding control. */
    public controls: {[controlName: string]: QueryParamControl<any>} = {};

    constructor(controls: {[controlName: string]: QueryParamControl<any>}) {
        this.controls = controls;
    }

}

/**
 * TODO Documentation
 */
export class QueryParamControl<T> {

    /** TODO Documentation */
    public name: string | null = null;

    /** TODO Documentation */
    public serialize: ParamSerializer<T>;

    /** TODO Documentation */
    public deserialize: ParamDeserializer<T>;

    /** TODO Documentation */
    public debounceTime: number | null = null;

    /** TODO Documentation */
    public value: T = null;

    constructor(opts: QueryParamControlOpts<T>) {
        const { name, serialize, deserialize, debounceTime } = opts;

        if (!isOptionalFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isOptionalFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        this.name = name;
        this.serialize = wrapTryCatch(serialize, `Error while serializing value for ${name || 'control'}`);
        this.deserialize = wrapTryCatch(deserialize, `Error while deserializing value for ${name || 'control'}`);
        this.debounceTime = debounceTime;
    }

}
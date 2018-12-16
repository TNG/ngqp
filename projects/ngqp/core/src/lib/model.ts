import { Comparator, isFunction, wrapTryCatch } from './util';
import { createEmptyOnDeserializer, createEmptyOnSerializer } from './serializers';

/** TODO Documentation */
export type ParamSerializer<T> = (model: T | null) => string | null;

/** TODO Documentation */
export type ParamDeserializer<T> = (value: string | null) => T | null;

/**
 * TODO Documentation
 */
export interface QueryParamControlOpts<T> {
    /** TODO Documentation */
    name: string;
    /** TODO Documentation */
    serialize: ParamSerializer<T>;
    /** TODO Documentation */
    deserialize: ParamDeserializer<T>;
    /** TODO Documentation */
    compareWith: Comparator<T>;
    /** TODO Documentation */
    debounceTime?: number | null;
    /** TODO Documentation */
    emptyOn?: T | null;
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

    /** TODO Documentation See QueryParamControlOpts */
    public name: string | null;

    /** TODO Documentation See QueryParamControlOpts */
    public serialize: ParamSerializer<T>;

    /** TODO Documentation See QueryParamControlOpts */
    public deserialize: ParamDeserializer<T>;

    /** TODO Documentation See QueryParamControlOpts */
    public compareWith: Comparator<T>;

    /** TODO Documentation See QueryParamControlOpts */
    public debounceTime: number | null;

    /** TODO Documentation */
    public value: T = null;

    constructor(opts: QueryParamControlOpts<T>) {
        const { name, serialize, deserialize, debounceTime, emptyOn, compareWith } = opts;

        if (!isFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        if (!isFunction(compareWith)) {
            throw new Error(`compareWith must be a function, but received ${compareWith}`);
        }

        this.name = name;
        this.serialize = wrapTryCatch(
            createEmptyOnSerializer(serialize, emptyOn, compareWith),
            `Error while serializing value for ${name || 'control'}`
        );
        this.deserialize = wrapTryCatch(
            createEmptyOnDeserializer(deserialize, emptyOn),
            `Error while deserializing value for ${name || 'control'}`
        );
        this.compareWith = compareWith;
        this.debounceTime = debounceTime;
    }

}
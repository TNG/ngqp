import { Observable, Subject } from 'rxjs';
import { isOptionalFunction } from './util';

/**
 * TODO Documentation
 */
export class QueryParamGroup {

    /** @internal Maps each control name to the corresponding control. */
    public controls: {[controlName: string]: QueryParamControl<any>} = {};

    constructor(controls: {[controlName: string]: QueryParamControl<any>}) {
        this.controls = controls;
    }

    /**
     * TODO Documentation
     */
    public setValue(/* TODO { emitEvent? } */): void {
        // TODO
    }

    /**
     * TODO Documentation
     */
    public patchValue(/* TODO { emitEvent? } */): void {
        // TODO
    }

    /**
     * TODO Documentation
     */
    public get valueChanges(): Observable<any> {
        // TODO Implement and turn into a property
        return null;
    }

}

/**
 * TODO Documentation
 */
export class QueryParamControl<T> {

    /** TODO Documentation */
    public value: T = null;

    // TODO Who completes this?
    private _valueChanges$ = new Subject<T>();
    /** TODO Documentation */
    public readonly valueChanges$ = this._valueChanges$.asObservable();

    /** TODO Documentation */
    public name: string | null = null;

    /** TODO Documentation */
    public initialValue!: T | null;

    /** TODO Documentation */
    public serialize: (model: T) => string;

    /** TODO Documentation */
    public deserialize: (value: string) => T;

    // TODO Add combineWith(previousValue: T, currentValue: T): Params

    constructor(config: QueryParamControlOpts<T>) {
        const {
            name = null,
            initialValue = null,
            serialize = (model: any) => '' + model,
            deserialize = (value: string) => value as any,
        } = config;

        if (!isOptionalFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isOptionalFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        this.name = name;
        this.initialValue = initialValue;

        // TODO Wrap this into an error handler with proper error message
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

}

/**
 * TODO Documentation
 */
// TODO multi: true
export interface QueryParamControlOpts<T> {
    name?: string;
    initialValue?: T;
    serialize?: (model: T) => string | null;
    deserialize?: (value: string | null) => T;
}
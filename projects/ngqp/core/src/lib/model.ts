import { Observable, Subject } from 'rxjs';
import { Comparator, isFunction, isMissing, wrapTryCatch } from './util';
import { createEmptyOnDeserializer, createEmptyOnSerializer } from './serializers';

/** TODO Documentation */
export type ParamSerializer<T> = (model: T | null) => string | null;

/** TODO Documentation */
export type ParamDeserializer<T> = (value: string | null) => T | null;

/** TODO Documentation */
export type OnChangeFunction<T> = (value: T) => void;

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

    private _valueChanges = new Subject<any>();

    /** TODO Documentation */
    public readonly valueChanges: Observable<any> = this._valueChanges.asObservable();

    /** TODO Documentation */
    public readonly controls: { [ controlName: string ]: QueryParamControl<any> };

    constructor(controls: { [ controlName: string ]: QueryParamControl<any> }) {
        this.controls = controls;
        Object.values(this.controls).forEach(control => control.setParent(this));
    }

    /** TODO Documentation */
    public get(controlName: string): QueryParamControl<any> {
        return this.controls[ controlName ];
    }

    /** TODO Documentation */
    public get value(): any {
        const value: any = {};
        Object.keys(this.controls).forEach(controlName => value[ controlName ] = this.controls[ controlName ].value);

        return value;
    }

    /**
     * TODO Documentation
     */
    public updateValue(opts: {
        emitEvent?: boolean,
    } = {}): void {
        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }
    }

}

/**
 * TODO Documentation
 */
export class QueryParamControl<T> {

    private _valueChanges = new Subject<T>();

    /** TODO Documentation */
    public readonly valueChanges: Observable<T> = this._valueChanges.asObservable();

    /** TODO Documentation */
    public value: T = null;

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

    private parent: QueryParamGroup;
    private changeFunctions: OnChangeFunction<T>[] = [];

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

    /**
     * TODO Documentation
     * @internal
     */
    public registerOnChange(fn: OnChangeFunction<T>): void {
        this.changeFunctions.push(fn);
    }

    /**
     * TODO Documentation
     */
    public setValue(value: T | null): void {
        this.changeFunctions.forEach(changeFn => changeFn(value));
    }

    /**
     * TODO Documentation
     */
    public updateValue(opts: {
        emitEvent?: boolean,
        onlySelf?: boolean,
    } = {}): void {
        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }

        if (!isMissing(this.parent) && !opts.onlySelf) {
            this.parent.updateValue(opts);
        }
    }

    /**
     * TODO Documentation
     * @internal
     */
    public setParent(parent: QueryParamGroup): void {
        this.parent = parent;
    }

}
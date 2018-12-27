import { Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Comparator, isFunction, isMissing, wrapTryCatch } from './util';
import { createEmptyOnDeserializer, createEmptyOnSerializer } from './serializers';
import { RouterAdapterOptions } from './router-adapter/router-adapter.interface';

/** TODO Documentation */
export type ParamSerializer<T> = (model: T | null) => string | null;

/** TODO Documentation */
export type ParamDeserializer<T> = (value: string | null) => T | null;

/** TODO Documentation */
export type OnChangeFunction<T> = (value: T) => void;

/** TODO Documentation */
export type ParamCombinator<T> = (previousValue: T, newValue: T) => Params;

/** TODO Documentation */
export type Unpack<T> = T extends (infer U)[] ? U : T;

/** TODO Documentation */
export interface QueryParamGroupValue {
    [ controlName: string ]: any;
}

/**
 * TODO Documentation
 */
export interface QueryParamControlOpts<T> {
    /** TODO Documentation */
    name: string;
    /** TODO Documentation */
    serialize: ParamSerializer<Unpack<T>>;
    /** TODO Documentation */
    deserialize: ParamDeserializer<Unpack<T>>;
    /** TODO Documentation */
    compareWith: Comparator<Unpack<T>>;
    /** TODO Documentation */
    multi?: boolean;
    /** TODO Documentation */
    debounceTime?: number | null;
    /** TODO Documentation (+ not supported in multi-mode) */
    emptyOn?: Unpack<T>;
    /** TODO Documentation (note: no controls / serializers, but finished values and non-recursive) */
    combineWith?: ParamCombinator<T>;
}

/**
 * TODO Documentation
 */
export class QueryParamGroup {

    private _valueChanges = new Subject<QueryParamGroupValue>();

    /** TODO Documentation */
    public readonly valueChanges: Observable<QueryParamGroupValue> = this._valueChanges.asObservable();

    /** TODO Documentation */
    public readonly controls: { [ controlName: string ]: QueryParamControl<any> };

    /** TODO Documentation */
    public readonly routerOptions: RouterAdapterOptions;

    private changeFunctions: OnChangeFunction<QueryParamGroupValue>[] = [];

    constructor(
        controls: { [ controlName: string ]: QueryParamControl<any> },
        extras: RouterAdapterOptions = {}
    ) {
        this.controls = controls;
        this.routerOptions = extras;

        Object.values(this.controls).forEach(control => control._setParent(this));
    }

    /**
     * TODO Documentation
     * @internal
     */
    public _registerOnChange(fn: OnChangeFunction<QueryParamGroupValue>): void {
        this.changeFunctions.push(fn);
    }

    /** TODO Documentation */
    public get(controlName: string): QueryParamControl<any> {
        return this.controls[ controlName ];
    }

    /** TODO Documentation */
    public get value(): QueryParamGroupValue {
        const value: QueryParamGroupValue = {};
        Object.keys(this.controls).forEach(controlName => value[ controlName ] = this.controls[ controlName ].value);

        return value;
    }

    /**
     * TODO Documentation
     */
    public patchValue(value: QueryParamGroupValue, opts: { emitEvent?: boolean } = {}): void {
        Object.keys(value).forEach(controlName => {
            const control = this.controls[ controlName ];
            if (isMissing(control)) {
                return;
            }

            control.setValue(value[ controlName ], { emitEvent: false });
        });

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }
    }

    /**
     * TODO Documentation
     */
    public setValue(value: QueryParamGroupValue, opts: { emitEvent?: boolean } = {}): void {
        Object.keys(this.controls).forEach(controlName => {
            this.controls[ controlName ].setValue(value[ controlName ], { emitEvent: false });
        });

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }
    }

    /**
     * TODO Documentation
     */
    public _updateValue(opts: {
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
    public readonly name: string | null;

    /** TODO Documentation See QueryParamControlOpts */
    public readonly serialize: ParamSerializer<Unpack<T>>;

    /** TODO Documentation See QueryParamControlOpts */
    public readonly deserialize: ParamDeserializer<Unpack<T>>;

    /** TODO Documentation See QueryParamControlOpts */
    public readonly multi: boolean;

    /** TODO Documentation See QueryParamControlOpts */
    public readonly debounceTime: number | null;

    /** TODO Documentation See QueryParamControlOpts */
    public readonly combineWith: ParamCombinator<T>;

    private parent: QueryParamGroup;
    private changeFunctions: OnChangeFunction<T>[] = [];

    constructor(opts: QueryParamControlOpts<T>) {
        const { name, serialize, deserialize, debounceTime, compareWith, combineWith } = opts;
        const { emptyOn = null } = opts;
        const multi = opts.multi === true;

        if (isMissing(name)) {
            throw new Error(`Please provide a name for each query parameter control.`);
        }

        if (!isFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        if (!isFunction(compareWith)) {
            throw new Error(`compareWith must be a function, but received ${compareWith}`);
        }

        if (!isMissing(combineWith) && !isFunction(combineWith)) {
            throw new Error(`combineWith must be a function, but received ${combineWith}`);
        }

        if (multi && !isMissing(emptyOn)) {
            throw new Error(`emptyOn is only supported for single-value parameters, but ${name} is a multi-value parameter.`);
        }

        this.name = name;
        this.serialize = wrapTryCatch(
            createEmptyOnSerializer(serialize, emptyOn, compareWith),
            `Error while serializing value for ${name}`
        );
        this.deserialize = wrapTryCatch(
            createEmptyOnDeserializer(deserialize, emptyOn),
            `Error while deserializing value for ${name}`
        );
        this.multi = multi;
        this.debounceTime = debounceTime;
        this.combineWith = combineWith;
    }

    /**
     * TODO Documentation
     * @internal
     */
    public _registerOnChange(fn: OnChangeFunction<T>): void {
        this.changeFunctions.push(fn);
    }

    /**
     * TODO Documentation
     */
    public setValue(value: T | null, opts: { emitEvent?: boolean } = {}): void {
        this.value = value;

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(value));
        }
    }

    /**
     * TODO Documentation
     */
    public _updateValue(opts: {
        emitEvent?: boolean,
        onlySelf?: boolean,
    } = {}): void {
        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }

        if (!isMissing(this.parent) && !opts.onlySelf) {
            this.parent._updateValue(opts);
        }
    }

    /**
     * TODO Documentation
     * @internal
     */
    public _setParent(parent: QueryParamGroup): void {
        this.parent = parent;
    }

}
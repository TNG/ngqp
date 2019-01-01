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
    [ queryParamName: string ]: any;
}

/**
 * TODO Documentation
 */
export interface QueryParamOpts<T> {
    /** TODO Documentation */
    param: string;
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
    /** TODO Documentation (note: no queryParams / serializers, but finished values and non-recursive) */
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
    public readonly queryParams: { [ queryParamName: string ]: QueryParam<any> };

    /** TODO Documentation */
    public readonly routerOptions: RouterAdapterOptions;

    private changeFunctions: OnChangeFunction<QueryParamGroupValue>[] = [];

    constructor(
        queryParams: { [ queryParamName: string ]: QueryParam<any> },
        extras: RouterAdapterOptions = {}
    ) {
        this.queryParams = queryParams;
        this.routerOptions = extras;

        Object.values(this.queryParams).forEach(queryParam => queryParam._setParent(this));
    }

    /**
     * TODO Documentation
     * @internal
     */
    public _registerOnChange(fn: OnChangeFunction<QueryParamGroupValue>): void {
        this.changeFunctions.push(fn);
    }

    /** TODO Documentation */
    public get(queryParamName: string): QueryParam<any> {
        return this.queryParams[ queryParamName ];
    }

    /** TODO Documentation */
    public get value(): QueryParamGroupValue {
        const value: QueryParamGroupValue = {};
        Object.keys(this.queryParams).forEach(queryParamName => value[ queryParamName ] = this.queryParams[ queryParamName ].value);

        return value;
    }

    /**
     * TODO Documentation
     */
    public patchValue(value: QueryParamGroupValue, opts: { emitEvent?: boolean } = {}): void {
        Object.keys(value).forEach(queryParamName => {
            const queryParam = this.queryParams[ queryParamName ];
            if (isMissing(queryParam)) {
                return;
            }

            queryParam.setValue(value[ queryParamName ], { emitEvent: false });
        });

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }
    }

    /**
     * TODO Documentation
     */
    public setValue(value: QueryParamGroupValue, opts: { emitEvent?: boolean } = {}): void {
        Object.keys(this.queryParams).forEach(queryParamName => {
            this.queryParams[ queryParamName ].setValue(value[ queryParamName ], { emitEvent: false });
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
export class QueryParam<T> {

    private _valueChanges = new Subject<T>();

    /** TODO Documentation */
    public readonly valueChanges: Observable<T> = this._valueChanges.asObservable();

    /** TODO Documentation */
    public value: T = null;

    /** TODO Documentation See QueryParamOpts */
    public readonly param: string | null;

    /** TODO Documentation See QueryParamOpts */
    public readonly serialize: ParamSerializer<Unpack<T>>;

    /** TODO Documentation See QueryParamOpts */
    public readonly deserialize: ParamDeserializer<Unpack<T>>;

    /** TODO Documentation See QueryParamOpts */
    public readonly multi: boolean;

    /** TODO Documentation See QueryParamOpts */
    public readonly debounceTime: number | null;

    /** TODO Documentation See QueryParamOpts */
    public readonly combineWith: ParamCombinator<T>;

    private parent: QueryParamGroup;
    private changeFunctions: OnChangeFunction<T>[] = [];

    constructor(opts: QueryParamOpts<T>) {
        const { param, serialize, deserialize, debounceTime, compareWith, combineWith } = opts;
        const { emptyOn = null } = opts;
        const multi = opts.multi === true;

        if (isMissing(param)) {
            throw new Error(`Please provide a parameter name for each query parameter.`);
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
            throw new Error(`emptyOn is only supported for single-value parameters, but ${param} is a multi-value parameter.`);
        }

        this.param = param;
        this.serialize = wrapTryCatch(
            createEmptyOnSerializer(serialize, emptyOn, compareWith),
            `Error while serializing value for ${param}`
        );
        this.deserialize = wrapTryCatch(
            createEmptyOnDeserializer(deserialize, emptyOn),
            `Error while deserializing value for ${param}`
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
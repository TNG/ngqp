import { Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Comparator, isFunction, isMissing, wrapTryCatch } from './util';
import { createEmptyOnDeserializer, createEmptyOnSerializer } from './serializers';
import { RouterOptions } from './router-adapter/router-adapter.interface';

/**
 * A serializer defines how the represented form control's
 * value is converted into a string to be used in the URL.
 */
export type ParamSerializer<T> = (model: T) => string;

/**
 * A deserializer defines how a URL parameter is converted
 * into the represented form control's value.
 */
export type ParamDeserializer<T> = (value: string) => T;

/**
 * Defines a function which describes side effects on other
 * URL parameters.
 *
 * See {@link QueryParamOpts#combineWith}.
 */
export type ParamCombinator<T> = (previousValue: T, newValue: T) => Params;

/** @internal */
export type OnChangeFunction<T> = (value: T) => void;

/** @internal */
export type Unpack<T> = T extends (infer U)[] ? U : T;

/**
 * List of options which can be passed to {@link QueryParam}.
 */
export interface QueryParamOpts<T> {
    /**
     * The name of the parameter to be used in the URL.
     *
     * This represents the name of the query parameter which will be
     * used in the URL (e.g., `?q=`), which differs from the name of
     * the {@link QueryParam} model used inside {@link QueryParamGroup}.
     */
    param: string;

    /**
     * The serializer used for this parameter.
     *
     * See {@link ParamSerializer}.
     */
    serialize?: ParamSerializer<Unpack<T>>;

    /**
     * The deserializer used for this parameter.
     *
     * See {@link ParamDeserializer}.
     */
    deserialize?: ParamDeserializer<Unpack<T>>;

    /**
     * Whether this parameter can take on multiple values at once.
     *
     * If set to true, this parameter is array-typed. How this is represented
     * on the URL is defined by the Angular Router, which defines the parameter
     * multiple times, e.g. `https://www.app.io?param=A&param=B&param=C`.
     */
    multi?: boolean;

    /**
     * Defines, in milliseconds, how much changes to the value should be debounced.
     *
     * When set, a change of the parameter value coming from either the form control
     * or a programmatic change will be debounced by the given value (in milliseconds).
     * This is useful for, e.g., text inputs.
     *
     * If the value changes through a change of the URL, this debounce will not apply.
     */
    debounceTime?: number | null;

    /**
     * Default value of the parameter.
     *
     * If set, the parameter will be considered to default to this value. This means
     * that if the parameter is not defined on the URL, this value will be written
     * to the form control. Vice versa, if the form control takes on this value,
     * the URL parameter will be removed.
     *
     * NOTE: This does currently not work in combination with {@link QueryParamOpts#multi}.
     */
    emptyOn?: Unpack<T>;

    /**
     * The comparator to be used with {@link QueryParamOpts#emptyOn}.
     *
     * This function will be used to determine whether the current value equals the defined
     * default value. By default, a loose equals comparison is made (i.e., "==").
     *
     * See {@link Comparator}.
     */
    compareWith?: Comparator<Unpack<T>>;

    /**
     * Execute a side effect on other query parameters.
     *
     * If the value of this parameter changes, this function is invoked. It can return an
     * additional set of query parameters to change, e.g., to reset the current page in a
     * pagination when the direction in which to sort has been changed.
     *
     * NOTE: This function must return the raw query parameter names and values. No
     *       (de-)serializers are run and no recursion is applied.
     */
    combineWith?: ParamCombinator<T>;
}

/**
 * Groups multiple {@link QueryParam} instances to a single unit.
 *
 * This "bundles" multiple parameters together such that changes can be emitted as a
 * complete unit. Collecting parameters into a group is required for the synchronization
 * to and from the URL.
 */
export class QueryParamGroup {

    private _valueChanges = new Subject<Record<string, any>>();

    /**
     * Emits the values of all parameters in this group whenever at least one changes.
     *
     * This observable emits an object keyed by the {@QueryParam} names where each key
     * carries the current value of the represented parameter. It emits whenever at least
     * one parameter's value is changed.
     *
     * NOTE: This observable does not complete on its own, so ensure to unsubscribe from it.
     */
    public readonly valueChanges: Observable<Record<string, any>> = this._valueChanges.asObservable();

    /** @internal */
    public readonly queryParams: { [ queryParamName: string ]: QueryParam<any> };

    /** @internal */
    public readonly routerOptions: RouterOptions;

    private changeFunctions: OnChangeFunction<Record<string, any>>[] = [];

    constructor(
        queryParams: { [ queryParamName: string ]: QueryParam<any> },
        extras: RouterOptions = {}
    ) {
        this.queryParams = queryParams;
        this.routerOptions = extras;

        Object.values(this.queryParams).forEach(queryParam => queryParam._setParent(this));
    }

    /** @internal */
    public _registerOnChange(fn: OnChangeFunction<Record<string, any>>): void {
        this.changeFunctions.push(fn);
    }

    /**
     * Retrieves a specific {@link QueryParam} from this group by name.
     *
     * This returns the {@link QueryParam} with the given name, or `null`
     * if no parameter with that name is found in this group.
     *
     * @param queryParamName The name of the parameter instance to retrieve.
     */
    public get(queryParamName: string): QueryParam<any> | null {
        const param = this.queryParams[ queryParamName ];
        if (!param) {
            return null;
        }

        return param;
    }

    /**
     * The current value of this group.
     *
     * See {@link QueryParamGroup#valueChanges} for a description of the format of
     * the value.
     */
    public get value(): Record<string, any> {
        const value: Record<string, any> = {};
        Object.keys(this.queryParams).forEach(queryParamName => value[ queryParamName ] = this.queryParams[ queryParamName ].value);

        return value;
    }

    /**
     * Updates the value of this group by merging it in.
     *
     * This sets the value of each provided parameter to the respective provided
     * value. If a parameter is not listed, its value remains unchanged.
     *
     * @param value See {@link QueryParamGroup#valueChanges} for a description of the format.
     * @param opts Additional options
     */
    public patchValue(value: Record<string, any>, opts: { emitEvent?: boolean } = {}): void {
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
     * Updates the value of this group by overwriting it.
     *
     * This sets the value of each provided parameter to the respective provided
     * value. If a parameter is not listed, its value is set to `undefine`.
     *
     * @param value See {@link QueryParamGroup#valueChanges} for a description of the format.
     * @param opts Additional options
     */
    public setValue(value: Record<string, any>, opts: { emitEvent?: boolean } = {}): void {
        Object.keys(this.queryParams).forEach(queryParamName => {
            this.queryParams[ queryParamName ].setValue(value[ queryParamName ], { emitEvent: false });
        });

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }
    }

    /** @internal */
    public _updateValue(opts: {
        emitEvent?: boolean,
    } = {}): void {
        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }
    }

}

/**
 * Describes a single parameter.
 *
 * This is the description of a single parameter and essentially serves
 * as the glue between its representation in the URL and its connection
 * to a form control.
 */
export class QueryParam<T> {

    private _valueChanges = new Subject<T>();

    /**
     * Emits the current value of this parameter whenever it changes.
     *
     * NOTE: This observable does not complete on its own, so ensure to unsubscribe from it.
     */
    public readonly valueChanges: Observable<T> = this._valueChanges.asObservable();

    /**
     * The current value of this parameter.
     */
    public value: T = null;

    /** See {@link QueryParamOpts#param}. */
    public readonly param: string | null;

    /** @internal */
    public readonly serialize: ParamSerializer<Unpack<T>>;

    /** @internal */
    public readonly deserialize: ParamDeserializer<Unpack<T>>;

    /** @internal */
    public readonly multi: boolean;

    /** @internal */
    public readonly debounceTime: number | null;

    /** @internal */
    public readonly combineWith: ParamCombinator<T>;

    private parent: QueryParamGroup;
    private changeFunctions: OnChangeFunction<T>[] = [];

    constructor(opts: QueryParamOpts<T>) {
        const { param, serialize, deserialize, debounceTime, compareWith, emptyOn, combineWith } = opts;
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
            emptyOn === undefined ? serialize : createEmptyOnSerializer(serialize, emptyOn, compareWith),
            `Error while serializing value for ${param}`
        );
        this.deserialize = wrapTryCatch(
            emptyOn === undefined ? deserialize : createEmptyOnDeserializer(deserialize, emptyOn),
            `Error while deserializing value for ${param}`
        );
        this.multi = multi;
        this.debounceTime = debounceTime;
        this.combineWith = combineWith;
    }

    /** @internal */
    public _registerOnChange(fn: OnChangeFunction<T>): void {
        this.changeFunctions.push(fn);
    }

    /**
     * Updates the value of this parameter.
     *
     * If wired up with a {@link QueryParamGroup}, this will also synchronize
     * the value to the URL.
     */
    public setValue(value: T | null, opts: { emitEvent?: boolean } = {}): void {
        this.value = value;

        if (opts.emitEvent !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(value));
        }
    }

    /** @internal */
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

    /** @internal */
    public _setParent(parent: QueryParamGroup): void {
        this.parent = parent;
    }

}
import { Observable, Subject } from 'rxjs';
import { isFunction, isMissing, isPresent, wrapTryCatch } from '../util';
import { Comparator, OnChangeFunction, ParamCombinator, ParamDeserializer, ParamSerializer } from '../types';
import { QueryParamGroup } from './query-param-group';
import { MultiQueryParamOpts, QueryParamOpts } from './query-param-opts';

/**
 * Describes a single parameter.
 *
 * This is the description of a single parameter and essentially serves
 * as the glue between its representation in the URL and its connection
 * to a form control.
 */
export class QueryParam<U, T = U> implements Required<Readonly<QueryParamOpts<U, T>>> {

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

    /**
     * The name of the parameter to be used in the URL.
     *
     * This represents the name of the query parameter which will be
     * used in the URL (e.g., `?q=`), which differs from the name of
     * the {@link QueryParam} model used inside {@link QueryParamGroup}.
     */
    public readonly urlParam: string;

    /** See {@link QueryParamOpts}. */
    public readonly serialize: ParamSerializer<U>;

    /** See {@link QueryParamOpts}. */
    public readonly deserialize: ParamDeserializer<U>;

    /** See {@link QueryParamOpts}. */
    public readonly multi: boolean;

    /** See {@link QueryParamOpts}. */
    public readonly debounceTime: number | null;

    /** See {@link QueryParamOpts}. */
    public readonly emptyOn: T;

    /** See {@link QueryParamOpts}. */
    public readonly compareWith: Comparator<T>;

    /** See {@link QueryParamOpts}. */
    public readonly combineWith: ParamCombinator<T>;

    private parent: QueryParamGroup;
    private changeFunctions: OnChangeFunction<T>[] = [];

    constructor(urlParam: string, opts: QueryParamOpts<U, T> = {}) {
        opts = {
            multi: false,
            ...opts,
        };

        const { serialize, deserialize, multi, debounceTime, compareWith, emptyOn, combineWith } = opts;

        if (isMissing(urlParam)) {
            throw new Error(`Please provide a URL parameter name for each query parameter.`);
        }

        if (!isFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        if (emptyOn !== undefined && !isFunction(compareWith)) {
            throw new Error(`compareWith must be a function, but received ${compareWith}`);
        }

        if (isPresent(combineWith) && !isFunction(combineWith)) {
            throw new Error(`combineWith must be a function, but received ${combineWith}`);
        }

        this.urlParam = urlParam;
        this.serialize = wrapTryCatch(serialize, `Error while serializing value for ${this.urlParam}`);
        this.deserialize = wrapTryCatch(deserialize, `Error while deserializing value for ${this.urlParam}`);
        this.multi = !!multi;
        this.debounceTime = debounceTime;
        this.emptyOn = emptyOn;
        this.compareWith = compareWith;
        this.combineWith = combineWith;
    }

    /** @internal */
    public _registerOnChange(fn: OnChangeFunction<T>): void {
        this.changeFunctions.push(fn);
    }

    /** @internal */
    public _clearChangeFunctions(): void {
        this.changeFunctions = [];
    }

    /**
     * Updates the value of this parameter.
     *
     * If wired up with a {@link QueryParamGroup}, this will also synchronize
     * the value to the URL.
     */
    public setValue(value: T | null, opts: {
        emitEvent?: boolean,
        onlySelf?: boolean,
        emitModelToViewChange?: boolean,
    } = {}): void {
        this.value = value;

        if (opts.emitModelToViewChange !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(value));
        }

        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }

        if (isPresent(this.parent) && !opts.onlySelf) {
            this.parent._updateValue({
                emitEvent: opts.emitEvent,
                emitModelToViewChange: false,
            });
        }
    }

    /** @internal */
    public _setParent(parent: QueryParamGroup): void {
        if (this.parent) {
            throw new Error(`Parameter already belongs to a QueryParamGroup.`);
        }

        this.parent = parent;
    }

}

/**
 * Like {@link QueryParam}, but for array-typed parameters
 *
 * This is a strongly typed equivalent for {@link QueryParam} where the
 * value type is an array of the base type.
 */
export class MultiQueryParam<T> extends QueryParam<T, T[]> {

    /** See {@link QueryParamOpts}. */
    public readonly multi: true;

    constructor(urlParam: string, opts: MultiQueryParamOpts<T>) {
        super(urlParam, {
            ...(opts || {}),
            multi: true,
        });
    }

}
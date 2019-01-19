import { Observable, Subject } from 'rxjs';
import { isFunction, isMissing, isPresent, wrapTryCatch } from '../util';
import { OnChangeFunction, ParamCombinator, ParamDeserializer, ParamSerializer, Unpack } from '../types';
import { createEmptyOnDeserializer, createEmptyOnSerializer } from '../serializers';
import { QueryParamGroup } from './query-param-group';
import { QueryParamOpts } from './query-param-opts';

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

    /**
     * The name of the parameter to be used in the URL.
     *
     * This represents the name of the query parameter which will be
     * used in the URL (e.g., `?q=`), which differs from the name of
     * the {@link QueryParam} model used inside {@link QueryParamGroup}.
     */
    public readonly urlParam: string;

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

    constructor(urlParam: string, opts: QueryParamOpts<T> = {}) {
        const { serialize, deserialize, debounceTime, compareWith, emptyOn, combineWith } = opts;
        const multi = opts.multi === true;
        const hasEmptyOn = emptyOn !== undefined;

        if (isMissing(urlParam)) {
            throw new Error(`Please provide a URL parameter name for each query parameter.`);
        }

        if (!isFunction(serialize)) {
            throw new Error(`serialize must be a function, but received ${serialize}`);
        }

        if (!isFunction(deserialize)) {
            throw new Error(`deserialize must be a function, but received ${deserialize}`);
        }

        if (hasEmptyOn && !isFunction(compareWith)) {
            throw new Error(`compareWith must be a function, but received ${compareWith}`);
        }

        if (isPresent(combineWith) && !isFunction(combineWith)) {
            throw new Error(`combineWith must be a function, but received ${combineWith}`);
        }

        if (multi && isPresent(emptyOn)) {
            throw new Error(`emptyOn is only supported for single-value parameters, but ${urlParam} is a multi-value parameter.`);
        }

        this.urlParam = urlParam;

        this.serialize = wrapTryCatch(
            !hasEmptyOn ? serialize : createEmptyOnSerializer(serialize, emptyOn, compareWith),
            `Error while serializing value for ${urlParam}`
        );
        this.deserialize = wrapTryCatch(
            !hasEmptyOn ? deserialize : createEmptyOnDeserializer(deserialize, emptyOn),
            `Error while deserializing value for ${urlParam}`
        );
        this.multi = multi;
        this.debounceTime = debounceTime;
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
        this.parent = parent;
    }

}
import { forkJoin, isObservable, Observable, of, Subject } from 'rxjs';
import { areEqualUsing, isFunction, isMissing, isPresent, undefinedToNull, wrapTryCatch } from '../util';
import { Comparator, OnChangeFunction, ParamCombinator, ParamDeserializer, ParamSerializer, Partitioner, Reducer } from '../types';
import { QueryParamGroup } from './query-param-group';
import { MultiQueryParamOpts, PartitionedQueryParamOpts, QueryParamOpts, QueryParamOptsBase } from './query-param-opts';

/** @internal */
abstract class AbstractQueryParamBase<T> {

    public abstract value: T | null;

    protected parent: QueryParamGroup | null = null;
    protected readonly _valueChanges = new Subject<T | null>();
    protected changeFunctions: OnChangeFunction<T>[] = [];

    /**
     * Emits the current value of this parameter whenever it changes.
     *
     * NOTE: This observable does not complete on its own, so ensure to unsubscribe from it.
     */
    public readonly valueChanges: Observable<T | null> = this._valueChanges.asObservable();

    public _registerOnChange(fn: OnChangeFunction<T>): void {
        this.changeFunctions.push(fn);
    }

    public _clearChangeFunctions(): void {
        this.changeFunctions = [];
    }

    public abstract setValue(value: T | null, opts: {
        emitEvent?: boolean,
        onlySelf?: boolean,
        emitModelToViewChange?: boolean,
    }): void;

    public _setParent(parent: QueryParamGroup | null): void {
        if (this.parent && parent) {
            throw new Error(`Parameter already belongs to a QueryParamGroup.`);
        }

        this.parent = parent;
    }

}

/**
 * Abstract base for {@link QueryParam} and {@link MultiQueryParam}.
 *
 * This base class holds most of the parameter's options, but is unaware of
 * how to actually (de-)serialize any values.
 */
export abstract class AbstractQueryParam<U, T> extends AbstractQueryParamBase<T> {

    /**
     * The current value of this parameter.
     */
    public value: T | null = null;

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
    public readonly debounceTime: number | null;

    /** See {@link QueryParamOpts}. */
    public readonly emptyOn?: T | null;

    /** See {@link QueryParamOpts}. */
    public readonly compareWith?: Comparator<T>;

    /** See {@link QueryParamOpts}. */
    public readonly combineWith?: ParamCombinator<T>;

    protected constructor(urlParam: string, opts: QueryParamOptsBase<U, T> = {}) {
        super();
        const { serialize, deserialize, debounceTime, compareWith, emptyOn, combineWith } = opts;

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
        this.debounceTime = undefinedToNull(debounceTime);
        this.emptyOn = emptyOn;
        this.compareWith = compareWith;
        this.combineWith = combineWith;
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

}

/**
 * Describes a single parameter.
 *
 * This is the description of a single parameter and essentially serves
 * as the glue between its representation in the URL and its connection
 * to a form control.
 */
export class QueryParam<T> extends AbstractQueryParam<T | null, T | null> implements Readonly<QueryParamOpts<T>> {

    /** See {@link QueryParamOpts}. */
    public readonly multi = false;

    constructor(urlParam: string, opts: QueryParamOpts<T>) {
        super(urlParam, opts);
    }

    /** @internal */
    public serializeValue(value: T | null): string | null {
        if (this.emptyOn !== undefined && areEqualUsing(value, this.emptyOn, this.compareWith!)) {
            return null;
        }

        return this.serialize(value);
    }

    /** @internal */
    public deserializeValue(value: string | null): Observable<T | null> {
        if (this.emptyOn !== undefined && value === null) {
            return of(this.emptyOn);
        }

        const deserialized = this.deserialize(value);
        if (isObservable<T | null>(deserialized)) {
            return deserialized;
        }

        return of(deserialized);
    }

}

/**
 * Like {@link QueryParam}, but for array-typed parameters
 */
export class MultiQueryParam<T> extends AbstractQueryParam<T | null, (T | null)[]> implements Readonly<MultiQueryParamOpts<T>> {

    /** See {@link QueryParamOpts}. */
    public readonly multi = true;

    constructor(urlParam: string, opts: MultiQueryParamOpts<T>) {
        super(urlParam, opts);
    }

    /** @internal */
    public serializeValue(value: (T | null)[] | null): (string | null)[] | null {
        if (this.emptyOn !== undefined && areEqualUsing(value, this.emptyOn, this.compareWith!)) {
            return null;
        }

        return (value || []).map(this.serialize.bind(this));
    }

    /** @internal */
    public deserializeValue(value: (string | null)[] | null): Observable<(T | null)[] | null> {
        if (this.emptyOn !== undefined && (value || []).length === 0) {
            return of(this.emptyOn);
        }

        return forkJoin<T | null>(...(value || [])
            .map(v => {
                const deserialized = this.deserialize(v);
                if (isObservable<T | null>(deserialized)) {
                    return deserialized;
                }

                return of(deserialized);
            })
        );
    }

}

/**
 * Describes a partitioned query parameter.
 *
 * This encapsulates a list of query parameters such that a single form control
 * can be bound against multiple URL parameters. To achieve this, functions must
 * be defined which can convert the models between the parameters.
 */
export class PartitionedQueryParam<T, G extends unknown[] = unknown[]> extends AbstractQueryParamBase<T> {

    /** @internal */
    public readonly queryParams: (QueryParam<G[number]> | MultiQueryParam<G[number]>)[];

    /** @internal */
    public readonly partition: Partitioner<T, G>;

    /** @internal */
    public readonly reduce: Reducer<G, T>;

    constructor(
        queryParams: (QueryParam<G[number]> | MultiQueryParam<G[number]>)[],
        opts: PartitionedQueryParamOpts<T, G>,
    ) {
        super();

        if (queryParams.length === 0) {
            throw new Error(`Partitioned parameters must contain at least one parameter.`);
        }

        if (!isFunction(opts.partition)) {
            throw new Error(`partition must be a function, but received ${opts.partition}`);
        }

        if (!isFunction(opts.reduce)) {
            throw new Error(`reduce must be a function, but received ${opts.reduce}`);
        }

        this.queryParams = queryParams;
        this.partition = opts.partition;
        this.reduce = opts.reduce;
    }

    public get value(): T {
        return this.reduce(this.queryParams.map(queryParam => queryParam.value) as G);
    }

    public setValue(value: T, opts: {
        emitEvent?: boolean,
        onlySelf?: boolean,
        emitModelToViewChange?: boolean,
    } = {}): void {
        const partitioned = this.partition(value);
        this.queryParams.forEach((queryParam, index) => queryParam.setValue(partitioned[index] as any, {
            emitEvent: opts.emitEvent,
            onlySelf: true,
            emitModelToViewChange: false,
        }));

        if (opts.emitModelToViewChange !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }

        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }
    }

}
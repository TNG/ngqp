import { Observable, Subject } from 'rxjs';
import { isMissing } from '../util';
import { OnChangeFunction } from '../types';
import { QueryParam } from './query-param';
import { RouterOptions } from '../router-adapter/router-adapter.interface';

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

    /** @internal */
    public _clearChangeFunctions(): void {
        this.changeFunctions = [];
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
    public patchValue(value: Record<string, any>, opts: {
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
    } = {}): void {
        Object.keys(value).forEach(queryParamName => {
            const queryParam = this.queryParams[ queryParamName ];
            if (isMissing(queryParam)) {
                return;
            }

            queryParam.setValue(value[ queryParamName ], {
                emitEvent: opts.emitEvent,
                onlySelf: true,
                emitModelToViewChange: false,
            });
        });

        this._updateValue(opts);
    }

    /**
     * Updates the value of this group by overwriting it.
     *
     * This sets the value of each provided parameter to the respective provided
     * value. If a parameter is not listed, its value is set to `undefined`.
     *
     * @param value See {@link QueryParamGroup#valueChanges} for a description of the format.
     * @param opts Additional options
     */
    public setValue(value: Record<string, any>, opts: {
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
    } = {}): void {
        Object.keys(this.queryParams).forEach(queryParamName => {
            this.queryParams[ queryParamName ].setValue(value[ queryParamName ], {
                emitEvent: opts.emitEvent,
                onlySelf: true,
                emitModelToViewChange: false,
            });
        });

        this._updateValue(opts);
    }

    /** @internal */
    public _updateValue(opts: {
        emitEvent?: boolean,
        emitModelToViewChange?: boolean,
    } = {}): void {
        if (opts.emitModelToViewChange !== false) {
            this.changeFunctions.forEach(changeFn => changeFn(this.value));
        }

        if (opts.emitEvent !== false) {
            this._valueChanges.next(this.value);
        }
    }

}
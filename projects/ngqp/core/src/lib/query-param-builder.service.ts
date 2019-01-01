import { Injectable } from '@angular/core';
import { QueryParamControl, QueryParamControlOpts, QueryParamGroup } from './model';
import {
    DEFAULT_BOOLEAN_DESERIALIZER,
    DEFAULT_BOOLEAN_SERIALIZER,
    DEFAULT_NUMBER_DESERIALIZER,
    DEFAULT_NUMBER_SERIALIZER,
    DEFAULT_STRING_DESERIALIZER,
    DEFAULT_STRING_SERIALIZER
} from './serializers';
import { LOOSE_IDENTITY_COMPARATOR } from './util';
import { RouterAdapterOptions } from './router-adapter/router-adapter.interface';

type OverwritePartial<T1, T2 extends keyof T1> = Pick<T1, Exclude<keyof T1, T2>> & Partial<Pick<T1, T2>>;
export type QueryParamControlOptsInput<T> = OverwritePartial<QueryParamControlOpts<T>, 'serialize' | 'deserialize' | 'compareWith'>;

/**
 * TODO Documentation
 */
@Injectable({
    providedIn: 'root'
})
export class QueryParamBuilder {

    /**
     * TODO Documentation
     */
    public group(
        controls: { [ name: string ]: QueryParamControl<any> | string },
        extras: RouterAdapterOptions = {}
    ): QueryParamGroup {
        const mappedControls: { [ controlName: string ]: QueryParamControl<any> } = {};
        Object.keys(controls).forEach(controlName => {
            mappedControls[ controlName ] = this.createControl(controlName, controls[ controlName ]);
        });

        // TODO Maybe we should first validate that no two controls defined the same "name".
        return new QueryParamGroup(mappedControls, extras);
    }

    /**
     * Redirects to {@link stringParam}.
     * @see stringParam
     */
    public param(opts: QueryParamControlOptsInput<string[]> & { multi: true }): QueryParamControl<string[]>;
    public param(opts: QueryParamControlOptsInput<string>): QueryParamControl<string>;
    public param(opts: QueryParamControlOptsInput<string | string[]>): QueryParamControl<string | string[]> {
        return this.stringParam(opts);
    }

    /**
     * TODO Documentation
     */
    public stringParam(opts: QueryParamControlOptsInput<string[]> & { multi: true }): QueryParamControl<string[]>;
    public stringParam(opts: QueryParamControlOptsInput<string>): QueryParamControl<string>;
    public stringParam(opts: QueryParamControlOptsInput<string | string[]>): QueryParamControl<string | string[]> {
        return new QueryParamControl({
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public numericParam(opts: QueryParamControlOptsInput<number[]> & { multi: true }): QueryParamControl<number[]>;
    public numericParam(opts: QueryParamControlOptsInput<number>): QueryParamControl<number>;
    public numericParam(opts: QueryParamControlOptsInput<number | number[]>): QueryParamControl<number | number[]> {
        return new QueryParamControl({
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public booleanParam(opts: QueryParamControlOptsInput<boolean[]> & { multi: true }): QueryParamControl<boolean[]>;
    public booleanParam(opts: QueryParamControlOptsInput<boolean>): QueryParamControl<boolean>;
    public booleanParam(opts: QueryParamControlOptsInput<boolean | boolean[]>): QueryParamControl<boolean | boolean[]> {
        return new QueryParamControl({
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            compareWith: LOOSE_IDENTITY_COMPARATOR,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public customParam<T>(opts: QueryParamControlOpts<T[]> & { multi: true }): QueryParamControl<T[]>;
    public customParam<T>(opts: QueryParamControlOpts<T>): QueryParamControl<T>;
    public customParam<T>(opts: QueryParamControlOpts<T | T[]>): QueryParamControl<T | T[]> {
        return new QueryParamControl(opts);
    }

    private createControl<T>(controlName: string, controlConfig: QueryParamControl<T> | string): QueryParamControl<T | string> {
        if (controlConfig instanceof QueryParamControl) {
            return controlConfig;
        }

        return this.param({
            name: controlConfig,
        });
    }

}

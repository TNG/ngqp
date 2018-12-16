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

type OverwritePartial<T1, T2 extends keyof T1> = Pick<T1, Exclude<keyof T1, T2>> & Partial<Pick<T1, T2>>;
export type QueryParamControlOptsInput<T> = OverwritePartial<QueryParamControlOpts<T>, 'serialize' | 'deserialize'>;

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
    public group(controls: { [ name: string ]: QueryParamControl<any> | string }): QueryParamGroup {
        const mappedControls: { [ controlName: string ]: QueryParamControl<any> } = {};
        Object.keys(controls).forEach(controlName => {
            mappedControls[ controlName ] = this.createControl(controlName, controls[ controlName ]);
        });

        // TODO Maybe we should first validate that no two controls defined the same "name".
        return new QueryParamGroup(mappedControls);
    }

    /**
     * TODO Documentation
     */
    public param(opts: QueryParamControlOptsInput<string>): QueryParamControl<string> {
        return new QueryParamControl({
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public numericParam(opts: QueryParamControlOptsInput<number>): QueryParamControl<number> {
        return new QueryParamControl({
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public booleanParam(opts: QueryParamControlOptsInput<boolean>): QueryParamControl<boolean> {
        return new QueryParamControl({
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            ...opts,
        });
    }

    /**
     * TODO Documentation
     */
    public customParam<T>(opts: QueryParamControlOpts<T>): QueryParamControl<T> {
        return new QueryParamControl(opts);
    }

    private createControl<T>(controlName: string, controlConfig: QueryParamControl<T> | string): QueryParamControl<T | string> {
        if (controlConfig instanceof QueryParamControl) {
            return controlConfig;
        }

        return this.param({
            name: controlName,
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
        });
    }

}

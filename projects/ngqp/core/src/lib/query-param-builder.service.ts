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
    public group(config: { [ name: string ]: QueryParamControl<any> | string }): QueryParamGroup {
        const controls: { [ controlName: string ]: QueryParamControl<any> } = {};
        Object.keys(config).forEach(controlName => {
            controls[ controlName ] = this.createControl(controlName, config[ controlName ]);
        });

        return new QueryParamGroup(controls);
    }

    /**
     * TODO Documentation
     */
    public param(config: QueryParamControlOpts<string>): QueryParamControl<string> {
        return new QueryParamControl({
            serialize: DEFAULT_STRING_SERIALIZER,
            deserialize: DEFAULT_STRING_DESERIALIZER,
            ...config,
        });
    }

    /**
     * TODO Documentation
     */
    public numericParam(config: QueryParamControlOpts<number>): QueryParamControl<number> {
        return new QueryParamControl({
            serialize: DEFAULT_NUMBER_SERIALIZER,
            deserialize: DEFAULT_NUMBER_DESERIALIZER,
            ...config,
        });
    }

    /**
     * TODO Documentation
     */
    public booleanParam(config: QueryParamControlOpts<boolean>): QueryParamControl<boolean> {
        return new QueryParamControl({
            serialize: DEFAULT_BOOLEAN_SERIALIZER,
            deserialize: DEFAULT_BOOLEAN_DESERIALIZER,
            ...config,
        });
    }

    /**
     * TODO Documentation
     */
    public customParam<T>(config: QueryParamControlOpts<T>): QueryParamControl<T> {
        return new QueryParamControl(config);
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

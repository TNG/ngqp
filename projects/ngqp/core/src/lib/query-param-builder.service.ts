import { Injectable } from '@angular/core';
import { QueryParamControl, QueryParamControlOpts, QueryParamGroup } from './model';

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
            controls[ controlName ] = this.createControl(config[ controlName ]);
        });

        return new QueryParamGroup(controls);
    }

    /**
     * TODO Documentation
     */
    public param<T>(config: QueryParamControlOpts<T> = {}): QueryParamControl<T> {
        return new QueryParamControl(config);
    }

    private createControl<T>(controlConfig: QueryParamControl<T> | string): QueryParamControl<T> {
        if (controlConfig instanceof QueryParamControl) {
            return controlConfig;
        }

        return this.param();
    }

}

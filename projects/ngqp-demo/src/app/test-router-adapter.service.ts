import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { RouterAdapter } from '@ngqp/core';

@Injectable()
export class TestRouterAdapter implements RouterAdapter {

    private _queryParamMap = new ReplaySubject<ParamMap>(1);
    public readonly queryParamMap = this._queryParamMap.asObservable();

    public url: string;

    private _params: Params;

    constructor() {
        this.params = {};
        this.emitQueryParamMap();
    }

    public navigate(queryParams: Params): Promise<boolean> {
        const newParams = {
            ...this.params,
            ...queryParams,
        };

        if (JSON.stringify(newParams) === JSON.stringify(this.params)) {
            return Promise.resolve(false);
        }

        this.params = newParams;
        this.emitQueryParamMap();
        return Promise.resolve(true);
    }

    private set params(params: Params) {
        this._params = params;

        const urlSearchParams = new URLSearchParams();
        Object.entries(this.params).forEach(([paramName, value]) => {
            if (value === undefined || value === null) {
                urlSearchParams.delete(paramName);
                return;
            }

            if (Array.isArray(value)) {
                // TODO Support non-string values using JSON.stringify
                value.forEach(item => urlSearchParams.append(paramName, '' + item));
            } else {
                // TODO Support non-string values using JSON.stringify
                urlSearchParams.append(paramName, '' + value);
            }
        });

        this.url = '?' + urlSearchParams.toString();
    }

    private get params(): Params {
        return { ...this._params };
    }

    private emitQueryParamMap(): void {
        this._queryParamMap.next(convertToParamMap(this.params));
    }

}
import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { RouterAdapter, RouterOptions } from '@ngqp/core';

@Injectable()
export class TestRouterAdapter implements RouterAdapter {

    private _queryParamMap = new ReplaySubject<ParamMap>(1);
    public readonly queryParamMap = this._queryParamMap.asObservable();

    public url: string;
    public history: string[] = [];

    private _params: Params;
    private _state: any;
    private _trigger: 'imperative' | 'popstate' | 'hashchange' | null;

    public navigate(queryParams: Params, extras: RouterOptions & { state?: any } = {}): Promise<boolean> {
        this._trigger = this._trigger || 'imperative';
        this._state = extras ? extras.state : null;
        const previousUrl = this.url;

        const newParams = {
            ...this.params,
            ...queryParams,
        };

        this.params = newParams;
        if (previousUrl && extras.replaceUrl !== true) {
            this.history.push(previousUrl);
        }

        this.emitQueryParamMap();
        return Promise.resolve(true)
            .then(() => this._state = null)
            .then(() => this._trigger = null);
    }

    public getCurrentNavigation() {
        return {
            trigger: 'imperative' as 'imperative',
            extras: !this._state ? undefined : { state: this._state },
        };
    }

    public navigateToQueryParamString(value: string) {
        const params: Params = {};

        const searchParams = new URLSearchParams(value);
        const it = (<any>searchParams).keys();
        let current = it.next();
        while (!current.done) {
            const paramName = current.value;
            params[ paramName ] = searchParams.getAll(paramName);
            current = it.next();
        }

        // We need this to not be a "queryParamsHandling: merge" navigation,
        // so we fake this by removing the currently set params first.
        this._params = {};

        // This function is only called from demo code mimicking router behavior
        // such as the initial navigation; make sure this is not treated as an
        // imperative navigation.
        this._trigger = 'popstate';

        return this.navigate(params);
    }

    public goBack(): Promise<boolean> {
        if (this.history.length === 0) {
            return Promise.resolve(false);
        }

        // Get the previous URL
        const previous = this.history.pop();
        const result = this.navigateToQueryParamString(previous);

        // Since this navigation added another state to the history, we
        // have to remove it again
        this.history.pop();

        return result;
    }

    private set params(params: Params) {
        this._params = params;

        const urlSearchParams = new URLSearchParams();
        Object.entries(this.params).forEach(([paramName, value]) => {
            if (value === undefined || value === null) {
                urlSearchParams.delete(paramName);
                return;
            }

            this.appendToSearchParams(urlSearchParams, paramName, value);
        });

        const url = urlSearchParams.toString();
        this.url = url.length !== 0 ? `?${url}` : '';
    }

    private get params(): Params {
        return { ...this._params };
    }

    private emitQueryParamMap(): void {
        this._queryParamMap.next(convertToParamMap(this.params));
    }

    private appendToSearchParams(searchParams: URLSearchParams, name: string, value: any): void {
        if (Array.isArray(value)) {
            value.forEach(item => this.appendToSearchParams(searchParams, name, item));
        } else {
            searchParams.append(name, `${value}`);
        }
    }

}
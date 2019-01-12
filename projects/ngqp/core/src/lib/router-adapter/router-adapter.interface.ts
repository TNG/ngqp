import { InjectionToken } from '@angular/core';
import { ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * Abstraction around the Angular Router used by ngqp in order to read from
 * or manipulate the URL.
 *
 * This abstraction only exists so we can provide a different adapter for the
 * examples on the website.
 *
 * @internal
 */
export interface RouterAdapter {

    /** @internal */
    url: string;

    /** @internal */
    queryParamMap: Observable<ParamMap>;

    /** @internal */
    navigate(queryParams: Params, extras?: RouterOptions): Promise<boolean>;

}

/**
 * Options to be provided when a navigation is started to update the URL.
 * These options are simply forwarded to Router#navigate.
 */
export interface RouterOptions {
    replaceUrl?: boolean;
    preserveFragment?: boolean;
}

/**
 * See {@link RouterOptions}.
 */
export const DefaultRouterOptions: RouterOptions = {
    replaceUrl: true,
    preserveFragment: true,
};

/** @internal */
export const NGQP_ROUTER_ADAPTER = new InjectionToken<RouterAdapter>('NGQP_ROUTER_ADAPTER');

/** Injection token to provide {@link RouterOptions}. */
export const NGQP_ROUTER_OPTIONS = new InjectionToken<RouterOptions>('NGQP_ROUTER_OPTIONS');
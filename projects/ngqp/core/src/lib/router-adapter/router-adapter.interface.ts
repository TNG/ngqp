import { InjectionToken } from '@angular/core';
import { ParamMap, Params } from '@angular/router';
import { Observable } from 'rxjs';

/**
 * TODO Documentation
 */
export interface RouterAdapter {

    /**
     * TODO Documentation
     */
    url: string;

    /**
     * TODO Documentation
     */
    queryParamMap: Observable<ParamMap>;

    /**
     * TODO Documentation
     */
    navigate(queryParams: Params): Promise<boolean>;

}

/**
 * TODO Documentation
 */
export const NGQP_ROUTER_ADAPTER = new InjectionToken<RouterAdapter>('NGQP_ROUTER_ADAPTER');
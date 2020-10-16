import {routes, TParams} from '../constants/routes';

type TRoute = {
    readonly name: string
    readonly path: string
}

export class RouteManager {
    private readonly _routes: Array<TRoute>
    private readonly _baseUrl: string

    constructor(routes: any, baseUrl: string = '/') {
        this._routes = routes;
        this._baseUrl = baseUrl;
    }

    private _getRoute(name: string) {
        return this._routes.find(route => route.name === name);
    }

    path(name: string) {
        return this._getRoute(name)?.path || this._baseUrl;
    }

    href(name: string, params: any) {
        let href = this.path(name);

        Object.keys(params).forEach(key => {
            const param = params[key as any];
            const regexp = new RegExp(`${param === null ? '/' : ''}:${key}[\?]?`, 'ig');

            href = href.replace(regexp, param || '');
        });

        return href;
    }
}

type TNames = typeof routes[number]['name'];

const routeManager = new RouteManager(routes);

export const url = <N extends keyof TParams>(name: TNames, params?: TParams[N]) => {
    return params ? routeManager.href(name, params) : routeManager.path(name);
}
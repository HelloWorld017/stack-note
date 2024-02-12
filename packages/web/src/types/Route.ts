export enum Route {
  STACK = 'stack',
  ARCHIVES = 'archives',
  DETAIL = 'detail',
}

export type RouteParams<T extends Route> = {
  [Route.STACK]: null;
  [Route.ARCHIVES]: null;
  [Route.DETAIL]: { noteId: string };
}[T];

type FilterVoidRoute<T extends Route> = T extends unknown
  ? RouteParams<T> extends null
    ? T
    : never
  : never;

export type VoidRoutes = FilterVoidRoute<Route>;

type MapRouteEntry<T extends Route> = T extends unknown
  ? {
      route: T;
      params: RouteParams<T>;
    }
  : never;

export type RouteEntry = MapRouteEntry<Route>;

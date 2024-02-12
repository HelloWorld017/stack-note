import { createContext, createMemo, createSignal, useContext } from 'solid-js';
import type { Route, RouteEntry, RouteParams, VoidRoutes } from '@/types/Route';
import type { Accessor, JSX } from 'solid-js';

interface PushRoute {
  <T extends VoidRoutes>(route: T): void;
  <T extends Route>(route: T, params: RouteParams<T>): void;
}

type RouteContextType = {
  entry: Accessor<RouteEntry>;
  history: Accessor<RouteEntry[]>;
  pushRoute: PushRoute;
  popRoute: () => void;
};

const RouteContext = createContext<RouteContextType>();
export const RouteProvider = (props: { initialRoute: RouteEntry; children: JSX.Element }) => {
  const [history, setHistory] = createSignal<RouteEntry[]>([props.initialRoute]);
  const entry = createMemo(() => history().at(-1)!);
  const pushRoute = (route: Route, params?: unknown) =>
    setHistory(history => [...history, { route, params } as RouteEntry]);

  const popRoute = () =>
    setHistory(history => {
      const nextHistory = history.slice(0, -1);
      return nextHistory.length <= 0 ? [props.initialRoute] : nextHistory;
    });

  return (
    <RouteContext.Provider value={{ history, entry, pushRoute, popRoute }}>
      {props.children}
    </RouteContext.Provider>
  );
};

export const useRouter = () => {
  const router = useContext(RouteContext);
  if (!router) {
    throw new Error('Could not find ServiceProvider!');
  }

  return router;
};

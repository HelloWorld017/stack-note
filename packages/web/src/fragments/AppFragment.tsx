import '@/features/styleReset';

import { Switch, Match } from 'solid-js';
import { cx } from '@/features/classNames';
import { QueryClientProvider } from '@/features/queryClient';
import { RouteProvider, useRouter } from '@/features/router';
import { ServiceProvider } from '@/features/service';
import { defaultThemeClass } from '@/features/theme';
import { Route } from '@/types/Route';
import * as styles from './AppFragment.css';
import { StackFragment } from './stack/StackFragment';
import type { RouteEntry } from '@/types/Route';

const AppContent = () => {
  const { entry } = useRouter();
  const guardRoute = <const T,>(kind: T) => {
    const currentEntry = entry();
    return currentEntry.route === kind ? (currentEntry as RouteEntry & { route: T }) : null;
  };

  return (
    <Switch>
      <Match when={guardRoute(Route.STACK)}>
        <StackFragment />
      </Match>
    </Switch>
  );
};

export const AppFragment = () => (
  <QueryClientProvider>
    <ServiceProvider>
      <RouteProvider initialRoute={{ route: Route.STACK, params: null }}>
        <div class={cx(styles.appStyle, defaultThemeClass)}>
          <AppContent />
        </div>
      </RouteProvider>
    </ServiceProvider>
  </QueryClientProvider>
);

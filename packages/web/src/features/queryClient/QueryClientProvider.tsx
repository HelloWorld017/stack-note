import {
  QueryClient,
  QueryClientProvider as SolidQueryClientProvider,
} from '@tanstack/solid-query';
import type { JSX } from 'solid-js';

export const QueryClientProvider = (props: { children: JSX.Element }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });

  return <SolidQueryClientProvider client={queryClient}>{props.children}</SolidQueryClientProvider>;
};

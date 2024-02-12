import type { App } from '@stack-note/schema';

type UnionAsyncWithSync<T> = T extends (...args: infer P) => infer R
  ? (...args: P) => R | Awaited<R>
  : T;

export type Service = {
  [K in keyof App]: UnionAsyncWithSync<App[K]>;
};

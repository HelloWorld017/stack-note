declare module 'vite-plugin-solid-svg' {
  import type { PluginOption } from 'vite';

  function svg(options: {
    defaultAsComponent?: boolean;
    svgo?: {
      enabled?: boolean;
      svgoConfig?: Record<string, unknown>;
    };
  }): PluginOption;

  export default svg;
}

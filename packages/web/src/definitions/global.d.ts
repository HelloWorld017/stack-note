import type { App } from '@stack-note/schema';

declare global {
  interface Window {
    bridge?: App;
  }
}

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import svg from 'vite-plugin-solid-svg';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  plugins: [
    solid(),
    svg({
      svgo: {
        svgoConfig: {
          plugins: {
            removeViewBox: false,
          },
        },
      },
    }),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: [{ find: /^@\//, replacement: `${resolve(dirname, './src')}/` }],
  },
});

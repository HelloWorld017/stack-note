import esbuild from 'rollup-plugin-esbuild';

import { defineConfig } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig([
  {
    input: './dist/generated/typescript-declarations/index.d.ts',
    output: [{ file: 'dist/typescript/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      nodeResolve({ extensions: ['.d.ts'] }),
    ],
  },
  {
    input: './dist/generated/typescript/index.ts',
    output: [{ file: 'dist/typescript/index.js', format: 'es' }],
    plugins: [
      esbuild(),
      nodeResolve({ extensions: ['.ts'] }),
    ],
  },
]);

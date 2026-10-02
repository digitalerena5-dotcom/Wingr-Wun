import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    build: {
      outDir: single ? 'dist-single' : 'dist',
      rollupOptions: single
        ? undefined
        : {
            input: {
              main: resolve(__dirname, 'index.html'),
              contact: resolve(__dirname, 'contact/index.html'),
            },
          },
    },
  };
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'MarioCore',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
        'mobx',
        'mobx-react-lite',
        'react-antd-xform',
        'dayjs',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          mobx: 'mobx',
          'mobx-react-lite': 'mobxReactLite',
          'react-antd-xform': 'ReactAntdXform',
          dayjs: 'dayjs',
        },
      },
    },
  },
  server: {
    port: 3456,
    host: true,
  },
});

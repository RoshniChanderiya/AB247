import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { existsSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

const localFileExists = existsSync(path.join(__dirname, '.env.local'));
dotenv.config({
  path: localFileExists ? '.env.local' : '.env',
});

const processKeys = Object.keys(process.env).filter((key) =>
  key.startsWith('REACT_APP_'),
);

const envVariables = {};

processKeys.forEach((key) => {
  envVariables[key] = process.env[key] || '';
});

export default defineConfig({
  define: {
    'process.env': envVariables,
  },
  server: {
    port: 8000,
  },
  build: {
    outDir: path.join(__dirname, 'build'),
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.join(__dirname, 'src'),
      },
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
});

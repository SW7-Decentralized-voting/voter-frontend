/* global process */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
  },
  preview: 'http://localhost:3001',
});

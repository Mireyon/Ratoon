import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['ratoon.remyxia.synology.me']  // Add this line
  },
  resolve: {
    alias: {
      // This will replace `global` with the polyfill
      global: path.resolve(__dirname, 'node_modules/global'),
    },
  },
})

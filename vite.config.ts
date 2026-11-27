/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-vendor',
              test: /[\\/]node_modules[\\/]three[\\/]/,
            },
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            },
            {
              name: 'state-forms-vendor',
              test: /[\\/]node_modules[\\/](@tanstack|zustand|react-hook-form|zod|animejs)[\\/]/,
            },
          ],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})

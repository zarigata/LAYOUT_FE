// CODEX: Vitest config for React Testing Library and jsdom
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable globals to avoid importing describe, it, expect
    environment: 'jsdom', // Required for React DOM testing
    setupFiles: './src/setupTests.js', // Setup file for testing utilities
  },
});

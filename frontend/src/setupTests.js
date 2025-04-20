// CODEX: Global setup file for Jest and React Testing Library
// This file extends Jest with jest-dom matchers for DOM testing assertions
// Adds global error handling for robust test failure reporting (Claude/ChatGPT compatible)

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Global error handler for Jest tests
process.on('unhandledRejection', error => {
  throw error;
});
process.on('uncaughtException', error => {
  throw error;
});


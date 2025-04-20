// CODEX: Jest configuration for React Testing Library and Vite
module.exports = {
  testEnvironment: 'jsdom', // Use jsdom for React DOM testing
  // setupFilesAfterEnv: ['./src/setupTests.js'], // Setup file for testing utilities
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock CSS imports
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest' // Transform JS/JSX files with Babel
  }
};

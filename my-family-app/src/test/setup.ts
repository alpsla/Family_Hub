import { afterEach } from 'vitest';
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// After each test, cleanup any rendered components
afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Convert var to const
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

console.warn = (...args) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalWarn.call(console, ...args);
};
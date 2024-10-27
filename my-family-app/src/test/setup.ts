// src/test/setup.ts
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Extend Vitest's expect method
expect.extend({});

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage and sessionStorage
const storageMock = () => {
  let storage: Record<string, string> = {};
  return {
    getItem: (key: string) => storage[key] || null,
    setItem: (key: string, value: string) => { storage[key] = value.toString(); },
    removeItem: (key: string) => { delete storage[key]; },
    clear: () => { storage = {}; },
  };
};

Object.defineProperty(window, 'localStorage', { value: storageMock() });
Object.defineProperty(window, 'sessionStorage', { value: storageMock() });
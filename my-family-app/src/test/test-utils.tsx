// src/test/test-utils.tsx
import { PropsWithChildren } from 'react';

export function createWrapper() {
  return function Wrapper({ children }: PropsWithChildren<unknown>) {
    return <>{children}</>;
  };
}
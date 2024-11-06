// src/test/TestWrapper.tsx
import { PropsWithChildren } from 'react';

export function TestWrapper({ children }: PropsWithChildren<unknown>) {
  return <>{children}</>;
}
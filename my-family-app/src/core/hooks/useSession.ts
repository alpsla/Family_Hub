// src/core/hooks/useSession.ts
import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import type { SessionContextType } from '../context/sessionTypes.tsx';

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
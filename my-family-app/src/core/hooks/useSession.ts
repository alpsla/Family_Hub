// src/core/hooks/useSession.ts
import { useContext } from 'react';
import { SessionContext } from '../context/session/SessionContext.tsx';
import type { SessionContextType } from '../context/session/sessionTypes.tsx';

export function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
// src/core/context/session/useSession.ts
import { useContext } from 'react';
import { SessionContext } from './SessionStore';
import { SessionData } from './sessionTypes';

export const useSession = (): SessionData => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
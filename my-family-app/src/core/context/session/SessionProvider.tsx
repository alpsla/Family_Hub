// src/core/context/session/SessionProvider.tsx
import { SessionContext } from './SessionContext';
import { SessionProviderProps, SessionData } from './sessionTypes';

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const sessionData: SessionData = {
    isActive: true,
  };

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
};
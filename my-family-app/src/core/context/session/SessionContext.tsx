// src/core/context/session/SessionContext.tsx
import { SessionContext } from './SessionStore';
import { SessionData } from './sessionTypes';

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const sessionData: SessionData = {
    isActive: true
  };

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
};
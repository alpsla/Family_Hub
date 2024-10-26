// src/core/hooks/useSession.ts
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { sessionService } from '../services/sessionService';

export const useSession = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Check session validity every minute
    const interval = setInterval(() => {
      if (!sessionService.isSessionValid()) {
        logout();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [logout]);

  return null;
};
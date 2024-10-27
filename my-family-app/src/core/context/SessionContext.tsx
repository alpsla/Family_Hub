// src/core/context/SessionContext.tsx
import { createContext, useReducer, useEffect } from 'react';
import type { Session, SessionData } from '../types/session';
import { SessionService } from '../services/sessionService';
import { sessionReducer } from './sessionReducer';
import { SessionContextType } from './sessionTypes.tsx';

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sessionReducer, {
    currentSession: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const session = SessionService.getSession();
        if (session && SessionService.isSessionValid()) {
          dispatch({ type: 'SET_SESSION', payload: session });
        } else {
          SessionService.clearSession();
        }
      } catch {
        SessionService.clearSession();
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeSession();
  }, []);

  useEffect(() => {
    if (!state.currentSession) return;

    const checkSession = async () => {
      try {
        const refreshedSession = await SessionService.refreshSession();
        if (refreshedSession) {
          dispatch({ type: 'SET_SESSION', payload: refreshedSession });
        } else {
          dispatch({ type: 'CLEAR_SESSION' });
        }
      } catch {
        dispatch({ type: 'CLEAR_SESSION' });
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [state.currentSession]);

  const login = async (accessToken: string, refreshToken: string, rememberMe: boolean) => {
    try {
      const currentSession = SessionService.getSession();
      const user = currentSession?.user || { id: '', email: '' };
      
      const sessionData: SessionData = {
        token: accessToken,
        refreshToken,
        user,
        rememberMe,
        expiresAt: Date.now() + 3600000 // 1 hour from now
      };

      SessionService.setSession(sessionData);
      const session = SessionService.getSession();
      
      if (session) {
        dispatch({ type: 'SET_SESSION', payload: session });
      }
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create session' });
      throw new Error('Failed to create session');
    }
  };

  const logout = () => {
    SessionService.clearSession();
    dispatch({ type: 'CLEAR_SESSION' });
  };

  const refreshSession = async () => {
    if (!state.currentSession) return;
    
    try {
      const session = await SessionService.refreshSession();
      if (session) {
        dispatch({ type: 'SET_SESSION', payload: session });
      } else {
        dispatch({ type: 'CLEAR_SESSION' });
      }
    } catch {
      dispatch({ type: 'CLEAR_SESSION' });
      throw new Error('Failed to refresh session');
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session: state.currentSession,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
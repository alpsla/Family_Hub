// src/core/context/sessionTypes.ts
import type { Session } from '../types/session';

export interface SessionContextType {
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  login: (accessToken: string, refreshToken: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}
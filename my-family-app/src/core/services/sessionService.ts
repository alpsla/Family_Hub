// src/core/services/sessionService.ts
import { User } from '../types/auth';

interface SessionData {
  token: string;
  user: User;
  expiresAt?: number;
}

export class SessionService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly EXPIRES_KEY = 'session_expires';
  
  // Store session data
  setSession(data: SessionData): void {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
    
    if (data.expiresAt) {
      localStorage.setItem(this.EXPIRES_KEY, data.expiresAt.toString());
    }
  }

  // Get current session
  getSession(): SessionData | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    const expiresAt = localStorage.getItem(this.EXPIRES_KEY);

    if (!token || !userStr) {
      return null;
    }

    return {
      token,
      user: JSON.parse(userStr),
      expiresAt: expiresAt ? parseInt(expiresAt, 10) : undefined
    };
  }

  // Clear session
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRES_KEY);
  }

  // Check if session is valid
  isSessionValid(): boolean {
    const session = this.getSession();
    if (!session) return false;

    if (session.expiresAt) {
      return session.expiresAt > Date.now();
    }

    return true;
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Update user data
  updateUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
}

export const sessionService = new SessionService();
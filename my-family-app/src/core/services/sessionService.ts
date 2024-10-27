// src/core/services/sessionService.ts
import { User } from '../types/auth';
import { Session, SessionData, TokenPayload } from '../types/session';
import { encrypt, decrypt } from '../utils/encryption';

export class SessionService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_KEY = 'user_data';
  private static readonly EXPIRES_KEY = 'session_expires';
  private static readonly REMEMBER_KEY = 'remember_me';
  private static readonly REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  // Store session data
  static setSession(data: SessionData): void {
    try {
      const storage = data.rememberMe ? localStorage : sessionStorage;
      
      storage.setItem(this.TOKEN_KEY, encrypt(data.token));
      storage.setItem(this.REFRESH_TOKEN_KEY, encrypt(data.refreshToken));
      storage.setItem(this.USER_KEY, encrypt(JSON.stringify(data.user)));
      storage.setItem(this.REMEMBER_KEY, String(data.rememberMe));
      
      if (data.expiresAt) {
        storage.setItem(this.EXPIRES_KEY, data.expiresAt.toString());
      }
    } catch {
      this.clearSession();
    }
  }

  // Get current session
  static getSession(): Session | null {
    const storage = localStorage.getItem(this.REMEMBER_KEY) ? localStorage : sessionStorage;
    
    try {
      const token = storage.getItem(this.TOKEN_KEY);
      const refreshToken = storage.getItem(this.REFRESH_TOKEN_KEY);
      const userStr = storage.getItem(this.USER_KEY);
      const expiresAt = storage.getItem(this.EXPIRES_KEY);
      const rememberMe = storage.getItem(this.REMEMBER_KEY) === 'true';

      if (!token || !refreshToken || !userStr || !expiresAt) {
        return null;
      }

      const user = JSON.parse(decrypt(userStr)) as User;
      const decodedToken = this.decodeToken(decrypt(token));

      return {
        id: crypto.randomUUID(),
        userId: user.id,
        accessToken: decrypt(token),
        refreshToken: decrypt(refreshToken),
        expiresAt: parseInt(expiresAt, 10),
        accountType: decodedToken.accountType,
        familyId: user.currentFamilyId || decodedToken.familyId,
        rememberMe,
        user
      };
    } catch {
      this.clearSession();
      return null;
    }
  }

  // Clear session
  static clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRES_KEY);
    localStorage.removeItem(this.REMEMBER_KEY);
    
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.EXPIRES_KEY);
    sessionStorage.removeItem(this.REMEMBER_KEY);
  }

  // Check if session is valid
  static isSessionValid(): boolean {
    const session = this.getSession();
    if (!session) return false;
    
    return session.expiresAt > Date.now();
  }

  // Get auth token
  static getToken(): string | null {
    const storage = localStorage.getItem(this.REMEMBER_KEY) ? localStorage : sessionStorage;
    const encryptedToken = storage.getItem(this.TOKEN_KEY);
    
    if (!encryptedToken) return null;
    
    try {
      return decrypt(encryptedToken);
    } catch {
      this.clearSession();
      return null;
    }
  }

  // Get refresh token
  static getRefreshToken(): string | null {
    const storage = localStorage.getItem(this.REMEMBER_KEY) ? localStorage : sessionStorage;
    const encryptedToken = storage.getItem(this.REFRESH_TOKEN_KEY);
    
    if (!encryptedToken) return null;
    
    try {
      return decrypt(encryptedToken);
    } catch {
      this.clearSession();
      return null;
    }
  }

  static async refreshSession(): Promise<Session | null> {
    try {
      const currentSession = this.getSession();
      if (!currentSession) return null;

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: currentSession.refreshToken
        }),
      });

      if (!response.ok) throw new Error('Failed to refresh session');

      const { accessToken, refreshToken, expiresIn } = await response.json();
      
      const newSessionData: SessionData = {
        token: accessToken,
        refreshToken,
        user: currentSession.user,
        expiresAt: Date.now() + expiresIn * 1000,
        rememberMe: currentSession.rememberMe
      };

      this.setSession(newSessionData);
      return this.getSession();
    } catch {
      this.clearSession();
      return null;
    }
  }

  static updateUser(user: User): void {
    try {
      const session = this.getSession();
      if (!session) return;

      const storage = session.rememberMe ? localStorage : sessionStorage;
      storage.setItem(this.USER_KEY, encrypt(JSON.stringify(user)));
    } catch {
      this.clearSession();
    }
  }

  // Get tokens utility method
  static getTokens(): { accessToken: string | null; refreshToken: string | null } {
    return {
      accessToken: this.getToken(),
      refreshToken: this.getRefreshToken()
    };
  }

  // Decode JWT token
  private static decodeToken(token: string): TokenPayload {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      throw new Error('Invalid token');
    }
  }
}
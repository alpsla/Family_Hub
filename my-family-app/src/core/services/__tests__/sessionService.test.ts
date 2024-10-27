// src/core/services/__tests__/sessionService.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SessionService } from '../sessionService';
import type { SessionData } from '../../types/session';

describe('SessionService', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  const mockSessionData: SessionData = {
    token: 'mock-token',
    refreshToken: 'mock-refresh-token',
    user: {
      id: '1',
      email: 'test@example.com'
    },
    rememberMe: true,
    expiresAt: Date.now() + 3600000
  };

  describe('Session Storage', () => {
    it('should store and retrieve session data correctly', () => {
      SessionService.setSession(mockSessionData);
      const session = SessionService.getSession();
      expect(session?.user.id).toBe('1');
    });

    it('should handle remember me preference', () => {
      // With remember me
      SessionService.setSession(mockSessionData);
      expect(localStorage.getItem('auth_token')).toBeTruthy();

      // Without remember me
      SessionService.setSession({ ...mockSessionData, rememberMe: false });
      expect(sessionStorage.getItem('auth_token')).toBeTruthy();
    });

    it('should clear session data properly', () => {
      SessionService.setSession(mockSessionData);
      SessionService.clearSession();
      expect(SessionService.getSession()).toBeNull();
    });
  });

  describe('Token Management', () => {
    it('should get access token', () => {
      SessionService.setSession(mockSessionData);
      const token = SessionService.getToken();
      expect(token).toBe('mock-token');
    });

    it('should get refresh token', () => {
      SessionService.setSession(mockSessionData);
      const token = SessionService.getRefreshToken();
      expect(token).toBe('mock-refresh-token');
    });
  });

  describe('Session Validation', () => {
    it('should validate session expiration', () => {
      // Valid session
      SessionService.setSession(mockSessionData);
      expect(SessionService.isSessionValid()).toBe(true);

      // Expired session
      SessionService.setSession({
        ...mockSessionData,
        expiresAt: Date.now() - 1000
      });
      expect(SessionService.isSessionValid()).toBe(false);
    });
  });

  describe('Session Refresh', () => {
    it('should refresh session successfully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          accessToken: 'new-token',
          refreshToken: 'new-refresh-token',
          expiresIn: 3600
        })
      });

      SessionService.setSession(mockSessionData);
      const refreshedSession = await SessionService.refreshSession();
      expect(refreshedSession?.accessToken).toBe('new-token');
    });

    it('should handle refresh failure', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Refresh failed'));
      
      SessionService.setSession(mockSessionData);
      const refreshedSession = await SessionService.refreshSession();
      expect(refreshedSession).toBeNull();
      expect(SessionService.getSession()).toBeNull();
    });
  });
});
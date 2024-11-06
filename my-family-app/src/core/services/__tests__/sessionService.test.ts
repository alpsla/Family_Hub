// src/core/services/__tests__/sessionService.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { SessionService } from '../sessionService';

describe('SessionService', () => {
  const mockSessionData = {
    token: 'test-token',
    refreshToken: 'test-refresh-token',
    user: {
      id: '1',
      email: 'test@example.com'
    },
    rememberMe: true,
    expiresAt: Date.now() + 3600000
  };

  beforeEach(() => {
    global.localStorage.clear();
    global.sessionStorage.clear();
  });

  it('should store and retrieve session data', () => {
    // Act
    SessionService.setSession(mockSessionData);
    const session = SessionService.getSession();

    // Assert
    expect(session).not.toBeNull();
    expect(session?.user.id).toBe('1');
  });

  it('should use localStorage when rememberMe is true', () => {
    // Act
    SessionService.setSession(mockSessionData);

    // Verify localStorage was used
    const storedToken = global.localStorage.getItem('auth_token');
    expect(storedToken).not.toBeNull();
    expect(global.sessionStorage.getItem('auth_token')).toBeNull();
  });

  it('should use sessionStorage when rememberMe is false', () => {
    // Act
    SessionService.setSession({
      ...mockSessionData,
      rememberMe: false
    });

    // Verify sessionStorage was used
    expect(global.sessionStorage.getItem('auth_token')).not.toBeNull();
    expect(global.localStorage.getItem('auth_token')).toBeNull();
  });

  it('should clear session data from both storages', () => {
    // Arrange
    SessionService.setSession(mockSessionData);
    
    // Act
    SessionService.clearSession();
    
    // Assert
    expect(global.localStorage.getItem('auth_token')).toBeNull();
    expect(global.sessionStorage.getItem('auth_token')).toBeNull();
    expect(SessionService.getSession()).toBeNull();
  });

  it('should check session validity correctly', () => {
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
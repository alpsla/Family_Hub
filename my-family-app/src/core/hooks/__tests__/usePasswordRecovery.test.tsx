// src/core/hooks/__tests__/usePasswordRecovery.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordRecovery } from '../usePasswordRecovery';
import { PasswordService } from '../../services/auth/passwordService';

// Mock PasswordService
vi.mock('../../services/auth/passwordService', () => ({
  PasswordService: {
    requestPasswordReset: vi.fn().mockResolvedValue({ 
      success: true, 
      message: 'Password reset email sent' 
    }),
    resetPassword: vi.fn().mockResolvedValue({ 
      success: true, 
      message: 'Password reset successful' 
    })
  }
}));

describe('usePasswordRecovery Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => usePasswordRecovery());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);
    expect(result.current.message).toBeNull();
  });

  it('should handle successful password reset request', async () => {
    const { result } = renderHook(() => usePasswordRecovery());

    await act(async () => {
      await result.current.requestReset('test@example.com');
    });

    expect(PasswordService.requestPasswordReset).toHaveBeenCalledWith('test@example.com');
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle error in password reset request', async () => {
    vi.mocked(PasswordService.requestPasswordReset).mockRejectedValueOnce(
      new Error('API Error')
    );

    const { result } = renderHook(() => usePasswordRecovery());

    await act(async () => {
      try {
        await result.current.requestReset('test@example.com');
      } catch {
        // Error expected
      }
    });

    expect(result.current.error).toBe('Failed to request password reset. Please try again.');
    expect(result.current.success).toBe(false);
  });

  it('should handle loading state', async () => {
    const { result } = renderHook(() => usePasswordRecovery());

    let promise: Promise<void>;
    await act(async () => {
      promise = result.current.requestReset('test@example.com');
      expect(result.current.isLoading).toBe(true);
      await promise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
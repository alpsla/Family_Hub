// src/core/hooks/__tests__/usePasswordRecovery.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePasswordRecovery } from '../usePasswordRecovery';

describe('usePasswordRecovery', () => {
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

    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.message).toBeDefined();
  });

  it('should handle successful password reset', async () => {
    const { result } = renderHook(() => usePasswordRecovery());

    await act(async () => {
      await result.current.resetPassword('valid-token', 'newPassword123!');
    });

    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.message).toBeDefined();
  });

  it('should manage loading state during operations', async () => {
    const { result } = renderHook(() => usePasswordRecovery());

    await act(async () => {
      const resetPromise = result.current.requestReset('test@example.com');
      expect(result.current.isLoading).toBe(true);
      await resetPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
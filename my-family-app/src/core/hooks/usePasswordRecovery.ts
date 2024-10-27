// src/core/hooks/usePasswordRecovery.ts
import { useState } from 'react';
import { PasswordService } from '../services/auth/passwordService';

interface PasswordRecoveryState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

export const usePasswordRecovery = () => {
  const [state, setState] = useState<PasswordRecoveryState>({
    isLoading: false,
    error: null,
    success: false,
    message: null
  });

  const requestReset = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, success: false, message: null }));

    try {
      const response = await PasswordService.requestPasswordReset(email);
      setState(prev => ({
        ...prev,
        success: response.success,
        message: response.message || 'Password reset email sent'
      }));
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to request password reset. Please try again.'
      }));
      throw new Error('Failed to request password reset');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null, success: false, message: null }));

    try {
      const response = await PasswordService.resetPassword(token, newPassword);
      setState(prev => ({
        ...prev,
        success: response.success,
        message: response.message || 'Password reset successful'
      }));
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to reset password. Please try again.'
      }));
      throw new Error('Failed to reset password');
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    requestReset,
    resetPassword
  };
};

export type UsePasswordRecoveryReturn = ReturnType<typeof usePasswordRecovery>;
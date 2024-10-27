// src/core/services/auth/__tests__/passwordService.test.ts
import { describe, it, expect, vi } from 'vitest';
import { PasswordService } from '../passwordService';

describe('PasswordService', () => {
  describe('requestPasswordReset', () => {
    it('should successfully request password reset', async () => {
      const response = await PasswordService.requestPasswordReset('test@example.com');
      expect(response.success).toBe(true);
      expect(response.message).toBeDefined();
    });

    it('should include email in success message', async () => {
      const email = 'test@example.com';
      console.log = vi.fn();
      await PasswordService.requestPasswordReset(email);
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(email));
    });
  });

  describe('resetPassword', () => {
    it('should successfully reset password', async () => {
      const response = await PasswordService.resetPassword('valid-token', 'newPassword123!');
      expect(response.success).toBe(true);
      expect(response.message).toBeDefined();
    });

    it('should include token in success message', async () => {
      const token = 'valid-token';
      console.log = vi.fn();
      await PasswordService.resetPassword(token, 'newPassword123!');
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining(token));
    });
  });
});
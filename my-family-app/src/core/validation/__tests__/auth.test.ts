// src/core/validation/__tests__/auth.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword, PASSWORD_REQUIREMENTS } from '../auth';

describe('Auth Validation', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      const errors = validateEmail('');
      expect(errors).toContain('Email is required');
    });

    it('should return error for invalid email format', () => {
      const errors = validateEmail('invalid-email');
      expect(errors).toContain('Please enter a valid email address');
    });

    it('should return no errors for valid email', () => {
      const errors = validateEmail('test@example.com');
      expect(errors).toHaveLength(0);
    });
  });

  describe('validatePassword', () => {
    it('should check minimum length requirement', () => {
      const errors = validatePassword('short');
      expect(errors).toContain(
        `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`
      );
    });

    it('should check for number requirement', () => {
      const errors = validatePassword('Password!');
      expect(errors).toContain('Password must contain at least one number');
    });

    it('should check for uppercase requirement', () => {
      const errors = validatePassword('password123!');
      expect(errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should check for lowercase requirement', () => {
      const errors = validatePassword('PASSWORD123!');
      expect(errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should check for special character requirement', () => {
      const errors = validatePassword('Password123');
      expect(errors).toContain('Password must contain at least one special character (!@#$%^&*)');
    });

    it('should return no errors for valid password', () => {
      const errors = validatePassword('Password123!');
      expect(errors).toHaveLength(0);
    });
  });
});
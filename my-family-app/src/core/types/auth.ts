// src/core/types/auth.ts
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ValidationError {
  email?: string[];
  password?: string[];
}

// src/core/validation/auth.ts
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireNumbers: true,
  requireUppercase: true,
  requireLowercase: true,
  requireSpecialChars: true,
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
  }

  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return errors;
};

export const validateEmail = (email: string): string[] => {
  const errors: string[] = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return errors;
};

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ValidationError {
  email?: string[];
  password?: string[];
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: FamilyRole;
  currentFamilyId?: string;
}

export interface FamilyMember {
  id: string;
  firstName: string;
  lastName?: string;
  role: FamilyRole;
  dateOfBirth?: string;
  // Add any other relevant member properties
}

export interface Family {
  id: string;
  name: string;
  members: FamilyMember[];
  // Add any other relevant family properties
}

export type FamilyRole = 'parent' | 'child' | 'guardian' | 'caregiver';


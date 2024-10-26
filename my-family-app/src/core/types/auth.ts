// src/core/types/auth.ts
import { Family } from './family';  // Add this import

export type AccountType = 'family' | 'personal';
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  accountType: AccountType;
  hasPersonalAccount: boolean;
  dateOfBirth: Date;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  region?: string;
}

export interface AuthContextType {
  user: User | null;
  family: Family | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  switchAccount: (accountType: AccountType) => Promise<void>;
}
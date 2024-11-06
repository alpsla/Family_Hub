// src/core/hooks/useAuth.ts
import { useContext, createContext } from 'react';

interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, type AuthContextType };
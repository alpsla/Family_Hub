// my-family-app/src/core/context/auth/authTypes.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
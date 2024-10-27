// src/core/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from './SessionContext';
import { LoginCredentials } from '../types/auth';

interface AuthContextType {
  // ... your existing auth context types
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { login: sessionLogin, logout: sessionLogout, session } = useSession();
  
  const login = async (credentials: LoginCredentials) => {
    try {
      // Your existing API call to get tokens
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const { accessToken, refreshToken } = await response.json();
      
      // Use session management to handle the tokens
      await sessionLogin(accessToken, refreshToken, credentials.rememberMe);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Your existing logout logic
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });
    } finally {
      sessionLogout();
    }
  };

  // Your existing auth context code...

  return (
    <AuthContext.Provider
      value={{
        // ... your existing auth context values
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
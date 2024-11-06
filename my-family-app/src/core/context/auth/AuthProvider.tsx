// my-family-app/src/core/context/auth/AuthProvider.tsx
import React, { useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { User, AuthContextType, LoginCredentials } from './authTypes';
import { mockUsers } from '../../../mocks/users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  // Debug state changes
  React.useEffect(() => {
    console.log('AuthProvider state updated:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const login = useCallback(async (creds: LoginCredentials): Promise<void> => {
    try {
      console.log('Login attempt:', creds);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const foundUser = mockUsers.find(u => 
        u.email === creds.email && u.password === creds.password
      );

      console.log('Found user:', foundUser);

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Create user data without password
      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName
      };

      console.log('Setting user data:', userData);
      setUser(userData);

    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    console.log('Logging out');
    setUser(null);
  }, []);

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    signup: async () => {} // Placeholder for now
  };

  // Debug render
  console.log('AuthProvider render:', { user, isAuthenticated });

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
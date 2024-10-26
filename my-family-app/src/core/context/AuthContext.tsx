// src/core/context/AuthContext.tsx
import { createContext, useState, useEffect } from 'react';
import { User, LoginCredentials, SignupData, AccountType, AuthContextType } from '../types/auth';
import { Family } from '../types/family';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [family, setFamily] = useState<Family | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // In real app, validate token with backend
      const userData = JSON.parse(localStorage.getItem('user_data') || 'null');
      const familyData = JSON.parse(localStorage.getItem('family_data') || 'null');

      if (userData && familyData) {
        setUser(userData);
        setFamily(familyData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Authentication check failed');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // In real app, make API call to login
      // For development, simulate login
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        accountType: 'family',
        hasPersonalAccount: false,
        dateOfBirth: new Date('1990-01-01'),
        region: 'US',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockFamily: Family = {
        id: '1',
        name: 'Doe Family',
        ownerId: '1',
        members: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            dateOfBirth: new Date('1990-01-01'),
            role: 'parent',
            email: credentials.email
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Save to localStorage
      localStorage.setItem('auth_token', 'mock_token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('family_data', JSON.stringify(mockFamily));

      setUser(mockUser);
      setFamily(mockFamily);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Clear all auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('family_data');

      setUser(null);
      setFamily(null);
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // In real app, make API call to register
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'admin',
        accountType: 'family',
        hasPersonalAccount: false,
        dateOfBirth: new Date(data.dateOfBirth),
        region: data.region || 'US',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const mockFamily: Family = {
        id: Date.now().toString(),
        name: `${data.lastName} Family`,
        ownerId: mockUser.id,
        members: [
          {
            id: mockUser.id,
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: new Date(data.dateOfBirth),
            role: 'parent',
            email: data.email
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      localStorage.setItem('auth_token', 'mock_token');
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      localStorage.setItem('family_data', JSON.stringify(mockFamily));

      setUser(mockUser);
      setFamily(mockFamily);
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const switchAccount = async (accountType: AccountType): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) throw new Error('No user logged in');

      const updatedUser: User = {
        ...user,
        accountType,
        hasPersonalAccount: true
      };

      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Account switch failed:', error);
      setError('Failed to switch account');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        family,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        signup,
        switchAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
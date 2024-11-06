// my-family-app/src/core/context/auth/AuthContext.tsx
import React from 'react';
import { AuthContextType } from './authTypes';

export const AuthContext = React.createContext<AuthContextType | null>(null);
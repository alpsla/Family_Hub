// src/core/context/sessionTypes.ts
import { ReactNode } from 'react';

export interface SessionData {
  isActive: boolean;
}

export interface SessionProviderProps {
  children: ReactNode;
}
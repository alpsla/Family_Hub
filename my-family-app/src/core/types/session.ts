// src/core/types/session.ts
import { User } from './auth';

export interface Session {
    id: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    accountType: 'personal' | 'family';
    familyId?: string;
    rememberMe: boolean;
    user: User;
}

export interface SessionState {
    currentSession: Session | null;
    isLoading: boolean;
    error: string | null;
}

export interface TokenPayload {
    userId: string;
    accountType: 'personal' | 'family';
    familyId?: string;
    exp: number;
}

export interface SessionData {
    token: string;
    refreshToken: string;
    user: User;
    expiresAt?: number;
    rememberMe: boolean;
}
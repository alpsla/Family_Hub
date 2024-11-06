import { createContext } from 'react';
import { SessionData } from './sessionTypes';

export const SessionContext = createContext<SessionData | undefined>(undefined);
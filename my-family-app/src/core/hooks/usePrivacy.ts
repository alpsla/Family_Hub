// src/core/hooks/usePrivacy.ts
import { useContext } from 'react';
import { PrivacyContext } from '../context/PrivacyContext';

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};
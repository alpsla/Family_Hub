// src/core/context/PrivacyContext.tsx
import { createContext, useState, useEffect } from 'react';
import { privacyService } from '../services/privacy/PrivacyService';
import type { PrivacySettings, ConsentRecord } from '../services/privacy/types';

interface PrivacyContextType {
  settings: PrivacySettings;
  updateConsent: (type: ConsentRecord['type'], granted: boolean) => void;
  checkConsent: (type: ConsentRecord['type']) => boolean;
  needsConsent: (type: ConsentRecord['type']) => boolean;
  isLoading: boolean;
}

export const PrivacyContext = createContext<PrivacyContextType | null>(null);

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<PrivacySettings>(() => privacyService.getSettings());

  useEffect(() => {
    const initializeRegion = async () => {
      try {
        await privacyService.detectAndUpdateRegion();
        setSettings(privacyService.getSettings());
      } catch (error) {
        console.error('Failed to initialize region:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void initializeRegion();
  }, []);

  const updateConsent = (type: ConsentRecord['type'], granted: boolean) => {
    privacyService.updateConsent(type, granted);
    setSettings(privacyService.getSettings());
  };

  return (
    <PrivacyContext.Provider
      value={{
        settings,
        updateConsent,
        checkConsent: privacyService.checkConsent.bind(privacyService),
        needsConsent: privacyService.needsConsent.bind(privacyService),
        isLoading
      }}
    >
      {children}
    </PrivacyContext.Provider>
  );
};
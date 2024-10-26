// src/core/services/privacy/types.ts
export type Region = 'EU' | 'CA-US' | 'OTHER-US' | 'OTHER';

export interface PrivacySettings {
  cookiesAccepted: boolean;
  analyticsEnabled: boolean;
  marketingEnabled: boolean;
  functionalEnabled: boolean;
  region: Region;
}

export interface ConsentRecord {
  type: 'cookies' | 'marketing' | 'analytics' | 'functional';
  granted: boolean;
  timestamp: number;
  expires?: number;
}

export interface PrivacyConfig {
  region: Region;
  requirements: {
    cookieConsent: boolean;
    privacyPolicy: boolean;
    dataRetention: number; // in days
    dataDeletion: boolean;
  };
}
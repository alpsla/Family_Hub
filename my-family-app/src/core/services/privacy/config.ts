// src/core/services/privacy/config.ts
import { Region, PrivacyConfig } from './types';

export const privacyConfigs: Record<Region, PrivacyConfig> = {
  'EU': {
    region: 'EU',
    requirements: {
      cookieConsent: true,
      privacyPolicy: true,
      dataRetention: 365, // 1 year
      dataDeletion: true
    }
  },
  'CA-US': {
    region: 'CA-US',
    requirements: {
      cookieConsent: true,
      privacyPolicy: true,
      dataRetention: 730, // 2 years
      dataDeletion: true
    }
  },
  'OTHER-US': {
    region: 'OTHER-US',
    requirements: {
      cookieConsent: false,
      privacyPolicy: true,
      dataRetention: 730,
      dataDeletion: false
    }
  },
  'OTHER': {
    region: 'OTHER',
    requirements: {
      cookieConsent: false,
      privacyPolicy: true,
      dataRetention: 730,
      dataDeletion: false
    }
  }
};
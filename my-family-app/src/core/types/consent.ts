// src/core/types/consent.ts
export interface ConsentStatus {
    memberId: string;
    hasConsented: boolean;
    timestamp: number;
    type: 'primary' | 'individual';
    scope: 'full' | 'limited';
    parentalConsent?: boolean;  // For members under age
    consentVersion: string;     // To track privacy policy updates
  }
  
  export interface FamilyConsentRecord {
    familyId: string;
    primaryConsent?: ConsentStatus;  // Main account holder's consent
    memberConsents: Record<string, ConsentStatus>;
    lastUpdated: number;
  }
  
  export interface ConsentRequirement {
    requiresParentalConsent: boolean;
    minimumAge: number;
    scope: 'full' | 'limited';
  }
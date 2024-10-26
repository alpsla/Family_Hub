// src/core/services/privacy/ConsentManagementService.ts
import { ConsentStatus, FamilyConsentRecord, ConsentRequirement } from '../../types/consent';
import { User } from '../../types/auth';
import { FamilyMember } from '../../types/family';

export class ConsentManagementService {
  private readonly CONSENT_STORAGE_KEY = 'family_consent_records';
  private readonly CURRENT_CONSENT_VERSION = '1.0.0';

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  private getConsentRequirement(member: FamilyMember): ConsentRequirement {
    const age = this.calculateAge(member.dateOfBirth);
    return {
      requiresParentalConsent: age < 18,
      minimumAge: 13, // COPPA compliance
      scope: age < 16 ? 'limited' : 'full' // GDPR age consideration
    };
  }

  private getStoredConsents(): Record<string, FamilyConsentRecord> {
    try {
      const stored = localStorage.getItem(this.CONSENT_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to load consent records:', error);
      return {};
    }
  }

  private saveConsents(consents: Record<string, FamilyConsentRecord>): void {
    try {
      localStorage.setItem(this.CONSENT_STORAGE_KEY, JSON.stringify(consents));
    } catch (error) {
      console.error('Failed to save consent records:', error);
    }
  }

  public needsConsent(
    user: User,
    familyMember: FamilyMember,
    familyId: string
  ): boolean {
    const consents = this.getStoredConsents();
    const familyConsent = consents[familyId];

    if (!familyConsent) {
      return true;
    }

    const memberConsent = familyConsent.memberConsents[familyMember.id];
    if (!memberConsent) {
      return true;
    }

    // Check if consent is for current version of privacy policy
    if (memberConsent.consentVersion !== this.CURRENT_CONSENT_VERSION) {
      return true;
    }

    const requirement = this.getConsentRequirement(familyMember);
    
    // If parental consent is required but not given
    if (requirement.requiresParentalConsent && !memberConsent.parentalConsent) {
      return true;
    }

    return false;
  }

  public recordConsent(
    currentUser: User,
    familyMember: FamilyMember,
    familyId: string,
    parentalConsent?: boolean
  ): void {
    const consents = this.getStoredConsents();
    const requirement = this.getConsentRequirement(familyMember);

    const consentStatus: ConsentStatus = {
      memberId: familyMember.id,
      hasConsented: true,
      timestamp: Date.now(),
      type: currentUser.id === familyMember.id ? 'primary' : 'individual',
      scope: requirement.scope,
      parentalConsent,
      consentVersion: this.CURRENT_CONSENT_VERSION
    };

    if (!consents[familyId]) {
      consents[familyId] = {
        familyId,
        memberConsents: {},
        lastUpdated: Date.now()
      };
    }

    // If this is the primary account holder
    if (user.id === familyMember.id) {
      consents[familyId].primaryConsent = consentStatus;
    }

    consents[familyId].memberConsents[familyMember.id] = consentStatus;
    consents[familyId].lastUpdated = Date.now();

    this.saveConsents(consents);
  }

  public getConsentRecord(familyId: string, memberId: string): ConsentStatus | null {
    const consents = this.getStoredConsents();
    return consents[familyId]?.memberConsents[memberId] || null;
  }
}

export const consentManager = new ConsentManagementService();
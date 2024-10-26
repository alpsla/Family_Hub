// src/core/types/accounts.ts
export type AccountType = 'family' | 'personal' | 'professional';

export interface BaseAccount {
  id: string;
  email: string;
  accountType: AccountType;
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyAccount extends BaseAccount {
  accountType: 'family';
  familyId: string;
  plan: 'free' | 'premium' | 'enterprise';
  sharedWith: string[]; // List of family member IDs who can use this account
}

export interface PersonalAccount extends BaseAccount {
  accountType: 'personal';
  familyId: string;
  familyMemberId: string; // Reference to family member
  linkedToFamilyAccount: string; // Reference to family account
  privateContentEnabled: boolean;
}

// Manage account relationships
export interface AccountRelationship {
  familyAccountId: string;
  personalAccountId: string;
  familyMemberId: string;
  permissions: {
    canViewSharedContent: boolean;
    canManageSharedContent: boolean;
    hasPrivateAccess: boolean;
  };
}
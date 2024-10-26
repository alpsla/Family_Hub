// src/core/types/permissions.ts
export type AccessLevel = 'public' | 'family' | 'private' | 'age-restricted';

export type ContentCategory = 
  | 'calendar'
  | 'health'
  | 'documents'
  | 'financial'
  | 'personal'
  | 'sensitive';

export interface AgeRestriction {
  minimumAge: number;
  maximumAge?: number;
  parentalOverride?: boolean;
}

export interface PrivacySettings {
  accessLevel: AccessLevel;
  visibleTo?: string[];  // Array of member IDs
  hiddenFrom?: string[]; // Array of member IDs
  ageRestrictions?: AgeRestriction;
  requiresAuthentication: boolean;
  customPassword?: boolean;  // For additional security layer
}

export interface ContentPermissions {
  id: string;
  category: ContentCategory;
  ownerId: string;        // Creator of the content
  privacy: PrivacySettings;
  createdAt: Date;
  updatedAt: Date;
}
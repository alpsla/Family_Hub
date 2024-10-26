// src/core/types/family.ts
export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  role: 'parent' | 'child' | 'guardian' | 'other';
  email?: string;
  accountId?: string;
}

export interface Family {
  id: string;
  name: string;
  members: FamilyMember[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
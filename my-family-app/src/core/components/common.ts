// src/core/types/common.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member' | 'guest';
  }
  
  export interface FamilyMember {
    id: string;
    name: string;
    relationship: string;
    birthDate: Date;
    healthInfo?: {
      allergies: string[];
      medications: string[];
      conditions: string[];
    };
  }
  
  export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    participants: string[];
    location?: string;
    type: 'family' | 'health' | 'school' | 'work' | 'other';
  }
  
  export interface HealthRecord {
    id: string;
    memberId: string;
    type: 'appointment' | 'medication' | 'condition' | 'note';
    date: Date;
    description: string;
    status: 'active' | 'completed' | 'cancelled';
  }
  
  export interface AppError {
    code: string;
    message: string;
    details?: unknown;
  }
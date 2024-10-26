// src/core/services/permissionService.ts
import { 
    AccessLevel, 
    ContentPermissions,
    AgeRestriction,
    PrivacySettings,
    ContentCategory 
  } from '../types/permissions';
  import { User } from '../types/auth';
  import { FamilyMember } from '../types/family';
  
  
  export class PermissionService {
    // Create privacy settings
    static createPrivacySettings(
      accessLevel: AccessLevel,
      options?: Partial<PrivacySettings>
    ): PrivacySettings {
      return {
        accessLevel,
        requiresAuthentication: accessLevel !== 'public',
        ...options
      };
    }
  
    // Check if user has access to content
    static async canAccess(
      user: User | null,
      member: FamilyMember,
      content: ContentPermissions
    ): Promise<boolean> {
      const privacy = content.privacy as PrivacySettings;
  
      // If content is public, allow access
      if (privacy.accessLevel === 'public') {
        return true;
      }
  
      // If content requires authentication and user is not logged in
      if (privacy.requiresAuthentication && !user) {
        return false;
      }
  
      // Check age restrictions if they exist
      if (privacy.ageRestrictions) {
        const hasAgeAccess = this.checkAgeRestrictions(
          member,
          privacy.ageRestrictions
        );
        if (!hasAgeAccess) return false;
      }
  
      // Check specific visibility settings
      if (privacy.visibleTo?.length) {
        return privacy.visibleTo.includes(member.id);
      }
  
      // Check if explicitly hidden from this member
      if (privacy.hiddenFrom?.length) {
        return !privacy.hiddenFrom.includes(member.id);
      }
  
      // Check ownership
      if (content.ownerId === user?.id) {
        return true;
      }
  
      return privacy.accessLevel === 'family';
    }
  
    // Create default permissions for content with privacy settings
    static createDefaultPermissions(
      category: ContentCategory,
      ownerId: string,
      privacyOptions?: Partial<PrivacySettings>
    ): ContentPermissions {
      return {
        id: crypto.randomUUID(),
        category,
        ownerId,
        privacy: this.createPrivacySettings(
          privacyOptions?.accessLevel || 'family',
          privacyOptions
        ),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  
    // Other methods remain the same...
    private static checkAgeRestrictions(
      member: FamilyMember,
      restrictions: AgeRestriction
    ): boolean {
      const age = this.calculateAge(member.dateOfBirth);
      
      if (age < restrictions.minimumAge) {
        return false;
      }
  
      if (restrictions.maximumAge && age > restrictions.maximumAge) {
        return false;
      }
  
      return true;
    }
  
    private static calculateAge(birthDate: Date): number {
      const today = new Date();
      const birth = new Date(birthDate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      
      return age;
    }
  }
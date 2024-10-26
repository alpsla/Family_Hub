// src/core/services/privacy/PrivacyService.ts
import { PrivacySettings, ConsentRecord } from './types';
import { regionDetection } from './regionDetection';

export class PrivacyService {
  private settings: PrivacySettings;
  private readonly SETTINGS_KEY = 'privacy_settings';

  constructor() {
    this.settings = this.loadSettings();
    // Initialize region detection
    void this.initializeRegion();
  }

  private async initializeRegion(): Promise<void> {
    try {
      const detectedRegion = await regionDetection.detectRegion();
      if (detectedRegion !== this.settings.region) {
        this.setRegion(detectedRegion);
      }
    } catch (error) {
      console.error('Failed to initialize region:', error);
      // Use fallback if detection fails
      const fallbackRegion = regionDetection.getFallbackRegion();
      if (fallbackRegion !== this.settings.region) {
        this.setRegion(fallbackRegion);
      }
    }
  }

  private loadSettings(): PrivacySettings {
    try {
      const stored = localStorage.getItem(this.SETTINGS_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
    }
    
    return {
      cookiesAccepted: false,
      analyticsEnabled: false,
      marketingEnabled: false,
      functionalEnabled: false,
      region: regionDetection.getFallbackRegion() // Use fallback initially
    };
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(this.settings));
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    }
  }

  public updateConsent(type: ConsentRecord['type'], granted: boolean): void {
    try {
      switch (type) {
        case 'cookies':
          this.settings.cookiesAccepted = granted;
          break;
        case 'analytics':
          this.settings.analyticsEnabled = granted;
          break;
        case 'marketing':
          this.settings.marketingEnabled = granted;
          break;
        case 'functional':
          this.settings.functionalEnabled = granted;
          break;
      }
      this.saveSettings();
    } catch (error) {
      console.error('Failed to update consent:', error);
      throw new Error('Failed to update privacy consent');
    }
  }

  public checkConsent(type: ConsentRecord['type']): boolean {
    try {
      switch (type) {
        case 'cookies':
          return this.settings.cookiesAccepted;
        case 'analytics':
          return this.settings.analyticsEnabled;
        case 'marketing':
          return this.settings.marketingEnabled;
        case 'functional':
          return this.settings.functionalEnabled;
        default:
          return false;
      }
    } catch (error) {
      console.error('Failed to check consent status:', error);
      return false;
    }
  }

  public needsConsent(type: ConsentRecord['type']): boolean {
    try {
      if (type === 'functional') {
        return false; // Functional cookies are usually exempt
      }
      return !this.checkConsent(type);
    } catch (error) {
      console.error('Failed to check consent requirements:', error);
      return true; // Safer to require consent if there's an error
    }
  }

  private setRegion(region: PrivacySettings['region']): void {
    try {
      this.settings.region = region;
      this.saveSettings();
    } catch (error) {
      console.error('Failed to set region:', error);
      throw new Error('Failed to update region');
    }
  }

  public getRegion(): PrivacySettings['region'] {
    return this.settings.region;
  }

  public getSettings(): PrivacySettings {
    return { ...this.settings };
  }

  public async detectAndUpdateRegion(): Promise<void> {
    try {
      const detectedRegion = await regionDetection.detectRegion();
      this.setRegion(detectedRegion);
    } catch (error) {
      console.error('Failed to detect and update region:', error);
      const fallbackRegion = regionDetection.getFallbackRegion();
      this.setRegion(fallbackRegion);
    }
  }
}

export const privacyService = new PrivacyService();
// src/core/services/privacy/regionDetection.ts
import { Region } from './types';

interface GeolocationResponse {
  country_code?: string;
  region_code?: string;
  timezone?: string;
}

export class RegionDetectionService {
  private async getGeolocation(): Promise<GeolocationResponse> {
    try {
      // In a real application, you would:
      // 1. Use a geolocation service API (like MaxMind, IPStack, etc.)
      // 2. Consider using the browser's Geolocation API with user permission
      // 3. Possibly use user's explicit selection/preference
      
      // For development, we'll use a mock API call
      const response = await fetch('https://api.ipstack.com/check?access_key=YOUR_API_KEY');
      return await response.json();
    } catch (error) {
      console.error('Failed to detect location:', error);
      return {};
    }
  }

  public async detectRegion(): Promise<Region> {
    try {
      const geoData = await this.getGeolocation();
      
      // Check for EU countries
      const euCountries = [
        'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
        'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
        'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
      ];
      
      if (euCountries.includes(geoData.country_code || '')) {
        return 'EU';
      }

      // Check for California specifically
      if (geoData.country_code === 'US' && geoData.region_code === 'CA') {
        return 'CA-US';
      }

      // Check for other US states
      if (geoData.country_code === 'US') {
        return 'OTHER-US';
      }

      // Default to OTHER for all other locations
      return 'OTHER';

    } catch (error) {
      console.error('Region detection failed:', error);
      return 'OTHER'; // Default to most restrictive if detection fails
    }
  }

  public getFallbackRegion(): Region {
    // Fallback detection based on browser settings
    // This is less accurate but can be used when geolocation fails
    try {
      const language = navigator.language.toLowerCase();
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Check for EU based on language
      const euLanguages = ['de', 'fr', 'es', 'it', 'nl', 'pt', 'pl'];
      if (euLanguages.some(lang => language.startsWith(lang))) {
        return 'EU';
      }
      
      // Check for US based on timezone
      if (timeZone.startsWith('America/')) {
        // Note: This is a very rough approximation
        return 'OTHER-US';
      }
      
    } catch (error) {
      console.error('Fallback region detection failed:', error);
    }
    
    return 'OTHER';
  }
}

export const regionDetection = new RegionDetectionService();
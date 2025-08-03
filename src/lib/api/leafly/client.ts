import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config';

/**
 * Leafly API Client
 * 
 * This client handles communication with the Leafly API for product data,
 * menu synchronization, and other Leafly-related operations.
 */
export class LeaflyClient {
  private client: AxiosInstance;
  private apiKey: string;
  private appId: string;

  constructor() {
    this.apiKey = API_CONFIG.leafly.apiKey;
    this.appId = API_CONFIG.leafly.apiId;
    
    this.client = axios.create({
      baseURL: API_CONFIG.leafly.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'app_key': this.apiKey,
        'app_id': this.appId
      }
    });
  }

  /**
   * Search for strains with specific properties
   * @param options Search options
   * @returns List of strains matching the search criteria
   */
  async searchStrains(options: {
    page: number;
    take: number;
    search?: string;
    sort?: 'rating' | 'alpha' | 'newest' | 'popular';
    filters?: {
      flavors?: string[];
      category?: string[];
      exclude?: string[];
      conditions?: string[];
      tags?: string[];
      symptoms?: string[];
    }
  }) {
    try {
      const response = await this.client.post('/strains', options);
      return response.data;
    } catch (error) {
      console.error('Error searching strains:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific strain
   * @param strainName Name of the strain
   * @returns Detailed strain information
   */
  async getStrain(strainName: string) {
    try {
      const response = await this.client.get(`/strains/${encodeURIComponent(strainName)}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting strain ${strainName}:`, error);
      throw error;
    }
  }

  /**
   * Find dispensaries and retail locations that have the strain on their menu
   * @param strainName Name of the strain
   * @param options Search options
   * @returns List of locations with the strain available
   */
  async getStrainAvailability(strainName: string, options: {
    lat: number;
    lon: number;
    radius?: number;
    filter?: 'flower' | 'clone' | 'preroll' | 'seeds' | 'edible' | 'concentrate' | 'other';
  }) {
    try {
      const response = await this.client.get(`/strains/${encodeURIComponent(strainName)}/availability`, {
        params: options
      });
      return response.data;
    } catch (error) {
      console.error(`Error getting availability for strain ${strainName}:`, error);
      throw error;
    }
  }

  /**
   * Search for dispensaries, deliveries, and retail stores
   * @param options Search options
   * @returns List of locations matching the search criteria
   */
  async searchLocations(options: {
    page: number;
    take: number;
    latitude: number;
    longitude: number;
    storefront?: boolean;
    delivery?: boolean;
    retail?: boolean;
    medical?: boolean;
    creditcards?: boolean;
    hasclones?: boolean;
    hasconcentrates?: boolean;
    hasedibles?: boolean;
    veterandiscount?: boolean;
    strainIds?: string;
  }) {
    try {
      const response = await this.client.post('/locations', options);
      return response.data;
    } catch (error) {
      console.error('Error searching locations:', error);
      throw error;
    }
  }

  /**
   * Get information about a specific dispensary or retail location
   * @param locationName Name of the location
   * @returns Location details
   */
  async getLocation(locationName: string) {
    try {
      const response = await this.client.get(`/locations/${encodeURIComponent(locationName)}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting location ${locationName}:`, error);
      throw error;
    }
  }

  /**
   * Get the menu of a specific location
   * @param locationName Name of the location
   * @returns Menu items for the location
   */
  async getLocationMenu(locationName: string) {
    try {
      const response = await this.client.get(`/locations/${encodeURIComponent(locationName)}/menu`);
      return response.data;
    } catch (error) {
      console.error(`Error getting menu for location ${locationName}:`, error);
      throw error;
    }
  }

  /**
   * Get specials for a specific location
   * @param locationName Name of the location
   * @returns List of specials for the location
   */
  async getLocationSpecials(locationName: string) {
    try {
      const response = await this.client.get(`/locations/${encodeURIComponent(locationName)}/specials`);
      return response.data;
    } catch (error) {
      console.error(`Error getting specials for location ${locationName}:`, error);
      throw error;
    }
  }
}

// Export a singleton instance
export const leaflyClient = new LeaflyClient();
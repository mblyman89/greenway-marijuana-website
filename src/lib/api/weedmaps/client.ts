import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config';

/**
 * Weedmaps API Client
 * 
 * This client handles communication with the Weedmaps API for online ordering,
 * menu synchronization, and other Weedmaps-related operations.
 */
export class WeedmapsClient {
  private client: AxiosInstance;
  private apiKey: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.apiKey = API_CONFIG.weedmaps.apiKey;
    
    this.client = axios.create({
      baseURL: API_CONFIG.weedmaps.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Add response interceptor to handle token expiration
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If the error is due to an expired token and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          // Refresh the token
          await this.refreshAccessToken();
          
          // Update the authorization header
          originalRequest.headers['Authorization'] = `Bearer ${this.accessToken}`;
          
          // Retry the request
          return this.client(originalRequest);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get an access token for the Weedmaps API
   * @returns Access token
   */
  async getAccessToken(): Promise<string> {
    // Check if we already have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }
    
    // Otherwise, refresh the token
    return this.refreshAccessToken();
  }

  /**
   * Refresh the access token
   * @returns New access token
   */
  private async refreshAccessToken(): Promise<string> {
    try {
      // Get client credentials from environment variables
      const clientId = process.env.WEEDMAPS_CLIENT_ID;
      const clientSecret = process.env.WEEDMAPS_CLIENT_SECRET;
      
      if (!clientId || !clientSecret) {
        throw new Error('Weedmaps client credentials not found in environment variables');
      }
      
      // Request a new token
      const response = await axios.post('https://api-g.weedmaps.com/auth/token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        scope: 'taxonomy:read brands:read products:read menu_items menus:write'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // Extract token information
      const { access_token, expires_in, created_at } = response.data;
      
      // Store the token and expiry time (with a safety margin)
      this.accessToken = access_token;
      this.tokenExpiry = (created_at + expires_in - 3600) * 1000; // Convert to milliseconds and subtract 1 hour for safety
      
      return access_token;
    } catch (error) {
      console.error('Error refreshing Weedmaps access token:', error);
      throw error;
    }
  }

  /**
   * Make an authenticated request to the Weedmaps API
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param data Request data
   * @returns Response data
   */
  async request(method: string, endpoint: string, data?: any): Promise<any> {
    try {
      // Ensure we have a valid token
      const token = await this.getAccessToken();
      
      // Make the request
      const response = await this.client({
        method,
        url: endpoint,
        data,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error making Weedmaps API request to ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get menu items for a listing
   * @param listingId Weedmaps listing ID
   * @returns Menu items
   */
  async getMenuItems(listingId: string): Promise<any> {
    return this.request('GET', `/listings/${listingId}/menu_items`);
  }

  /**
   * Update a menu item
   * @param listingId Weedmaps listing ID
   * @param menuItemId Menu item ID
   * @param data Menu item data
   * @returns Updated menu item
   */
  async updateMenuItem(listingId: string, menuItemId: string, data: any): Promise<any> {
    return this.request('PATCH', `/listings/${listingId}/menu_items/${menuItemId}`, data);
  }

  /**
   * Create a menu item
   * @param listingId Weedmaps listing ID
   * @param data Menu item data
   * @returns Created menu item
   */
  async createMenuItem(listingId: string, data: any): Promise<any> {
    return this.request('POST', `/listings/${listingId}/menu_items`, data);
  }

  /**
   * Delete a menu item
   * @param listingId Weedmaps listing ID
   * @param menuItemId Menu item ID
   * @returns Success status
   */
  async deleteMenuItem(listingId: string, menuItemId: string): Promise<any> {
    return this.request('DELETE', `/listings/${listingId}/menu_items/${menuItemId}`);
  }

  /**
   * Get orders for a listing
   * @param listingId Weedmaps listing ID
   * @returns Orders
   */
  async getOrders(listingId: string): Promise<any> {
    return this.request('GET', `/listings/${listingId}/orders`);
  }

  /**
   * Get a specific order
   * @param listingId Weedmaps listing ID
   * @param orderId Order ID
   * @returns Order details
   */
  async getOrder(listingId: string, orderId: string): Promise<any> {
    return this.request('GET', `/listings/${listingId}/orders/${orderId}`);
  }

  /**
   * Update an order status
   * @param listingId Weedmaps listing ID
   * @param orderId Order ID
   * @param status New status
   * @returns Updated order
   */
  async updateOrderStatus(listingId: string, orderId: string, status: string): Promise<any> {
    return this.request('PATCH', `/listings/${listingId}/orders/${orderId}`, { status });
  }
}

// Export a singleton instance
export const weedmapsClient = new WeedmapsClient();
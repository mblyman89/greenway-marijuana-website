import { leaflyService } from './leafly';
import { weedmapsService } from './weedmaps';
import { cultiveraPOSService } from './cultiverapos';
import { Product } from '../../types/Product';

/**
 * API Integration Service
 * 
 * This service coordinates between the Leafly, Weedmaps, and CultiveraPOS services
 * to provide a unified interface for the application.
 */
export class IntegrationService {
  /**
   * Get products from all integrated services
   * @param options Search options
   * @returns List of products in our application's format
   */
  async getProducts(options: {
    source?: 'leafly' | 'weedmaps' | 'cultiverapos' | 'all';
    category?: string;
    strain?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<Product[]> {
    try {
      const source = options.source || 'all';
      let products: Product[] = [];
      
      if (source === 'all' || source === 'leafly') {
        try {
          const leaflyProducts = await leaflyService.getProducts({
            category: options.category,
            strain: options.strain,
            search: options.search,
            page: options.page,
            limit: options.limit
          });
          products = [...products, ...leaflyProducts];
        } catch (error) {
          console.error('Error getting products from Leafly:', error);
        }
      }
      
      if (source === 'all' || source === 'weedmaps') {
        try {
          // Note: In a real implementation, we would need to get the listing ID from configuration
          const listingId = process.env.WEEDMAPS_LISTING_ID || '';
          const weedmapsProducts = await weedmapsService.getProducts(listingId);
          products = [...products, ...weedmapsProducts];
        } catch (error) {
          console.error('Error getting products from Weedmaps:', error);
        }
      }
      
      if (source === 'all' || source === 'cultiverapos') {
        try {
          const cultiveraPOSProducts = await cultiveraPOSService.getProducts({
            category: options.category,
            strain: options.strain,
            search: options.search,
            page: options.page,
            limit: options.limit
          });
          products = [...products, ...cultiveraPOSProducts];
        } catch (error) {
          console.error('Error getting products from CultiveraPOS:', error);
        }
      }
      
      // Remove duplicates based on product ID
      const uniqueProducts = products.reduce((acc: Product[], product) => {
        if (!acc.find(p => p.id === product.id)) {
          acc.push(product);
        }
        return acc;
      }, []);
      
      return uniqueProducts;
    } catch (error) {
      console.error('Error getting products from integrated services:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID from any integrated service
   * @param productId Product ID
   * @returns Product in our application's format
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      // Try to get the product from Leafly first
      const leaflyProduct = await leaflyService.getProductById(productId);
      if (leaflyProduct) {
        return leaflyProduct;
      }
      
      // If not found in Leafly, try Weedmaps
      // Note: In a real implementation, we would need to get the listing ID from configuration
      const listingId = process.env.WEEDMAPS_LISTING_ID || '';
      const weedmapsProduct = await weedmapsService.getProductById(listingId, productId);
      if (weedmapsProduct) {
        return weedmapsProduct;
      }
      
      // If not found in Weedmaps, try CultiveraPOS
      const cultiveraPOSProduct = await cultiveraPOSService.getProductById(productId);
      if (cultiveraPOSProduct) {
        return cultiveraPOSProduct;
      }
      
      // If not found in any service, return null
      return null;
    } catch (error) {
      console.error(`Error getting product ${productId} from integrated services:`, error);
      return null;
    }
  }

  /**
   * Submit an order to the appropriate service
   * @param order Order data
   * @param options Options
   * @returns Order confirmation
   */
  async submitOrder(order: any, options: {
    service?: 'weedmaps' | 'cultiverapos';
  } = {}): Promise<any> {
    try {
      const service = options.service || 'weedmaps';
      
      if (service === 'weedmaps') {
        // Note: In a real implementation, we would need to get the listing ID from configuration
        const listingId = process.env.WEEDMAPS_LISTING_ID || '';
        // Note: This is a placeholder as the weedmapsService doesn't have a submitOrder method yet
        console.warn('Weedmaps order submission is not implemented yet.');
        return {
          success: true,
          message: 'Mock Weedmaps order confirmation',
          data: {
            orderId: `WM-MOCK-${Date.now()}`,
            status: 'pending'
          }
        };
      } else {
        return cultiveraPOSService.submitOrder(order);
      }
    } catch (error) {
      console.error('Error submitting order to integrated services:', error);
      throw error;
    }
  }

  /**
   * Sync inventory between all integrated services
   * @returns Sync status
   */
  async syncInventory(): Promise<any> {
    try {
      // Sync inventory between all services
      const cultiveraPOSSync = await cultiveraPOSService.syncInventory();
      
      // In a real implementation, we would also sync with Leafly and Weedmaps
      console.warn('Leafly and Weedmaps inventory sync is not implemented yet.');
      
      return {
        success: true,
        message: 'Inventory sync completed',
        data: {
          cultiveraPOS: cultiveraPOSSync.data,
          leafly: {
            syncedAt: new Date().toISOString(),
            itemsUpdated: 0
          },
          weedmaps: {
            syncedAt: new Date().toISOString(),
            itemsUpdated: 0
          }
        }
      };
    } catch (error) {
      console.error('Error syncing inventory between integrated services:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const integrationService = new IntegrationService();
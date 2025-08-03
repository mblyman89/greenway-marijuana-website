import { leaflyClient } from './client';
import { Product } from '../../../types/Product';

/**
 * Leafly Service
 * 
 * This service provides business logic for interacting with the Leafly API
 * and converting Leafly data to our application's data model.
 */
export class LeaflyService {
  /**
   * Get products from Leafly based on search criteria
   * @param options Search options
   * @returns List of products in our application's format
   */
  async getProducts(options: {
    category?: string;
    strain?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Product[]> {
    try {
      // Map our application's categories to Leafly categories if needed
      const category = options.category ? [options.category] : undefined;
      
      // Convert strain to Leafly format if needed
      const strain = options.strain ? [options.strain] : undefined;
      
      // Search for products on Leafly
      const response = await leaflyClient.searchStrains({
        page: options.page || 0,
        take: options.limit || 20,
        search: options.search,
        sort: 'popular',
        filters: {
          category: category as string[]
        }
      });

      // Map Leafly products to our application's product format
      return this.mapLeaflyProductsToAppProducts(response.strains || []);
    } catch (error) {
      console.error('Error getting products from Leafly:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID from Leafly
   * @param productId Product ID
   * @returns Product in our application's format
   */
  async getProductById(productId: string): Promise<Product | null> {
    try {
      // In a real implementation, we would need to map our product IDs to Leafly strain names
      // For now, we'll assume the productId is the strain name
      const response = await leaflyClient.getStrain(productId);
      
      if (!response) {
        return null;
      }
      
      return this.mapLeaflyProductToAppProduct(response);
    } catch (error) {
      console.error(`Error getting product ${productId} from Leafly:`, error);
      return null;
    }
  }

  /**
   * Check product availability at nearby dispensaries
   * @param productId Product ID
   * @param lat Latitude
   * @param lon Longitude
   * @returns List of locations where the product is available
   */
  async checkProductAvailability(productId: string, lat: number, lon: number) {
    try {
      const response = await leaflyClient.getStrainAvailability(productId, {
        lat,
        lon,
        radius: 50
      });
      
      return response;
    } catch (error) {
      console.error(`Error checking availability for product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Map Leafly products to our application's product format
   * @param leaflyProducts Products from Leafly API
   * @returns Products in our application's format
   */
  private mapLeaflyProductsToAppProducts(leaflyProducts: any[]): Product[] {
    return leaflyProducts.map(product => this.mapLeaflyProductToAppProduct(product));
  }

  /**
   * Map a single Leafly product to our application's product format
   * @param leaflyProduct Product from Leafly API
   * @returns Product in our application's format
   */
  private mapLeaflyProductToAppProduct(leaflyProduct: any): Product {
    // Extract strain type from Leafly data
    let strainType: string | undefined;
    if (leaflyProduct.category) {
      strainType = leaflyProduct.category.toLowerCase();
    }

    // Map Leafly product to our application's product model
    return {
      id: leaflyProduct.slug || leaflyProduct.name.toLowerCase().replace(/\s+/g, '-'),
      name: leaflyProduct.name,
      category: 'flower', // Default to flower, adjust based on Leafly data if available
      image: leaflyProduct.nugImage || leaflyProduct.image || '',
      price: 0, // Price would need to come from inventory system or be set manually
      thcContent: leaflyProduct.thc ? `${leaflyProduct.thc}%` : undefined,
      cbdContent: leaflyProduct.cbd ? `${leaflyProduct.cbd}%` : undefined,
      strain: strainType,
      description: leaflyProduct.description,
      effects: leaflyProduct.tags || [],
      flavors: leaflyProduct.flavors || [],
      featured: false // This would be set manually or based on business logic
    };
  }
}

// Export a singleton instance
export const leaflyService = new LeaflyService();
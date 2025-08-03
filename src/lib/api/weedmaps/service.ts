import { weedmapsClient } from './client';
import { Product } from '../../../types/Product';

/**
 * Weedmaps Service
 * 
 * This service provides business logic for interacting with the Weedmaps API
 * and converting Weedmaps data to our application's data model.
 */
export class WeedmapsService {
  /**
   * Get products from Weedmaps for a specific listing
   * @param listingId Weedmaps listing ID
   * @returns List of products in our application's format
   */
  async getProducts(listingId: string): Promise<Product[]> {
    try {
      const response = await weedmapsClient.getMenuItems(listingId);
      
      // Map Weedmaps menu items to our application's product format
      return this.mapWeedmapsProductsToAppProducts(response.data || []);
    } catch (error) {
      console.error('Error getting products from Weedmaps:', error);
      throw error;
    }
  }

  /**
   * Get a single product by ID from Weedmaps
   * @param listingId Weedmaps listing ID
   * @param menuItemId Menu item ID
   * @returns Product in our application's format
   */
  async getProductById(listingId: string, menuItemId: string): Promise<Product | null> {
    try {
      // In a real implementation, we would need to get the specific menu item
      // For now, we'll get all menu items and find the one we want
      const response = await weedmapsClient.getMenuItems(listingId);
      
      if (!response.data) {
        return null;
      }
      
      const menuItem = response.data.find((item: any) => item.id === menuItemId);
      
      if (!menuItem) {
        return null;
      }
      
      return this.mapWeedmapsProductToAppProduct(menuItem);
    } catch (error) {
      console.error(`Error getting product ${menuItemId} from Weedmaps:`, error);
      return null;
    }
  }

  /**
   * Create a new product on Weedmaps
   * @param listingId Weedmaps listing ID
   * @param product Product data
   * @returns Created product
   */
  async createProduct(listingId: string, product: Product): Promise<any> {
    try {
      // Convert our product format to Weedmaps format
      const weedmapsProduct = this.mapAppProductToWeedmapsProduct(product);
      
      // Create the product on Weedmaps
      const response = await weedmapsClient.createMenuItem(listingId, weedmapsProduct);
      
      return response;
    } catch (error) {
      console.error('Error creating product on Weedmaps:', error);
      throw error;
    }
  }

  /**
   * Update a product on Weedmaps
   * @param listingId Weedmaps listing ID
   * @param menuItemId Menu item ID
   * @param product Product data
   * @returns Updated product
   */
  async updateProduct(listingId: string, menuItemId: string, product: Product): Promise<any> {
    try {
      // Convert our product format to Weedmaps format
      const weedmapsProduct = this.mapAppProductToWeedmapsProduct(product);
      
      // Update the product on Weedmaps
      const response = await weedmapsClient.updateMenuItem(listingId, menuItemId, weedmapsProduct);
      
      return response;
    } catch (error) {
      console.error(`Error updating product ${menuItemId} on Weedmaps:`, error);
      throw error;
    }
  }

  /**
   * Delete a product from Weedmaps
   * @param listingId Weedmaps listing ID
   * @param menuItemId Menu item ID
   * @returns Success status
   */
  async deleteProduct(listingId: string, menuItemId: string): Promise<any> {
    try {
      const response = await weedmapsClient.deleteMenuItem(listingId, menuItemId);
      return response;
    } catch (error) {
      console.error(`Error deleting product ${menuItemId} from Weedmaps:`, error);
      throw error;
    }
  }

  /**
   * Get orders from Weedmaps for a specific listing
   * @param listingId Weedmaps listing ID
   * @returns List of orders
   */
  async getOrders(listingId: string): Promise<any> {
    try {
      const response = await weedmapsClient.getOrders(listingId);
      return response.data || [];
    } catch (error) {
      console.error('Error getting orders from Weedmaps:', error);
      throw error;
    }
  }

  /**
   * Get a specific order from Weedmaps
   * @param listingId Weedmaps listing ID
   * @param orderId Order ID
   * @returns Order details
   */
  async getOrder(listingId: string, orderId: string): Promise<any> {
    try {
      const response = await weedmapsClient.getOrder(listingId, orderId);
      return response.data;
    } catch (error) {
      console.error(`Error getting order ${orderId} from Weedmaps:`, error);
      throw error;
    }
  }

  /**
   * Update an order status on Weedmaps
   * @param listingId Weedmaps listing ID
   * @param orderId Order ID
   * @param status New status
   * @returns Updated order
   */
  async updateOrderStatus(listingId: string, orderId: string, status: string): Promise<any> {
    try {
      const response = await weedmapsClient.updateOrderStatus(listingId, orderId, status);
      return response.data;
    } catch (error) {
      console.error(`Error updating order ${orderId} status on Weedmaps:`, error);
      throw error;
    }
  }

  /**
   * Map Weedmaps products to our application's product format
   * @param weedmapsProducts Products from Weedmaps API
   * @returns Products in our application's format
   */
  private mapWeedmapsProductsToAppProducts(weedmapsProducts: any[]): Product[] {
    return weedmapsProducts.map(product => this.mapWeedmapsProductToAppProduct(product));
  }

  /**
   * Map a single Weedmaps product to our application's product format
   * @param weedmapsProduct Product from Weedmaps API
   * @returns Product in our application's format
   */
  private mapWeedmapsProductToAppProduct(weedmapsProduct: any): Product {
    // Extract strain type from Weedmaps data
    let strainType: string | undefined;
    if (weedmapsProduct.strain_type) {
      strainType = weedmapsProduct.strain_type.toLowerCase();
    }

    // Map Weedmaps product to our application's product model
    return {
      id: weedmapsProduct.id.toString(),
      name: weedmapsProduct.name,
      category: this.mapWeedmapsCategoryToAppCategory(weedmapsProduct.category),
      image: weedmapsProduct.image_url || '',
      price: weedmapsProduct.price || 0,
      thcContent: weedmapsProduct.thc_content ? `${weedmapsProduct.thc_content}%` : undefined,
      cbdContent: weedmapsProduct.cbd_content ? `${weedmapsProduct.cbd_content}%` : undefined,
      strain: strainType,
      description: weedmapsProduct.description,
      effects: weedmapsProduct.effects || [],
      flavors: weedmapsProduct.flavors || [],
      featured: weedmapsProduct.featured || false
    };
  }

  /**
   * Map our application's product format to Weedmaps format
   * @param product Product in our application's format
   * @returns Product in Weedmaps format
   */
  private mapAppProductToWeedmapsProduct(product: Product): any {
    return {
      name: product.name,
      category: this.mapAppCategoryToWeedmapsCategory(product.category),
      image_url: product.image,
      price: product.price,
      thc_content: product.thcContent ? parseFloat(product.thcContent.replace('%', '')) : null,
      cbd_content: product.cbdContent ? parseFloat(product.cbdContent.replace('%', '')) : null,
      strain_type: product.strain,
      description: product.description,
      effects: product.effects,
      flavors: product.flavors,
      featured: product.featured
    };
  }

  /**
   * Map Weedmaps category to our application's category
   * @param weedmapsCategory Category from Weedmaps
   * @returns Category in our application's format
   */
  private mapWeedmapsCategoryToAppCategory(weedmapsCategory: string): string {
    // Map Weedmaps categories to our application's categories
    const categoryMap: { [key: string]: string } = {
      'flower': 'flower',
      'pre-rolls': 'pre-rolls',
      'vaporizers': 'vaporizers',
      'concentrates': 'concentrates',
      'edibles': 'edibles',
      'topicals': 'topicals',
      'accessories': 'accessories'
    };

    return categoryMap[weedmapsCategory.toLowerCase()] || weedmapsCategory.toLowerCase();
  }

  /**
   * Map our application's category to Weedmaps category
   * @param appCategory Category from our application
   * @returns Category in Weedmaps format
   */
  private mapAppCategoryToWeedmapsCategory(appCategory: string): string {
    // Map our application's categories to Weedmaps categories
    const categoryMap: { [key: string]: string } = {
      'flower': 'flower',
      'pre-rolls': 'pre-rolls',
      'vaporizers': 'vaporizers',
      'concentrates': 'concentrates',
      'edibles': 'edibles',
      'topicals': 'topicals',
      'accessories': 'accessories'
    };

    return categoryMap[appCategory.toLowerCase()] || appCategory.toLowerCase();
  }
}

// Export a singleton instance
export const weedmapsService = new WeedmapsService();
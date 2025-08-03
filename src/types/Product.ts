export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  image: string;
  price: number;
  salePrice?: number;
  thcContent?: string;
  cbdContent?: string;
  strain?: string;
  quantity?: string;
  description?: string;
  effects?: string[];
  flavors?: string[];
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
}

export type ProductCategory = 
  | 'flower'
  | 'pre-rolls'
  | 'vaporizers'
  | 'concentrates'
  | 'edibles'
  | 'topicals'
  | 'accessories';

export type StrainType = 'indica' | 'sativa' | 'hybrid';
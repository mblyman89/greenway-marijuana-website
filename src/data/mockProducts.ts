import { Product } from '../types/Product';

export const mockProducts: Product[] = [
  {
    id: 'blue-dream-1oz',
    name: 'Blue Dream',
    category: 'flower',
    subcategory: 'hybrid',
    image: '/images/products/blue-dream.jpg',
    price: 12.00,
    thcContent: '24%',
    cbdContent: '0.1%',
    strain: 'Hybrid',
    quantity: '1g',
    description: 'Blue Dream is a sativa-dominant hybrid marijuana strain made by crossing Blueberry with Haze. This strain produces a balanced high, along with effects such as cerebral stimulation and full-body relaxation.',
    effects: ['Happy', 'Relaxed', 'Euphoric', 'Creative', 'Uplifted'],
    flavors: ['Berry', 'Sweet', 'Blueberry'],
    featured: true
  },
  {
    id: 'og-kush-preroll-pack',
    name: 'OG Kush Pack',
    category: 'pre-rolls',
    subcategory: 'indica',
    image: '/images/products/og-kush-preroll.jpg',
    price: 15.00,
    thcContent: '22%',
    cbdContent: '0.2%',
    strain: 'Indica',
    quantity: '5 x 0.5g',
    description: 'This pack of 5 pre-rolled OG Kush joints is perfect for on-the-go consumption. OG Kush is an indica-dominant strain known for its relaxing and euphoric effects.',
    effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy'],
    flavors: ['Earthy', 'Pine', 'Woody'],
    featured: true
  },
  {
    id: 'sunset-gelato-cart',
    name: 'Sunset Gelato Cart',
    category: 'vaporizers',
    subcategory: 'cartridges',
    image: '/images/products/sunset-gelato-cart.jpg',
    price: 35.00,
    thcContent: '85%',
    cbdContent: '0%',
    strain: 'Hybrid',
    quantity: '1g',
    description: 'This Sunset Gelato vape cartridge delivers a potent and flavorful experience. The high THC content provides quick relief and the hybrid strain offers balanced effects.',
    effects: ['Relaxed', 'Happy', 'Euphoric', 'Creative'],
    flavors: ['Sweet', 'Citrus', 'Dessert'],
    featured: true
  },
  {
    id: 'fruit-chews-100mg',
    name: 'Fruit Chews',
    category: 'edibles',
    subcategory: 'gummies',
    image: '/images/products/fruit-chews.jpg',
    price: 20.00,
    thcContent: '100mg',
    cbdContent: '0mg',
    strain: 'Hybrid',
    quantity: '10 pieces',
    description: 'These delicious fruit-flavored chews contain 10mg of THC each for a total of 100mg per package. Perfect for precise dosing and a consistent experience.',
    effects: ['Relaxed', 'Happy', 'Euphoric', 'Hungry'],
    flavors: ['Fruit', 'Sweet', 'Berry'],
    featured: true
  },
  {
    id: 'northern-lights-1oz',
    name: 'Northern Lights',
    category: 'flower',
    subcategory: 'indica',
    image: '/images/products/northern-lights.jpg',
    price: 14.00,
    thcContent: '21%',
    cbdContent: '0.1%',
    strain: 'Indica',
    quantity: '1g',
    description: 'Northern Lights is a pure indica strain known for its resinous buds and resilience during growth. This strain produces euphoric effects that settle throughout the body, relaxing muscles and easing the mind.',
    effects: ['Relaxed', 'Sleepy', 'Happy', 'Hungry'],
    flavors: ['Sweet', 'Pine', 'Spicy'],
    featured: false
  },
  {
    id: 'sour-diesel-1oz',
    name: 'Sour Diesel',
    category: 'flower',
    subcategory: 'sativa',
    image: '/images/products/sour-diesel.jpg',
    price: 13.00,
    thcContent: '20%',
    cbdContent: '0.2%',
    strain: 'Sativa',
    quantity: '1g',
    description: 'Sour Diesel is a fast-acting sativa-dominant strain with a strong diesel aroma. This strain delivers energizing, dreamy cerebral effects that have pushed it to legendary status.',
    effects: ['Energetic', 'Happy', 'Uplifted', 'Focused'],
    flavors: ['Diesel', 'Citrus', 'Pungent'],
    featured: false
  },
  {
    id: 'wedding-cake-1oz',
    name: 'Wedding Cake',
    category: 'flower',
    subcategory: 'hybrid',
    image: '/images/products/wedding-cake.jpg',
    price: 15.00,
    salePrice: 12.00,
    thcContent: '25%',
    cbdContent: '0.1%',
    strain: 'Hybrid',
    quantity: '1g',
    description: 'Wedding Cake is a potent indica-leaning hybrid strain known for its rich and tangy flavor profile with hints of earthy pepper. This strain provides relaxing and euphoric effects that calm the body and mind.',
    effects: ['Relaxed', 'Happy', 'Euphoric', 'Creative'],
    flavors: ['Sweet', 'Vanilla', 'Earthy'],
    featured: false,
    onSale: true
  },
  {
    id: 'cbd-tincture-1000mg',
    name: 'CBD Tincture',
    category: 'topicals',
    subcategory: 'tinctures',
    image: '/images/products/cbd-tincture.jpg',
    price: 60.00,
    thcContent: '0%',
    cbdContent: '1000mg',
    quantity: '30ml',
    description: 'This high-potency CBD tincture contains 1000mg of CBD in a 30ml bottle. Taken sublingually, it provides fast-acting relief without psychoactive effects.',
    effects: ['Calm', 'Relief', 'Relaxed', 'Focused'],
    featured: false
  },
  {
    id: 'glass-pipe-blue',
    name: 'Glass Pipe - Blue Swirl',
    category: 'accessories',
    subcategory: 'pipes',
    image: '/images/products/glass-pipe.jpg',
    price: 25.00,
    quantity: '1 piece',
    description: 'This handcrafted glass pipe features a beautiful blue swirl design. Made from high-quality borosilicate glass for durability and heat resistance.',
    featured: false,
    isNew: true
  },
  {
    id: 'grinder-4piece',
    name: '4-Piece Grinder',
    category: 'accessories',
    subcategory: 'grinders',
    image: '/images/products/grinder.jpg',
    price: 30.00,
    quantity: '1 piece',
    description: 'This premium 4-piece grinder features sharp teeth for efficient grinding, a kief catcher, and a magnetic lid. Made from high-quality aluminum for durability.',
    featured: false
  }
];

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getNewProducts = (): Product[] => {
  return mockProducts.filter(product => product.isNew);
};

export const getOnSaleProducts = (): Product[] => {
  return mockProducts.filter(product => product.onSale);
};
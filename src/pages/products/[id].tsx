import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getProductById, mockProducts } from '../../data/mockProducts';
import { Product } from '../../types/Product';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import ResponsiveProductCard from '../../components/ResponsiveProductCard';
import useResponsive from '../../hooks/useResponsive';
import { generateProductStructuredData } from '../../utils/structuredData';

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id as string);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (same category)
        const related = mockProducts
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      // Show a success message or open cart drawer
      alert(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`);
    }
  };

  // Generate structured data for the product
  const getStructuredData = () => {
    if (!product) return null;
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://greenwaymarijuana.com';
    const productUrl = `${baseUrl}/products/${product.id}`;
    
    return generateProductStructuredData(product, productUrl);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link href="/products">
              <a className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-dark transition">
                Browse Products
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const isOnSale = product.salePrice !== undefined && product.salePrice < product.price;
  const productDescription = product.description || `Buy ${product.name} at Greenway Marijuana in Port Orchard, WA. ${product.strain ? `${product.strain} strain.` : ''} ${product.thcContent ? `THC: ${product.thcContent}.` : ''} ${product.cbdContent ? `CBD: ${product.cbdContent}.` : ''}`;
  const productKeywords = `cannabis, marijuana, ${product.category}, ${product.strain || ''}, ${product.name}, Port Orchard, WA, dispensary`.replace(/\s+/g, ' ').trim();

  return (
    <Layout 
      title={`${product.name} - ${product.strain || product.category} - Greenway Marijuana`}
      description={productDescription}
      keywords={productKeywords}
      canonical={`/products/${product.id}`}
      ogImage={product.image || '/images/og-product-default.jpg'}
      ogType="product"
      structuredData={getStructuredData()}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 overflow-x-auto whitespace-nowrap">
          <nav className="flex text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/">
                  <a className="text-gray-500 hover:text-primary">Home</a>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-500 hover:text-primary">Products</a>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <Link href={`/products?category=${product.category}`}>
                  <a className="text-gray-500 hover:text-primary capitalize">{product.category}</a>
                </Link>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium truncate max-w-[150px] md:max-w-none">{product.name}</li>
            </ol>
          </nav>
        </div>
        
        {/* Product Detail */}
        <div className={`flex flex-col ${isMobile || isTablet ? '' : 'lg:flex-row'} gap-12 mb-16`}>
          {/* Product Image */}
          <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-1/2'}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                  loading="eager"
                  width="600"
                  height="600"
                />
              ) : (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className={`w-full ${isMobile || isTablet ? '' : 'lg:w-1/2'}`}>
            <div className="mb-4">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize">
                {product.category}
              </span>
              {product.strain && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2 capitalize">
                  {product.strain}
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="mb-6">
              {isOnSale ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-red-500">${product.salePrice?.toFixed(2)}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-4'} mb-6`}>
              {product.thcContent && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">THC</h3>
                  <p className="font-medium">{product.thcContent}</p>
                </div>
              )}
              
              {product.cbdContent && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">CBD</h3>
                  <p className="font-medium">{product.cbdContent}</p>
                </div>
              )}
              
              {product.quantity && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                  <p className="font-medium">{product.quantity}</p>
                </div>
              )}
            </div>
            
            {product.effects && product.effects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Effects</h2>
                <div className="flex flex-wrap gap-2">
                  {product.effects.map((effect, index) => (
                    <span 
                      key={index} 
                      className="bg-primary-light text-primary text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {product.flavors && product.flavors.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Flavors</h2>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 rounded-l flex items-center justify-center hover:bg-gray-300 transition"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-t border-b border-gray-200"
                  min="1"
                  aria-label="Product quantity"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 rounded-r flex items-center justify-center hover:bg-gray-300 transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4`}>
              <button 
                onClick={handleAddToCart}
                className="bg-primary text-white py-3 px-8 rounded-lg font-medium hover:bg-primary-dark transition flex-grow"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              
              <Link href="/cart">
                <a className="bg-black text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-900 transition text-center">
                  View Cart
                </a>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} lg:grid-cols-4 gap-8`}>
              {relatedProducts.map((relatedProduct) => (
                <ResponsiveProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  category={relatedProduct.category}
                  image={relatedProduct.image}
                  price={relatedProduct.price}
                  salePrice={relatedProduct.salePrice}
                  thcContent={relatedProduct.thcContent}
                  cbdContent={relatedProduct.cbdContent}
                  strain={relatedProduct.strain}
                  quantity={relatedProduct.quantity}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
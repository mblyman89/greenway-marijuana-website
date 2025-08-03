import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AgeVerification from '../components/AgeVerification';
import ResponsiveProductCard from '../components/ResponsiveProductCard';
import { getFeaturedProducts } from '../data/mockProducts';
import { Product } from '../types/Product';
import useResponsive from '../hooks/useResponsive';
import Link from 'next/link';
import { generateLocalBusinessStructuredData } from '../utils/structuredData';

const Home: React.FC = () => {
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      setIsLoading(false);
      // Get featured products
      setFeaturedProducts(getFeaturedProducts());
    }
  }, []);

  const handleAgeVerification = (isAdult: boolean) => {
    if (isAdult) {
      setIsAgeVerified(true);
    } else {
      // Redirect to age restriction page
      window.location.href = '/age-restriction';
    }
  };

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // Generate structured data for the homepage
  const structuredData = generateLocalBusinessStructuredData();

  return (
    <>
      {isAgeVerified === null && (
        <AgeVerification onVerify={handleAgeVerification} />
      )}

      {isAgeVerified && (
        <Layout
          title="Greenway Marijuana - Premium Cannabis Dispensary in Port Orchard, WA"
          description="Greenway Marijuana offers premium cannabis products in Port Orchard, WA. Shop our wide selection of flower, pre-rolls, edibles, concentrates, and more."
          keywords="cannabis, marijuana, dispensary, Port Orchard, WA, flower, pre-rolls, edibles, concentrates, vaporizers, topicals, accessories"
          canonical="/"
          ogType="website"
          structuredData={structuredData}
        >
          {/* Hero Section */}
          <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10 text-center">
              <div>
                <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl'} font-bold text-white mb-4`}>
                  Premium Cannabis Products in Port Orchard
                </h1>
                <p className={`${isMobile ? 'text-base' : 'text-lg'} text-white mb-8`}>
                  Explore our wide selection of high-quality cannabis products. Order online for in-store pickup.
                </p>
                <a href="/products" className="bg-primary text-white py-3 px-8 rounded font-medium hover:bg-primary-dark transition">
                  Shop Now
                </a>
              </div>
            </div>
          </section>

          {/* Category Navigation */}
          <section className="bg-white py-6 shadow">
            <div className="container mx-auto px-4 overflow-x-auto">
              <div className="flex gap-8 min-w-max">
                <a href="/products?category=flower" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🌿</div>
                  <span className="text-sm font-medium">Flower</span>
                </a>
                <a href="/products?category=pre-rolls" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🚬</div>
                  <span className="text-sm font-medium">Pre-Rolls</span>
                </a>
                <a href="/products?category=vaporizers" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🔋</div>
                  <span className="text-sm font-medium">Vaporizers</span>
                </a>
                <a href="/products?category=concentrates" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">💎</div>
                  <span className="text-sm font-medium">Concentrates</span>
                </a>
                <a href="/products?category=edibles" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🍬</div>
                  <span className="text-sm font-medium">Edibles</span>
                </a>
                <a href="/products?category=topicals" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🧴</div>
                  <span className="text-sm font-medium">Topicals</span>
                </a>
                <a href="/products?category=accessories" className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">🔧</div>
                  <span className="text-sm font-medium">Accessories</span>
                </a>
              </div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600">Check out our most popular items</p>
              </div>
              
              <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} lg:grid-cols-4 gap-8`}>
                {featuredProducts.map(product => (
                  <ResponsiveProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    image={product.image}
                    price={product.price}
                    salePrice={product.salePrice}
                    thcContent={product.thcContent}
                    cbdContent={product.cbdContent}
                    strain={product.strain}
                    quantity={product.quantity}
                  />
                ))}
              </div>
            </div>
          </section>
          
          {/* Deals Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">Current Deals</h2>
                <p className="text-gray-600">Save on your favorite products</p>
              </div>
              
              <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary text-white p-2 text-center font-bold">
                    DAILY DEAL
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">20% OFF ALL EDIBLES</h3>
                    <p className="text-gray-600 mb-4">Every Monday, enjoy 20% off all edible products.</p>
                    <a href="/deals" className="text-primary font-medium hover:underline">View Details →</a>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-primary text-white p-2 text-center font-bold">
                    WEEKLY SPECIAL
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">BUY 2 GET 1 PRE-ROLLS</h3>
                    <p className="text-gray-600 mb-4">Buy any 2 pre-rolls and get 1 free. Limited time offer.</p>
                    <a href="/deals" className="text-primary font-medium hover:underline">View Details →</a>
                  </div>
                </div>
                
                <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isMobile || isTablet ? 'mt-0' : ''}`}>
                  <div className="bg-primary text-white p-2 text-center font-bold">
                    LOYALTY MEMBERS
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">DOUBLE POINTS TUESDAY</h3>
                    <p className="text-gray-600 mb-4">Loyalty members earn double points every Tuesday.</p>
                    <a href="/loyalty" className="text-primary font-medium hover:underline">Join Now →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Newsletter Section */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Newsletter</h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">Stay updated with our latest products, promotions, and cannabis education.</p>
              
              <form className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 max-w-lg mx-auto`}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow py-3 px-4 rounded-lg focus:outline-none"
                  required
                  aria-label="Email address"
                />
                <button 
                  type="submit" 
                  className="bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-white text-sm mt-4 opacity-80">By subscribing, you confirm that you are 21 years of age or older.</p>
            </div>
          </section>
        </Layout>
      )}
    </>
  );
};

export default Home;
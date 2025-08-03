import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import ResponsiveNavigation from './ResponsiveNavigation';
import ResponsiveFooter from './ResponsiveFooter';
import SEO from './SEO';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noIndex?: boolean;
  structuredData?: Record<string, any>;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Greenway Marijuana - Port Orchard, WA',
  description = 'Premium cannabis products in Port Orchard, WA. Shop our wide selection of flower, pre-rolls, edibles, concentrates, and more.',
  canonical,
  ogImage,
  ogType,
  keywords,
  noIndex,
  structuredData
}) => {
  const { itemCount } = useCart();

  return (
    <>
      <SEO 
        title={title}
        description={description}
        canonical={canonical}
        ogImage={ogImage}
        ogType={ogType}
        keywords={keywords}
        noIndex={noIndex}
        structuredData={structuredData}
      />

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-black text-white py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/">
              <a className="block">
                <img 
                  src="/images/logo.png" 
                  alt="Greenway Marijuana Logo" 
                  className="w-40"
                />
              </a>
            </Link>
            
            <ResponsiveNavigation />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <ResponsiveFooter />
      </div>
    </>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext';
import useResponsive from '../hooks/useResponsive';

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Deals', href: '/deals' },
  { label: 'Loyalty', href: '/loyalty' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const ResponsiveNavigation: React.FC = () => {
  const { itemCount } = useCart();
  const router = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [router.asPath]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close search if open
    if (searchOpen) {
      setSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <a className={`hover:text-primary transition ${
              router.pathname === item.href ? 'text-primary' : 'text-white'
            }`}>
              {item.label}
            </a>
          </Link>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-4">
        <button 
          aria-label="Search" 
          className="text-white hover:text-primary transition"
          onClick={toggleSearch}
        >
          🔍
        </button>
        <Link href="/cart">
          <a className="text-white hover:text-primary transition relative">
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </Link>
        <Link href="/account">
          <a className="text-white hover:text-primary transition">
            👤
          </a>
        </Link>
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden flex items-center gap-4">
        <button 
          aria-label="Search" 
          className="text-white hover:text-primary transition"
          onClick={toggleSearch}
        >
          🔍
        </button>
        <Link href="/cart">
          <a className="text-white hover:text-primary transition relative">
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
        </Link>
        <button 
          aria-label="Menu" 
          className="text-2xl text-white"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col pt-20">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link href={item.href} key={item.href}>
                  <a className={`text-xl py-2 border-b border-gray-800 ${
                    router.pathname === item.href ? 'text-primary' : 'text-white'
                  }`}>
                    {item.label}
                  </a>
                </Link>
              ))}
              <Link href="/account">
                <a className="text-xl py-2 border-b border-gray-800 text-white">
                  My Account
                </a>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-start pt-20">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-3 px-4 pr-12 bg-white rounded-lg focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                🔍
              </button>
            </form>
            <button
              className="mt-4 text-white hover:text-primary transition"
              onClick={toggleSearch}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveNavigation;
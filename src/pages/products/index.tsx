import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ResponsiveProductCard from '../../components/ResponsiveProductCard';
import { mockProducts } from '../../data/mockProducts';
import { Product, ProductCategory, StrainType } from '../../types/Product';
import useResponsive from '../../hooks/useResponsive';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedStrain, setSelectedStrain] = useState<StrainType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    // In a real app, this would fetch from an API
    setProducts(mockProducts);
    
    // Check for query parameters
    const { category, strain, search, sort } = router.query;
    
    if (category && typeof category === 'string') {
      setSelectedCategory(category as ProductCategory | 'all');
    }
    
    if (strain && typeof strain === 'string') {
      setSelectedStrain(strain as StrainType | 'all');
    }
    
    if (search && typeof search === 'string') {
      setSearchQuery(search);
    }
    
    if (sort && typeof sort === 'string') {
      setSortBy(sort);
    }
  }, [router.query]);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by strain
    if (selectedStrain !== 'all') {
      result = result.filter(product => product.strain?.toLowerCase() === selectedStrain);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.strain?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
    
    // Update URL with filters (without page reload)
    const queryParams = new URLSearchParams();
    if (selectedCategory !== 'all') queryParams.set('category', selectedCategory);
    if (selectedStrain !== 'all') queryParams.set('strain', selectedStrain);
    if (searchQuery) queryParams.set('search', searchQuery);
    if (sortBy !== 'featured') queryParams.set('sort', sortBy);
    
    const queryString = queryParams.toString();
    const newUrl = `/products${queryString ? `?${queryString}` : ''}`;
    
    router.push(newUrl, undefined, { shallow: true });
  }, [products, selectedCategory, selectedStrain, searchQuery, sortBy]);

  const categories: { value: ProductCategory | 'all', label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'flower', label: 'Flower' },
    { value: 'pre-rolls', label: 'Pre-Rolls' },
    { value: 'vaporizers', label: 'Vaporizers' },
    { value: 'concentrates', label: 'Concentrates' },
    { value: 'edibles', label: 'Edibles' },
    { value: 'topicals', label: 'Topicals' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const strains: { value: StrainType | 'all', label: string }[] = [
    { value: 'all', label: 'All Strains' },
    { value: 'indica', label: 'Indica' },
    { value: 'sativa', label: 'Sativa' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const sortOptions: { value: string, label: string }[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Generate page title and description based on filters
  const getPageTitle = () => {
    let title = 'Cannabis Products';
    
    if (selectedCategory !== 'all') {
      title = `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`;
    }
    
    if (selectedStrain !== 'all') {
      title = `${selectedStrain.charAt(0).toUpperCase() + selectedStrain.slice(1)} ${title}`;
    }
    
    if (searchQuery) {
      title = `${searchQuery} - ${title}`;
    }
    
    return `${title} - Greenway Marijuana`;
  };
  
  const getPageDescription = () => {
    let description = 'Browse our selection of premium cannabis products';
    
    if (selectedCategory !== 'all') {
      description = `Shop our selection of premium cannabis ${selectedCategory}`;
    }
    
    if (selectedStrain !== 'all') {
      description = `${description} in ${selectedStrain} strains`;
    }
    
    return `${description} at Greenway Marijuana in Port Orchard, WA.`;
  };
  
  const getPageKeywords = () => {
    let keywords = 'cannabis, marijuana, dispensary, Port Orchard, WA';
    
    if (selectedCategory !== 'all') {
      keywords = `${keywords}, ${selectedCategory}`;
    }
    
    if (selectedStrain !== 'all') {
      keywords = `${keywords}, ${selectedStrain}`;
    }
    
    return keywords;
  };
  
  // Generate canonical URL
  const getCanonicalUrl = () => {
    // Base canonical should be the clean URL without filters
    // This helps prevent duplicate content issues with search engines
    return '/products';
  };

  return (
    <Layout 
      title={getPageTitle()}
      description={getPageDescription()}
      keywords={getPageKeywords()}
      canonical={getCanonicalUrl()}
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">
          {selectedCategory !== 'all' ? (
            <span className="capitalize">{selectedCategory}</span>
          ) : 'All Products'}
          {selectedStrain !== 'all' && (
            <span className="capitalize"> - {selectedStrain}</span>
          )}
        </h1>
        
        {/* Mobile Filter Toggle */}
        {isMobile && (
          <button
            onClick={toggleFilters}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium mb-4 flex items-center justify-center"
            aria-expanded={isFilterOpen}
            aria-controls="product-filters"
          >
            <span className="mr-2">{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
            <span>{isFilterOpen ? '▲' : '▼'}</span>
          </button>
        )}
        
        {/* Filters */}
        <div 
          id="product-filters"
          className={`bg-white rounded-lg shadow-md p-6 mb-8 ${isMobile && !isFilterOpen ? 'hidden' : 'block'}`}
        >
          <div className={`flex ${isMobile || isTablet ? 'flex-col' : 'flex-row'} gap-4 ${isMobile || isTablet ? '' : 'items-center'}`}>
            <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/3'}`}>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                id="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/4'}`}>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/4'}`}>
              <label htmlFor="strain" className="block text-sm font-medium text-gray-700 mb-1">Strain</label>
              <select
                id="strain"
                value={selectedStrain}
                onChange={(e) => setSelectedStrain(e.target.value as StrainType | 'all')}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {strains.map((strain) => (
                  <option key={strain.value} value={strain.value}>{strain.label}</option>
                ))}
              </select>
            </div>
            
            <div className={`${isMobile || isTablet ? 'w-full' : 'w-1/4'}`}>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No products found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStrain('all');
                setSearchQuery('');
                setSortBy('featured');
              }}
              className="bg-primary text-white py-2 px-6 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-2' : 'md:grid-cols-3'} lg:grid-cols-4 gap-8`}>
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
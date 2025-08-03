import React from 'react';
import { render } from '@testing-library/react';
import SEO from '../SEO';

// Mock Next.js Head component
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => {
      return <>{children}</>;
    },
  };
});

describe('SEO Component', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test description for SEO component',
  };

  beforeEach(() => {
    // Reset document head before each test
    document.head.innerHTML = '';
  });

  it('renders basic meta tags correctly', () => {
    render(<SEO {...defaultProps} />);
    
    // Check if title is set correctly
    expect(document.title).toBe('Test Title');
    
    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute('content', 'Test description for SEO component');
    
    // Check viewport meta tag
    const metaViewport = document.querySelector('meta[name="viewport"]');
    expect(metaViewport).toHaveAttribute('content', 'width=device-width, initial-scale=1');
  });

  it('renders Open Graph tags correctly', () => {
    render(<SEO {...defaultProps} ogImage="/test-image.jpg" ogType="article" />);
    
    // Check OG title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toHaveAttribute('content', 'Test Title');
    
    // Check OG description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    expect(ogDescription).toHaveAttribute('content', 'Test description for SEO component');
    
    // Check OG image
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toHaveAttribute('content', expect.stringContaining('/test-image.jpg'));
    
    // Check OG type
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toHaveAttribute('content', 'article');
  });

  it('renders Twitter card tags correctly', () => {
    render(<SEO {...defaultProps} ogImage="/twitter-image.jpg" />);
    
    // Check Twitter card type
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    
    // Check Twitter title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle).toHaveAttribute('content', 'Test Title');
    
    // Check Twitter description
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    expect(twitterDescription).toHaveAttribute('content', 'Test description for SEO component');
    
    // Check Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    expect(twitterImage).toHaveAttribute('content', expect.stringContaining('/twitter-image.jpg'));
  });

  it('renders canonical URL when provided', () => {
    render(<SEO {...defaultProps} canonical="/test-page" />);
    
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).toHaveAttribute('href', expect.stringContaining('/test-page'));
  });

  it('renders keywords meta tag when provided', () => {
    render(<SEO {...defaultProps} keywords="test, seo, keywords" />);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords).toHaveAttribute('content', 'test, seo, keywords');
  });

  it('renders noindex meta tag when specified', () => {
    render(<SEO {...defaultProps} noIndex={true} />);
    
    const metaRobots = document.querySelector('meta[name="robots"]');
    expect(metaRobots).toHaveAttribute('content', 'noindex, nofollow');
  });

  it('renders structured data when provided', () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Test Product',
      description: 'Test product description',
    };
    
    render(<SEO {...defaultProps} structuredData={structuredData} />);
    
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();
    expect(JSON.parse(scriptTag?.innerHTML || '{}')).toEqual(structuredData);
  });
});
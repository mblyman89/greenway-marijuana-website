import { Product } from '../types/Product';

/**
 * Generate structured data for a product
 */
export const generateProductStructuredData = (product: Product, url: string) => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description || `${product.name} - ${product.category} - ${product.strain}`,
    sku: product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Greenway Marijuana'
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'USD',
      price: product.salePrice || product.price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'THC Content',
        value: product.thcContent
      },
      {
        '@type': 'PropertyValue',
        name: 'CBD Content',
        value: product.cbdContent
      },
      {
        '@type': 'PropertyValue',
        name: 'Strain',
        value: product.strain
      }
    ]
  };
};

/**
 * Generate structured data for a blog post
 */
export const generateBlogPostStructuredData = (post: any, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      '@type': 'Person',
      name: post.author.name
    },
    publisher: {
      '@type': 'Organization',
      name: 'Greenway Marijuana',
      logo: {
        '@type': 'ImageObject',
        url: 'https://greenwaymarijuana.com/images/logo.png'
      }
    },
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date
  };
};

/**
 * Generate structured data for the local business
 */
export const generateLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Greenway Marijuana',
    image: 'https://greenwaymarijuana.com/images/store-front.jpg',
    '@id': 'https://greenwaymarijuana.com',
    url: 'https://greenwaymarijuana.com',
    telephone: '+1-360-876-0420',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1107 Bay St',
      addressLocality: 'Port Orchard',
      addressRegion: 'WA',
      postalCode: '98366',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.5405',
      longitude: '-122.6368'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '08:00',
        closes: '22:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/greenwaymarijuana',
      'https://www.instagram.com/greenwaymarijuana',
      'https://twitter.com/greenwaymarij'
    ]
  };
};

/**
 * Generate structured data for FAQ page
 */
export const generateFAQStructuredData = (faqs: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};
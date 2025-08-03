/**
 * Utility functions for performance optimization
 */

/**
 * Generate image srcset for responsive images
 * @param baseUrl Base URL of the image
 * @param widths Array of widths to generate srcset for
 * @param extension Image extension (default: jpg)
 * @returns srcset string
 */
export const generateSrcSet = (baseUrl: string, widths: number[], extension: string = 'jpg'): string => {
  // If baseUrl already has extension, remove it
  const baseWithoutExtension = baseUrl.replace(/\.[^/.]+$/, '');
  
  return widths
    .map(width => `${baseWithoutExtension}-${width}w.${extension} ${width}w`)
    .join(', ');
};

/**
 * Get appropriate image size based on viewport
 * @param mobile Mobile image size
 * @param tablet Tablet image size
 * @param desktop Desktop image size
 * @returns sizes attribute string
 */
export const getImageSizes = (
  mobile: string = '100vw',
  tablet: string = '50vw',
  desktop: string = '33vw'
): string => {
  return `(max-width: 576px) ${mobile}, (max-width: 992px) ${tablet}, ${desktop}`;
};

/**
 * Optimize image loading with appropriate attributes
 * @param props Image properties
 * @returns Object with optimized image attributes
 */
export const optimizeImage = (props: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}) => {
  const { src, alt, width, height, priority, className } = props;
  
  return {
    src,
    alt,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    className: className || '',
  };
};

/**
 * Calculate aspect ratio for an image
 * @param width Image width
 * @param height Image height
 * @returns CSS padding-bottom value for maintaining aspect ratio
 */
export const calculateAspectRatio = (width: number, height: number): string => {
  return `${(height / width) * 100}%`;
};

/**
 * Determine if an element is in viewport
 * @param element DOM element to check
 * @param offset Offset before element is considered in viewport
 * @returns Boolean indicating if element is in viewport
 */
export const isInViewport = (element: HTMLElement, offset: number = 0): boolean => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight + offset) &&
    rect.bottom >= -offset &&
    rect.left <= (window.innerWidth + offset) &&
    rect.right >= -offset
  );
};

/**
 * Defer non-critical resources
 * @param callback Function to execute after initial page load
 */
export const deferNonCritical = (callback: () => void): void => {
  if (typeof window !== 'undefined') {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1);
    }
  }
};

/**
 * Preload critical assets
 * @param urls Array of URLs to preload
 * @param type Resource type (default: image)
 */
export const preloadCriticalAssets = (urls: string[], type: 'image' | 'style' | 'script' = 'image'): void => {
  if (typeof document !== 'undefined') {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = type;
      document.head.appendChild(link);
    });
  }
};
/**
 * Responsive Design Utilities
 * 
 * This file contains utilities for responsive design, including
 * breakpoints, media queries, and helper functions.
 */

/**
 * Breakpoints for responsive design
 * These match the Tailwind CSS breakpoints
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Media query strings for use in styled-components or other CSS-in-JS libraries
 */
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  
  // Max-width queries (for mobile-first design)
  xsMax: `@media (max-width: ${breakpoints.sm - 1}px)`,
  smMax: `@media (max-width: ${breakpoints.md - 1}px)`,
  mdMax: `@media (max-width: ${breakpoints.lg - 1}px)`,
  lgMax: `@media (max-width: ${breakpoints.xl - 1}px)`,
  xlMax: `@media (max-width: ${breakpoints['2xl'] - 1}px)`,
  
  // Orientation queries
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
};

/**
 * Check if the current viewport is mobile
 * @returns True if the viewport is mobile
 * 
 * Note: This function should be used in client-side code only
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if the current viewport is tablet
 * @returns True if the viewport is tablet
 * 
 * Note: This function should be used in client-side code only
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Check if the current viewport is desktop
 * @returns True if the viewport is desktop
 * 
 * Note: This function should be used in client-side code only
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Hook to get the current viewport size
 * @returns Object with viewport size information
 * 
 * Note: This function should be used in client-side code only
 */
export const useViewport = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return {
    width,
    height,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
};
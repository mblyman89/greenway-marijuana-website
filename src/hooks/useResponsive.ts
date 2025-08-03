import { useState, useEffect } from 'react';
import { breakpoints } from '../lib/responsive';

/**
 * Hook to handle responsive behavior in React components
 * @returns Object with responsive information
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [responsive, setResponsive] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Update responsive state
      setResponsive({
        isMobile: window.innerWidth < breakpoints.md,
        isTablet: window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
        isDesktop: window.innerWidth >= breakpoints.lg && window.innerWidth < breakpoints.xl,
        isLargeDesktop: window.innerWidth >= breakpoints.xl,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return {
    ...windowSize,
    ...responsive,
    breakpoints,
  };
};

export default useResponsive;
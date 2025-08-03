import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for lazy loading components when they enter the viewport
 * @param options Configuration options
 * @returns Object with ref and isVisible state
 */
const useLazyLoad = (options: UseLazyLoadOptions = {}) => {
  const { 
    threshold = 0.1,
    rootMargin = '200px 0px',
    triggerOnce = true
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const wasTriggered = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || (triggerOnce && wasTriggered.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        
        if (isElementVisible) {
          setIsVisible(true);
          wasTriggered.current = true;
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref: elementRef, isVisible };
};

export default useLazyLoad;
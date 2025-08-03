import React, { useState } from 'react';
import useLazyLoad from '../hooks/useLazyLoad';
import { optimizeImage } from '../utils/performance';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = '#f3f4f6',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { ref, isVisible } = useLazyLoad({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  // Calculate aspect ratio for placeholder
  const aspectRatio = height && width ? `${(height / width) * 100}%` : '100%';

  // If priority is true, load immediately without lazy loading
  const shouldLoad = priority || isVisible;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  const imageProps = optimizeImage({
    src,
    alt,
    width,
    height,
    priority,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
  });

  return (
    <div
      ref={priority ? undefined : ref}
      className="relative overflow-hidden"
      style={{ paddingBottom: aspectRatio }}
    >
      {/* Placeholder */}
      <div
        className={`absolute inset-0 ${isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={{ backgroundColor: placeholderColor }}
      />

      {/* Actual image */}
      {shouldLoad && !isError && (
        <img
          {...imageProps}
          onLoad={handleLoad}
          onError={handleError}
          className={`${imageProps.className} absolute inset-0 w-full h-full object-cover`}
        />
      )}

      {/* Error fallback */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
import React, { useState, useCallback, useRef, useEffect } from "react";
import { ResponsiveImage } from "@/lib/image-optimization";

interface OptimizedLazyImageProps {
  image: ResponsiveImage;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  priority?: boolean;
}

export default function OptimizedLazyImage({ 
  image, 
  className = "", 
  onClick, 
  style,
  priority = false 
}: OptimizedLazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const [lqipLoaded, setLqipLoaded] = useState(false);

  // Intersection Observer for lazy loading
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    });
  }, []);

  useEffect(() => {
    if (priority) return; // Skip observer if priority loading

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '100px', // Load images 100px before they come into view
      threshold: 0.1
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [observerCallback, priority]);

  // Load LQIP first
  useEffect(() => {
    if (isInView && !lqipLoaded) {
      const img = new Image();
      img.onload = () => setLqipLoaded(true);
      img.src = image.lqip;
    }
  }, [isInView, image.lqip, lqipLoaded]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
      onClick={onClick} 
      style={style}
    >
      {/* Loading placeholder with subtle animation */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          {lqipLoaded ? (
            // LQIP blur placeholder
            <img
              src={image.lqip}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
              style={{ filter: 'blur(8px) brightness(1.1)' }}
            />
          ) : (
            // Loading spinner
            <div className="w-8 h-8 border-2 border-gray-300 border-t-soft-gold rounded-full animate-spin loading-spinner"></div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
      
      {/* Actual high-res image with responsive loading */}
      {isInView && (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          alt={image.alt}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={image.width}
          height={image.height}
        />
      )}

      {/* Subtle overlay for better text readability on hover */}
      {onClick && (
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 cursor-pointer" />
      )}
    </div>
  );
}
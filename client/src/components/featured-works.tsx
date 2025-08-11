import React, { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Advanced LazyImage with progressive loading and blur effect
function LazyImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
          }
        });
      },
      { 
        rootMargin: '200px',
        threshold: 0.1 
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* Shimmer loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img 
          src={src}
          alt={alt}
          className={`${className} transition-all duration-1000 ease-out ${
            isLoaded 
              ? 'opacity-100 scale-100 blur-0' 
              : 'opacity-0 scale-110 blur-sm'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">📷</div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeaturedWorks() {
  const { isVisible, ref: elementRef } = useScrollAnimation();
  const featuredWorks = [
    {
      id: 1,
      image: "/images/optimized/culture-main-thumb.webp",
      title: "Cultural Heritage",
      description: "Celebrating traditions through intimate portraiture",
      category: "culture"
    },
    {
      id: 2,
      image: "/images/optimized/lifestyle-main-thumb.webp",
      title: "Lifestyle Elegance", 
      description: "Urban photography with timeless appeal",
      category: "lifestyle"
    },
    {
      id: 3,
      image: "/images/optimized/romantic-main-thumb.webp",
      title: "Romantic Moments",
      description: "Capturing love stories with artistic vision",
      category: "romantic"
    }
  ];

  return (
    <section ref={elementRef} className="py-20 bg-ivory dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 featured-work-fade-up ${isVisible ? 'animate' : ''}`}>
          <h2 className="font-copernicus text-4xl md:text-5xl font-bold mb-6">Featured Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated selection of our most compelling photography, spanning diverse styles and meaningful moments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorks.map((work, index) => (
            <div 
              key={work.id} 
              className={`featured-work-card group cursor-pointer ${isVisible ? 'animate' : ''}`} 
              data-category={work.category}
              style={{ 
                animationDelay: `${(index + 1) * 0.15}s`,
                transitionDelay: `${(index + 1) * 0.15}s`
              }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1">
                {/* Image container with sophisticated hover effects */}
                <div className="relative overflow-hidden">
                  <LazyImage 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Elegant overlay with smooth reveal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Category badge */}
                    <div className="absolute top-4 right-4 transform translate-x-8 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                        {work.category}
                      </span>
                    </div>
                    
                    {/* Content with staggered animations */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                      <h3 className="font-copernicus text-2xl font-bold mb-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                        {work.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                        {work.description}
                      </p>
                      
                      {/* View button with elegant animation */}
                      <div className="mt-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-400">
                        <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors duration-300 border border-white/30">
                          View Gallery
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

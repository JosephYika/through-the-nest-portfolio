import React, { useState, useEffect, useRef, useCallback } from "react";
import OptimizedLazyImage from "./OptimizedLazyImage";
import { getWeddingImages, ResponsiveImage } from "@/lib/image-optimization";

interface VirtualizedWeddingGalleryProps {
  onImageClick: (images: ResponsiveImage[], currentIndex: number, title: string, description: string) => void;
}

export default function VirtualizedWeddingGallery({ onImageClick }: VirtualizedWeddingGalleryProps) {
  const [visibleImages, setVisibleImages] = useState<ResponsiveImage[]>([]);
  const [loadedCount, setLoadedCount] = useState(3); // Start with first 3 images
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const allImages = getWeddingImages();
  
  // Load initial images
  useEffect(() => {
    setVisibleImages(allImages.slice(0, loadedCount));
  }, [loadedCount]);

  // Intersection observer for infinite loading
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && loadedCount < allImages.length && !isLoadingMore) {
      setIsLoadingMore(true);
      
      // Simulate slight delay for smooth UX
      setTimeout(() => {
        setLoadedCount(prev => Math.min(prev + 2, allImages.length)); // Load 2 more at a time
        setIsLoadingMore(false);
      }, 300);
    }
  }, [loadedCount, allImages.length, isLoadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '200px', // Start loading when 200px away
      threshold: 0.1
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [observerCallback]);

  const handleImageClick = (index: number) => {
    onImageClick(
      allImages, 
      index, 
      "Historic Venue Romance", 
      "Wedding Photography"
    );
  };

  return (
    <div className="space-y-4">
      {/* Images Grid */}
      <div className="masonry-grid">
        {visibleImages.map((image, index) => (
          <div
            key={`wedding-virtualized-${index}`}
            className="portfolio-item"
            data-category="wedding"
          >
            <div 
              className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <OptimizedLazyImage 
                image={image}
                className="w-full h-56 sm:h-64 lg:h-72"
                priority={index < 3} // Prioritize first 3 images
              />
              
              {/* Hover overlay with image info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium truncate">
                    Wedding Photo {index + 1} of {allImages.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator and sentinel */}
      {loadedCount < allImages.length && (
        <div ref={sentinelRef} className="py-8 text-center">
          {isLoadingMore ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-soft-gold rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-300">Loading more wedding photos...</span>
            </div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Showing {visibleImages.length} of {allImages.length} photos
            </div>
          )}
        </div>
      )}

      {/* Completion message */}
      {loadedCount >= allImages.length && visibleImages.length > 3 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
          ✨ All wedding photos loaded
        </div>
      )}
    </div>
  );
}
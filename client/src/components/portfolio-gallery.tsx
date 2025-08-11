import React, { useState, useCallback, useRef } from "react";
import OptimizedLazyImage from "./OptimizedLazyImage";
import VirtualizedWeddingGallery from "./VirtualizedWeddingGallery";
import { getWeddingThumbnail, getWeddingImages } from "@/lib/image-optimization";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Lazy loading image component with intersection observer
function LazyImage({ src, alt, className, onClick, style }: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    });
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '50px', // Load images 50px before they come into view
      threshold: 0.1
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div ref={imgRef} className={`relative lazy-image-container ${className}`} onClick={onClick} style={style}>
      {/* Loading placeholder with optimized spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-soft-gold rounded-full loading-spinner"></div>
        </div>
      )}
      
      {/* Actual image with performance optimizations */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-300 fade-in-image ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"

          style={style}
        />
      )}
    </div>
  );
}

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllFilters, setShowAllFilters] = useState(false);

  const weddingThumbnail = getWeddingThumbnail();
  const weddingImages = getWeddingImages();

  const portfolioItems = [
    {
      id: 1,
      image: weddingThumbnail.src, // Use src for consistency
      responsiveImage: weddingThumbnail, // Store full responsive image
      images: weddingImages.map(img => img.src), // Convert to src strings for lightbox
      responsiveImages: weddingImages, // Store full responsive images
      title: "Historic Venue Romance",
      category: "wedding",
      description: "Wedding Photography"
    },
    {
      id: 2,
      image: "/images/SidePortraitMain_1754647610300.JPG",
      images: [
        "/images/SidePortraitMain_1754647610300.JPG",
        "/images/portrait-01.jpg",
        "/images/portrait-02.jpg",
        "/images/portrait-03.jpg",
        "/images/portrait-04.jpg"
      ],
      title: "Floral Poetry",
      category: "portrait",
      description: "Portrait Photography"
    },
    {
      id: 3,
      image: "/images/OldMoneyMain_1754647610299.JPG",
      images: ["/images/OldMoneyMain_1754647610299.JPG"],
      title: "Urban Elegance",
      category: "lifestyle",
      description: "Lifestyle Photography"
    },
    {
      id: 4,
      image: "/images/CultureMain_1754647610299.JPG",
      images: ["/images/CultureMain_1754647610299.JPG"],
      title: "Heritage & Tradition",
      category: "culture",
      description: "Cultural Photography"
    },
    {
      id: 5,
      image: "/images/RomanticMain_1754647610300.jpg",
      images: ["/images/RomanticMain_1754647610300.jpg"],
      title: "Love Stories",
      category: "romantic",
      description: "Romantic Photography"
    }
  ];

  // Mobile filters (only essential categories)
  const mobileFilters = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'portrait', label: 'Portraits' }
  ];

  // Desktop core categories
  const desktopCoreFilters = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'lifestyle', label: 'Lifestyle' }
  ];

  // Additional categories shown on "View More" (desktop only)
  const additionalFilters = [
    { id: 'culture', label: 'Culture' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'party', label: 'Party' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'sports', label: 'Sports' }
  ];

  const allDesktopFilters = [...desktopCoreFilters, ...additionalFilters];
  
  // Use mobile filters on small screens, desktop filters on larger screens
  const getMobileVisibleFilters = () => mobileFilters;
  const getDesktopVisibleFilters = () => showAllFilters ? allDesktopFilters : desktopCoreFilters;

  // Get all images for the selected category
  const getFilteredImages = () => {
    if (activeFilter === 'all') {
      return portfolioItems.flatMap(item => 
        item.images.map(img => ({
          src: img,
          title: item.title,
          description: item.description,
          category: item.category
        }))
      );
    } else {
      const categoryItems = portfolioItems.filter(item => item.category === activeFilter);
      return categoryItems.flatMap(item => 
        item.images.map(img => ({
          src: img,
          title: item.title,
          description: item.description,
          category: item.category
        }))
      );
    }
  };

  const filteredImages = getFilteredImages();

  const openLightbox = (portfolioItem: any) => {
    const event = new CustomEvent('openLightbox', { 
      detail: { 
        images: portfolioItem.images, // Now all are string arrays
        title: portfolioItem.title,
        description: portfolioItem.description,
        currentIndex: 0
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-ivory dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 fade-in">
          <h2 className="font-copernicus text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Portfolio</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
            Explore our diverse collection of photography spanning weddings, portraits, cultural celebrations, and lifestyle sessions.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="mb-8 sm:mb-12 fade-in">
          {/* Mobile Filter Row - Only 3 essential categories */}
          <div className="block sm:hidden">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {getMobileVisibleFilters().map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    activeFilter === filter.id
                      ? 'bg-soft-gold text-white'
                      : 'bg-white dark:bg-gray-700 text-charcoal dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-soft-gold hover:text-white hover:border-soft-gold'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Filter Row - Full functionality */}
          <div className="hidden sm:block">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-3 sm:gap-4 mb-4">
              {/* Core Filters - Centered */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                {getDesktopVisibleFilters().slice(0, 4).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                      activeFilter === filter.id
                        ? 'bg-soft-gold text-white'
                        : 'bg-white dark:bg-gray-700 text-charcoal dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-soft-gold hover:text-white hover:border-soft-gold'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              
              {/* View More/Less Toggle - Desktop only */}
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 bg-gray-100 dark:bg-gray-600 text-charcoal dark:text-white border border-gray-200 dark:border-gray-500 hover:bg-soft-gold hover:text-white hover:border-soft-gold flex items-center justify-center gap-2 text-sm sm:text-base sm:ml-4 mx-auto sm:mx-0 w-fit"
              >
                <span>{showAllFilters ? 'View Less' : 'View More'}</span>
                <i className={`fas transition-transform duration-300 text-xs sm:text-sm ${
                  showAllFilters ? 'fa-chevron-up rotate-180' : 'fa-chevron-down'
                }`}></i>
              </button>
            </div>
          </div>
          
          {/* Additional Filters - Desktop Only - Animated */}
          <div className={`hidden sm:flex flex-wrap justify-center gap-2 sm:gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
            showAllFilters 
              ? 'max-h-24 sm:max-h-32 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4'
          }`}>
            {additionalFilters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform text-sm sm:text-base ${
                  showAllFilters 
                    ? `translate-y-0 opacity-100 delay-[${index * 50}ms]` 
                    : 'translate-y-4 opacity-0'
                } ${
                  activeFilter === filter.id
                    ? 'bg-soft-gold text-white'
                    : 'bg-white dark:bg-gray-700 text-charcoal dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-soft-gold hover:text-white hover:border-soft-gold'
                }`}
                style={{
                  transitionDelay: showAllFilters ? `${index * 50}ms` : '0ms'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Portfolio Grid */}
        <PortfolioGrid activeFilter={activeFilter} portfolioItems={portfolioItems} openLightbox={openLightbox} filteredImages={filteredImages} />
      </div>
    </section>
  );
}

// Separate component for portfolio grid with animations
function PortfolioGrid({ activeFilter, portfolioItems, openLightbox, filteredImages }: any) {
  const { ref: gridRef, isVisible } = useScrollAnimation({ 
    threshold: 0.05, 
    rootMargin: '100px 0px -100px 0px' 
  });

  return (
    <div ref={gridRef} className="masonry-grid fade-in" id="portfolio-grid">
      {activeFilter === 'all' ? (
        // Show cards for "All Work" view
        portfolioItems.map((item: any, index: number) => (
          <PortfolioCard
            key={item.id}
            item={item}
            index={index}
            isVisible={isVisible}
            onClick={() => openLightbox(item)}
          />
        ))
      ) : activeFilter === 'wedding' ? (
        // Special virtualized view for wedding category
        <VirtualizedWeddingGallery 
          onImageClick={(images, currentIndex, title, description) => {
            const event = new CustomEvent('openLightbox', { 
              detail: { 
                images: images.map(img => img.src),
                title,
                description,
                currentIndex
              } 
            });
            window.dispatchEvent(event);
          }}
        />
      ) : (
        // Show all images for other specific categories
        filteredImages.map((image: any, index: number) => (
          <PortfolioCard
            key={`${image.category}-${index}`}
            item={{
              id: `${image.category}-${index}`,
              image: image.src,
              title: image.title,
              category: image.category,
              description: image.description
            }}
            index={index}
            isVisible={isVisible}
            isImageView={true}
            onClick={() => {
              const categoryItems = portfolioItems.filter((item: any) => item.category === activeFilter);
              const allImages = categoryItems.flatMap((item: any) => item.images);
              const event = new CustomEvent('openLightbox', { 
                detail: { 
                  images: allImages,
                  title: image.title,
                  description: image.description,
                  currentIndex: index
                } 
              });
              window.dispatchEvent(event);
            }}
          />
        ))
      )}
    </div>
  );
}

// Individual portfolio card component with animation
function PortfolioCard({ item, index, isVisible, onClick, isImageView = false }: any) {
  return (
    <div
      className={`portfolio-item portfolio-fade-up ${isVisible ? 'animate' : ''}`}
      data-category={item.category}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div 
        className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
        onClick={onClick}
      >
        {item.category === 'wedding' && item.responsiveImage ? (
          <OptimizedLazyImage 
            image={item.responsiveImage}
            className={`w-full h-52 sm:h-60 lg:h-64 object-cover`}
            priority={true}
          />
        ) : (
          <LazyImage 
            src={item.image} 
            alt={item.title}
            className={`w-full object-cover ${
              isImageView ? 'h-56 sm:h-64 lg:h-72' :
              item.category === 'romantic' ? 'h-64 sm:h-80 lg:h-96' : 
              item.category === 'culture' ? 'h-60 sm:h-72 lg:h-80' : 
              item.category === 'lifestyle' ? 'h-56 sm:h-64 lg:h-72' :
              item.category === 'portrait' ? 'h-72 sm:h-80 lg:h-[28rem]' : 'h-52 sm:h-60 lg:h-64'
            }`}
          />
        )}
        {!isImageView && (
          <div className="p-6">
            <h3 className="font-copernicus text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

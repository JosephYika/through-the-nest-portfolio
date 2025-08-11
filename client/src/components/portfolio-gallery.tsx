import React, { useState, useCallback, useRef } from "react";
import OptimizedLazyImage from "./OptimizedLazyImage";
import VirtualizedWeddingGallery from "./VirtualizedWeddingGallery";
import { getWeddingThumbnail, getWeddingImages, getRomanticImage, getBirthdayImage } from "@/lib/image-optimization";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Optimized lazy loading image component with intersection observer
const LazyImage = React.memo(({ src, alt, className, onClick, style }: {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Memoize observer callback
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    });
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '100px', // Increased margin for smoother loading
      threshold: 0.01, // Lower threshold for earlier loading
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observerCallback]);

  // Memoize load handler
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div ref={imgRef} className={`relative lazy-image-container ${className}`} onClick={onClick} style={style}>
      {/* Simplified loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg">
          <div className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-300 border-t-soft-gold rounded-full loading-spinner"></div>
        </div>
      )}
      
      {/* Actual image with performance optimizations */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          loading="lazy"
          decoding="async"
          style={style}
        />
      )}
    </div>
  );
});

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllFilters, setShowAllFilters] = useState(false);

  const weddingThumbnail = getWeddingThumbnail();
  const weddingImages = getWeddingImages();
  const romanticImage = getRomanticImage();
  const birthdayImage = getBirthdayImage();

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
        "/images/portrait-04.jpg",
        "/IMG_1436_1754916458211_large.webp",
        "/IMG_1442_1754916458213_large.webp",
        "/IMG_3687_1754916458214_large.webp",
        "/IMG_4385_1754916467536_large.webp",
        "/IMG_3688_1754916467537_large.webp",
        "/IMG_4384_1754916467538_large.webp"
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
      images: [
        "/images/CultureMain_1754647610299.JPG",
        "/IMG_1436_1754916458211_large.webp",
        "/IMG_1442_1754916458213_large.webp",
        "/IMG_3687_1754916458214_large.webp",
        "/IMG_4385_1754916467536_large.webp",
        "/IMG_3688_1754916467537_large.webp",
        "/IMG_4384_1754916467538_large.webp"
      ],
      title: "Heritage & Tradition",
      category: "culture",
      description: "Cultural Photography"
    },
    {
      id: 5,
      image: "/images/featured/romantic-main-medium.webp", // Fallback
      responsiveImage: romanticImage, // Use optimized responsive image
      images: ["/images/featured/romantic-main-large.webp"],
      title: "Love Stories",
      category: "romantic",
      description: "Romantic Photography"
    },
    {
      id: 6,
      image: "/BLVD9998_1754914886741_medium.webp", // Fallback
      responsiveImage: birthdayImage, // Use optimized responsive image
      images: ["/BLVD9998_1754914886741_large.webp"],
      title: "Birthdays",
      category: "birthday",
      description: "Birthday Photography"
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
          {/* Mobile Filter Row - Core categories + View More */}
          <div className="block sm:hidden">
            <div className="flex flex-col items-center gap-3 mb-4">
              {/* Core mobile filters */}
              <div className="flex flex-wrap justify-center gap-2">
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
              
              {/* View More/Less Toggle - Mobile */}
              <button
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="px-4 py-2 rounded-full font-medium transition-all duration-300 bg-gray-100 dark:bg-gray-600 text-charcoal dark:text-white border border-gray-200 dark:border-gray-500 hover:bg-soft-gold hover:text-white hover:border-soft-gold flex items-center justify-center gap-2 text-sm w-fit"
              >
                <span>{showAllFilters ? 'View Less' : 'View More'}</span>
                <i className={`fas transition-transform duration-300 text-xs ${
                  showAllFilters ? 'fa-chevron-up rotate-180' : 'fa-chevron-down'
                }`}></i>
              </button>
              
              {/* Additional mobile filters - when expanded */}
              <div className={`flex flex-wrap justify-center gap-2 transition-all duration-500 ease-in-out overflow-hidden ${
                showAllFilters 
                  ? 'max-h-24 opacity-100 transform translate-y-0' 
                  : 'max-h-0 opacity-0 transform -translate-y-4'
              }`}>
                {additionalFilters.map((filter, index) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform text-sm ${
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

// Separate component for portfolio grid with animations - optimized
function PortfolioGrid({ activeFilter, portfolioItems, openLightbox, filteredImages }: any) {
  const { ref: gridRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1, // Slightly higher threshold for better performance
    rootMargin: '50px 0px -50px 0px', // Reduced margin to prevent premature loading
    triggerOnce: true // Prevent repeated animations
  });

  // Memoize filtered content to prevent unnecessary re-renders
  const gridContent = React.useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioItems.map((item: any, index: number) => (
        <PortfolioCard
          key={item.id}
          item={item}
          index={index}
          isVisible={isVisible}
          onClick={() => openLightbox(item)}
        />
      ));
    } else {
      return filteredImages.map((image: any, index: number) => (
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
      ));
    }
  }, [activeFilter, portfolioItems, filteredImages, isVisible, openLightbox]);

  // Choose grid class based on filter
  const gridClass = activeFilter === 'all' ? 'masonry-grid' : activeFilter === 'wedding' ? 'wedding-grid' : 'category-grid';
  
  return (
    <div ref={gridRef} className={`${gridClass} fade-in`} id="portfolio-grid">
      {gridContent}
    </div>
  );
}

// Individual portfolio card component with animation - optimized for performance
function PortfolioCard({ item, index, isVisible, onClick, isImageView = false }: any) {
  // Memoize style calculations to prevent re-renders
  const cardStyle = React.useMemo(() => ({
    transitionDelay: `${Math.min(index * 0.1, 0.5)}s` // Cap delay at 0.5s to prevent long delays
  }), [index]);

  // Optimize height classes calculation
  const imageHeightClass = React.useMemo(() => {
    if (isImageView) return 'h-56 sm:h-64 lg:h-72';
    switch (item.category) {
      case 'romantic': return 'h-64 sm:h-80 lg:h-96';
      case 'culture': return 'h-60 sm:h-72 lg:h-80';
      case 'lifestyle': return 'h-56 sm:h-64 lg:h-72';
      case 'portrait': return 'h-72 sm:h-80 lg:h-[28rem]';
      case 'corporate': return 'h-72 sm:h-80 lg:h-96';
      default: return 'h-52 sm:h-60 lg:h-64';
    }
  }, [item.category, isImageView]);

  // Object position for corporate images to show top portion (faces)
  const objectPosition = item.category === 'corporate' ? 'object-top' : 'object-center';

  return (
    <div
      className={`portfolio-item portfolio-fade-up ${isVisible ? 'animate' : ''}`}
      data-category={item.category}
      style={cardStyle}
    >
      <div 
        className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 cursor-pointer will-change-transform"
        onClick={onClick}
      >
        {(item.category === 'wedding' || item.category === 'romantic' || item.category === 'birthday') && item.responsiveImage ? (
          <OptimizedLazyImage 
            image={item.responsiveImage}
            className={`w-full object-cover ${objectPosition} ${imageHeightClass}`}
            priority={index === 0} // Only prioritize first item
          />
        ) : (
          <LazyImage 
            src={item.image} 
            alt={item.title}
            className={`w-full object-cover ${objectPosition} ${imageHeightClass}`}
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

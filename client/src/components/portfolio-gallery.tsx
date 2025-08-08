import React, { useState, useCallback, useRef } from "react";

// Import new webp wedding images
import weddingImage1 from "@assets/BLVD9348_1754654186488.webp";
import weddingImage2 from "@assets/BLVD9340_1754654186489.webp";
import weddingImage3 from "@assets/BLVD9307_1754654186489.webp";
import weddingImage4 from "@assets/BLVD9264-1_1754654186490.webp";
import weddingImage5 from "@assets/BLVD9204_1754654186491.webp";
import weddingImage6 from "@assets/BLVD9185_1754654186491.webp";
import weddingImage7 from "@assets/BLVD9182_1754654186492.webp";
import weddingImage8 from "@assets/BLVD9180_1754654186492.webp";
import weddingImage9 from "@assets/BLVD9174_1754654186493.webp";

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
          fetchPriority={className?.includes('h-96') || className?.includes('h-[28rem]') ? 'high' : 'low'}
          style={style}
        />
      )}
    </div>
  );
}

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllFilters, setShowAllFilters] = useState(false);

  const portfolioItems = [
    {
      id: 1,
      image: weddingImage6, // BLVD9185 - Beautiful historic venue shot
      images: [
        weddingImage1,
        weddingImage2,
        weddingImage3,
        weddingImage4,
        weddingImage5,
        weddingImage6,
        weddingImage7,
        weddingImage8,
        weddingImage9
      ],
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

  // Core categories always visible
  const coreFilters = [
    { id: 'all', label: 'All Work' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'lifestyle', label: 'Lifestyle' }
  ];

  // Additional categories shown on "View More"
  const additionalFilters = [
    { id: 'birthday', label: 'Birthdays' },
    { id: 'party', label: 'Party' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'sports', label: 'Sports' }
  ];

  const allFilters = [...coreFilters, ...additionalFilters];
  const visibleFilters = showAllFilters ? allFilters : coreFilters;

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
        images: portfolioItem.images,
        title: portfolioItem.title,
        description: portfolioItem.description,
        currentIndex: 0
      } 
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="portfolio" className="py-20 bg-ivory dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-copernicus text-4xl md:text-5xl font-bold mb-6">Portfolio</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our diverse collection of photography spanning weddings, portraits, cultural celebrations, and lifestyle sessions.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="mb-12 fade-in">
          {/* Main Filter Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
            {/* Core Filters - Centered */}
            <div className="flex flex-wrap justify-center gap-4">
              {coreFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-soft-gold text-white'
                      : 'bg-white dark:bg-gray-700 text-charcoal dark:text-white border border-gray-200 dark:border-gray-600 hover:bg-soft-gold hover:text-white hover:border-soft-gold'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            {/* View More/Less Toggle - Right Side */}
            <button
              onClick={() => setShowAllFilters(!showAllFilters)}
              className="px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gray-100 dark:bg-gray-600 text-charcoal dark:text-white border border-gray-200 dark:border-gray-500 hover:bg-soft-gold hover:text-white hover:border-soft-gold flex items-center gap-2 ml-4"
            >
              <span>{showAllFilters ? 'View Less' : 'View More'}</span>
              <i className={`fas transition-transform duration-300 text-sm ${
                showAllFilters ? 'fa-chevron-up rotate-180' : 'fa-chevron-down'
              }`}></i>
            </button>
          </div>
          
          {/* Additional Filters - Animated */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
            showAllFilters 
              ? 'max-h-32 opacity-100 transform translate-y-0' 
              : 'max-h-0 opacity-0 transform -translate-y-4'
          }`}>
            {additionalFilters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform ${
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
        <div className="masonry-grid fade-in" id="portfolio-grid">
          {activeFilter === 'all' ? (
            // Show cards for "All Work" view
            portfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item"
                data-category={item.category}
              >
                <div 
                  className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
                  onClick={() => openLightbox(item)}
                >
                  <LazyImage 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full object-cover ${
                      item.category === 'romantic' ? 'h-96' : 
                      item.category === 'culture' ? 'h-80' : 
                      item.category === 'lifestyle' ? 'h-72' :
                      item.category === 'portrait' ? 'h-[28rem]' : 'h-64'
                    }`}
                  />
                  <div className="p-6">
                    <h3 className="font-copernicus text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show all images for specific category
            filteredImages.map((image, index) => (
              <div
                key={`${image.category}-${index}`}
                className="portfolio-item"
                data-category={image.category}
              >
                <div 
                  className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
                  onClick={() => {
                    const categoryItems = portfolioItems.filter(item => item.category === activeFilter);
                    const allImages = categoryItems.flatMap(item => item.images);
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
                >
                  <LazyImage 
                    src={image.src} 
                    alt={`${image.title} - ${index + 1}`}
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

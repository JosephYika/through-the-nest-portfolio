import React, { useState, useRef, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Optimized LazyImage component for featured works
function LazyImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { rootMargin: '150px', threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img 
      ref={imgRef}
      src={isInView ? src : undefined}
      alt={alt}
      className={`${className} transition-all duration-700 ease-out ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      }`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
    />
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
              className={`featured-work group cursor-pointer featured-work-fade-up ${isVisible ? 'animate' : ''} hover:scale-[1.02] transition-all duration-300`} 
              data-category={work.category}
              style={{ transitionDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <LazyImage 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-copernicus text-2xl font-bold mb-2">{work.title}</h3>
                    <p className="text-sm">{work.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

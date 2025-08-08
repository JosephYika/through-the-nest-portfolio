import { useState, useEffect } from "react";

export default function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleOpenLightbox = (event: any) => {
      const detail = event.detail;
      setImages(detail.images || [detail.imageSrc]); // Support both new and old format
      setCurrentIndex(detail.currentIndex || 0);
      setTitle(detail.title || "");
      setDescription(detail.description || "");
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openLightbox', handleOpenLightbox);

    return () => {
      window.removeEventListener('openLightbox', handleOpenLightbox);
    };
  }, []);

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  return (
    <div 
      className={`lightbox ${isOpen ? 'active' : ''}`}
      onClick={closeLightbox}
    >
      <div className="relative w-full h-full flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt="Portfolio image" 
          className="max-w-[95vw] max-h-[95vh] object-contain"
        />
        
        {/* Close button */}
        <button 
          onClick={closeLightbox}
          className="absolute top-4 right-4 text-white text-3xl hover:text-soft-gold transition-colors duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Navigation buttons - only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-soft-gold transition-colors duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-soft-gold transition-colors duration-200 bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}

        {/* Image counter and info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black/50 rounded-lg px-6 py-3">
          {images.length > 1 && (
            <p className="text-sm mb-1">
              {currentIndex + 1} of {images.length}
            </p>
          )}
          {title && <h3 className="font-copernicus text-lg font-bold">{title}</h3>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [backgroundPosition, setBackgroundPosition] = useState('45% 40%');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const updatePosition = () => {
      const isDesktop = window.innerWidth >= 1024;
      const newPosition = isDesktop ? '5% 35%' : '35% 40%';
      console.log('Screen width:', window.innerWidth, 'Position:', newPosition);
      setBackgroundPosition(newPosition);
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <section 
      id="home" 
      className="hero-bg min-h-screen flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/CultureMain_1754647610299.JPG)`,
        backgroundPosition
      }}
    >
      {/* Main Content Container - Perfectly Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto w-full fade-in">
          <h1 className="font-copernicus text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Capturing Life's <br />
            <span className="text-soft-gold">Precious Moments</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 font-light max-w-2xl mx-auto px-2">
            Through intimate storytelling and artistic vision, we create timeless photographs that celebrate your unique journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto lg:translate-x-3">
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="w-full sm:w-auto bg-soft-gold hover:bg-yellow-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
            >
              View Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-charcoal text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 text-center"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
      
      {/* Arrow at bottom of screen, horizontally aligned with button center */}
      <div className="absolute bottom-6 sm:bottom-8 animate-bounce" style={{
        left: '50%', 
        transform: 'translateX(-50%)'
      }}>
        <i className="fas fa-chevron-down text-white text-xl sm:text-2xl"></i>
      </div>
    </section>
  );
}

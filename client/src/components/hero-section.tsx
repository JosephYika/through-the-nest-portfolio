export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="hero-bg min-h-screen flex items-center justify-center text-center text-white relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/CultureMain_1754647610299.JPG)`
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 fade-in">
        <h1 className="font-copernicus text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Capturing Life's <br />
          <span className="text-soft-gold">Precious Moments</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light max-w-2xl mx-auto">
          Through intimate storytelling and artistic vision, we create timeless photographs that celebrate your unique journey.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button 
            onClick={() => scrollToSection('portfolio')}
            className="inline-block bg-soft-gold hover:bg-yellow-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Portfolio
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="inline-block border-2 border-white hover:bg-white hover:text-charcoal text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
          >
            Book Session
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-white text-2xl"></i>
      </div>
    </section>
  );
}

import photographerPortrait from "@assets/Udee-22_1754654628221.webp";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <div className="fade-in order-2 lg:order-1">
            <img 
              src={photographerPortrait}
              alt="Professional photographer behind Through The Nest" 
              className="rounded-2xl shadow-2xl w-full h-auto max-w-sm sm:max-w-md lg:max-w-lg mx-auto"
              loading="lazy"
            />
          </div>
          
          <div className="fade-in order-1 lg:order-2 text-center lg:text-left">
            <h2 className="font-copernicus text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Our Story</h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Through The Nest was born from a passion for capturing the authentic beauty in life's most precious moments. We believe that every photograph should tell a story, evoke emotion, and preserve memories that will be treasured for generations.
              </p>
              <p>
                Our approach combines artistic vision with technical excellence, creating images that are both visually stunning and deeply meaningful. Whether documenting a cultural celebration, an intimate portrait session, or a romantic wedding day, we bring the same level of care and creativity to every project.
              </p>
              <p>
                We specialize in capturing diverse stories - from traditional cultural heritage to modern lifestyle moments, always with respect, authenticity, and an eye for the extraordinary within the ordinary.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 sm:gap-8 text-center">
                <div>
                  <h3 className="font-copernicus text-2xl sm:text-3xl font-bold text-soft-gold mb-1 sm:mb-2">100+</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Sessions Captured</p>
                </div>
                <div>
                  <h3 className="font-copernicus text-2xl sm:text-3xl font-bold text-soft-gold mb-1 sm:mb-2">5+</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

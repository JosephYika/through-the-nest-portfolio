export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-charcoal dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="font-copernicus text-2xl font-bold mb-4">Through The Nest</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Capturing life's precious moments with artistry, authenticity, and care. Every photograph tells a story worth preserving.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                <i className="fab fa-pinterest text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('portfolio')} className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-soft-gold transition-colors duration-200">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Wedding Photography</span></li>
              <li><span className="text-gray-300">Portrait Sessions</span></li>
              <li><span className="text-gray-300">Cultural Events</span></li>
              <li><span className="text-gray-300">Lifestyle Photography</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Through The Nest. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            A <a href="#" className="text-soft-gold hover:underline">Cloud Nest</a> brand
          </p>
        </div>
      </div>
    </footer>
  );
}

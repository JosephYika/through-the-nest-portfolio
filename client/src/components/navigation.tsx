import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 transition-all duration-300" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <h1 className="font-copernicus text-2xl font-bold text-charcoal dark:text-white">Through The Nest</h1>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-charcoal dark:text-white hover:text-soft-gold transition-colors duration-200">Home</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-charcoal dark:text-white hover:text-soft-gold transition-colors duration-200">Portfolio</button>
              <button onClick={() => scrollToSection('about')} className="text-charcoal dark:text-white hover:text-soft-gold transition-colors duration-200">About</button>
              <button onClick={() => scrollToSection('services')} className="text-charcoal dark:text-white hover:text-soft-gold transition-colors duration-200">Services</button>
              <button onClick={() => scrollToSection('contact')} className="text-charcoal dark:text-white hover:text-soft-gold transition-colors duration-200">Contact</button>
            </div>
          </div>
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 transition-colors duration-200">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-charcoal dark:text-white">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 text-charcoal dark:text-white hover:text-soft-gold">Home</button>
            <button onClick={() => scrollToSection('portfolio')} className="block w-full text-left px-3 py-2 text-charcoal dark:text-white hover:text-soft-gold">Portfolio</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 text-charcoal dark:text-white hover:text-soft-gold">About</button>
            <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 text-charcoal dark:text-white hover:text-soft-gold">Services</button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 text-charcoal dark:text-white hover:text-soft-gold">Contact</button>
          </div>
        </div>
      )}
    </nav>
  );
}

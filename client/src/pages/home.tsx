import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedWorks from "@/components/featured-works";
import TestimonialCarousel from "@/components/testimonial-carousel";
import PortfolioGallery from "@/components/portfolio-gallery";
import Lightbox from "@/components/lightbox";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { useEffect } from "react";
import { initializeGSAP } from "@/lib/gsap";

export default function Home() {
  useEffect(() => {
    initializeGSAP();
  }, []);

  return (
    <div className="font-inter text-charcoal bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navigation />
      <HeroSection />
      <FeaturedWorks />
      <TestimonialCarousel />
      <PortfolioGallery />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
      <Lightbox />
    </div>
  );
}

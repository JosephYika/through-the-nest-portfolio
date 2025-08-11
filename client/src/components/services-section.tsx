import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ServicesSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const services = [
    {
      id: 1,
      icon: "fas fa-user",
      title: "Portrait Sessions",
      description: "Individual & lifestyle photography",
      features: [
        "90-minute session",
        "3 location changes",
        "50+ edited images",
        "Online gallery"
      ],
      price: "£350",
      isPopular: false
    },
    {
      id: 2,
      icon: "fas fa-heart",
      title: "Wedding Photography",
      description: "Complete wedding day coverage",
      features: [
        "8-hour coverage",
        "Engagement session",
        "500+ edited images",
        "Online gallery & prints"
      ],
      price: "£2,200",
      isPopular: true
    },
    {
      id: 3,
      icon: "fas fa-calendar-alt",
      title: "Cultural Events",
      description: "Celebrations & ceremonies",
      features: [
        "4-hour coverage",
        "Cultural sensitivity",
        "200+ edited images",
        "Family group photos"
      ],
      price: "£950",
      isPopular: false
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section ref={sectionRef} id="services" className="py-12 sm:py-16 lg:py-20 bg-ivory dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`services-header ${isVisible ? 'animate' : ''} text-center mb-12 sm:mb-16`}>
          <h2 className="font-copernicus text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Services & Packages</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
            Choose from our carefully crafted photography packages, each designed to capture your unique story with artistry and care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`service-card-entrance ${isVisible ? 'animate' : ''} bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                service.isPopular ? 'border-2 border-soft-gold relative' : ''
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              {service.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-soft-gold text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`service-icon ${isVisible ? 'animate' : ''} w-16 h-16 bg-soft-gold rounded-full flex items-center justify-center mx-auto mb-4`} style={{ transitionDelay: `${index * 0.2 + 0.2}s` }}>
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-copernicus text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <div 
                    key={featureIndex} 
                    className={`service-feature ${isVisible ? 'animate' : ''} flex items-center text-gray-600 dark:text-gray-300`}
                    style={{ transitionDelay: `${index * 0.2 + 0.3 + featureIndex * 0.05}s` }}
                  >
                    <i className="fas fa-check text-soft-gold mr-3"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className={`service-cta ${isVisible ? 'animate' : ''} text-center border-t border-gray-200 dark:border-gray-600 pt-6`} style={{ transitionDelay: `${index * 0.2 + 0.5}s` }}>
                <p className="font-copernicus text-3xl font-bold text-soft-gold mb-4">{service.price}</p>
                <button 
                  onClick={scrollToContact}
                  className="w-full bg-soft-gold hover:bg-yellow-600 hover:scale-105 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

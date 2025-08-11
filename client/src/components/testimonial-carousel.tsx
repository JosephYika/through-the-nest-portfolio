import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  const testimonials = [
    {
      id: 1,
      quote: "The photographs captured our cultural celebration perfectly. Every detail was preserved with artistry and respect.",
      name: "Amara Hassan",
      service: "Cultural Heritage Session",
      initial: "A"
    },
    {
      id: 2,
      quote: "Our wedding photos are absolutely breathtaking. They captured the joy, love, and magic of our special day.",
      name: "Sarah & Michael",
      service: "Wedding Photography",
      initial: "S"
    },
    {
      id: 3,
      quote: "Professional, creative, and incredibly talented. The lifestyle shots exceeded expectations and captured my brand perfectly.",
      name: "Elena Rodriguez",
      service: "Lifestyle Portfolio",
      initial: "E"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`testimonial-header ${isVisible ? 'animate' : ''} text-center mb-16`}>
          <h2 className="font-copernicus text-4xl md:text-5xl font-bold mb-6">What Clients Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hear from those who have trusted us to capture their most precious moments.
          </p>
        </div>
        
        <div className={`testimonial-carousel-entrance ${isVisible ? 'animate' : ''} relative`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-slide text-center ${index === currentTestimonial ? 'block' : 'hidden'}`}
            >
              <div className="mb-8">
                <div className={`testimonial-quote-icon ${isVisible ? 'animate' : ''}`} style={{ transitionDelay: '0.3s' }}>
                  <i className="fas fa-quote-left text-4xl text-soft-gold mb-6"></i>
                </div>
                <div className={`testimonial-quote-text ${isVisible ? 'animate' : ''}`} style={{ transitionDelay: '0.5s' }}>
                  <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8 min-h-[4rem] flex items-center justify-center">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className={`testimonial-author ${isVisible ? 'animate' : ''} text-center`} style={{ transitionDelay: '0.7s' }}>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation dots */}
          <div className={`testimonial-dots ${isVisible ? 'animate' : ''} flex justify-center space-x-2 mt-8`} style={{ transitionDelay: '0.9s' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`testimonial-dot ${isVisible ? 'animate' : ''} w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-soft-gold' : 'bg-gray-300'
                }`}
                style={{ transitionDelay: `${1.1 + index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

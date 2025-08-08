import { useState, useEffect } from "react";

export default function TestimonialCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="font-copernicus text-4xl md:text-5xl font-bold mb-6">What Clients Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hear from those who have trusted us to capture their most precious moments.
          </p>
        </div>
        
        <div className="testimonial-carousel relative fade-in">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-slide text-center ${index === currentTestimonial ? 'block' : 'hidden'}`}
            >
              <div className="mb-8">
                <i className="fas fa-quote-left text-4xl text-soft-gold mb-6"></i>
                <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 leading-relaxed mb-8 min-h-[4rem] flex items-center justify-center">
                  "{testimonial.quote}"
                </p>
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-soft-gold' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

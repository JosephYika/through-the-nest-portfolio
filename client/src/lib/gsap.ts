declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function initializeGSAP() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap, ScrollTrigger } = window;
  
  gsap.registerPlugin(ScrollTrigger);

  // Fade in animations
  gsap.set('.fade-in', { opacity: 0, y: 30 });

  gsap.to('.fade-in', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.fade-in',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });

  // Parallax effect for hero background
  gsap.to('.hero-bg', {
    backgroundPosition: '50% 50%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-bg',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Navigation background on scroll
  ScrollTrigger.create({
    start: 'top -100',
    end: 99999,
    toggleClass: {
      className: 'nav-scrolled',
      targets: '#navbar'
    }
  });

  // Portfolio hover animations
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, { y: -10, duration: 0.3, ease: 'power2.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, { y: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

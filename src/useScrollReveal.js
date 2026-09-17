import { useEffect } from 'react';

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
export default function useScrollReveal() {
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;

    const targets = [...document.querySelectorAll([
      '.about-grid > div',
      '.section-heading',
      '.skill-card',
      '.certification',
      '.lab-grid > article',
      '.education-grid > div:first-child',
      '.education-list > article',
      '.contact-panel',
    ].join(','))];
    let observer;

    function reset() {
      observer?.disconnect();
      targets.forEach(element => {
        element.classList.remove('scroll-reveal', 'is-revealed');
        element.style.removeProperty('--reveal-delay');
      });
    }

    function setup() {
      reset();
      if (motion.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });

      targets.forEach(element => {
        // Never hide content already visible on load or after hash navigation.
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) return;
        const siblings = [...element.parentElement.children];
        const index = siblings.indexOf(element);
        element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 75}ms`);
        element.classList.add('scroll-reveal');
        observer.observe(element);
      });
    }

    setup();
    motion.addEventListener('change', setup);
    return () => {
      motion.removeEventListener('change', setup);
      reset();
    };
  }, []);
}

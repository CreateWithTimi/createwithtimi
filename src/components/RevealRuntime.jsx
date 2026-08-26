import { useEffect, useRef } from 'react';

export default function RevealRuntime() {
  const observedElementsRef = useRef(new WeakSet());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    document.documentElement.classList.add('reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );

    const observeRevealElements = () => {
      document.querySelectorAll('[data-reveal]').forEach((element) => {
        if (observedElementsRef.current.has(element)) {
          return;
        }

        observedElementsRef.current.add(element);
        observer.observe(element);
      });
    };

    observeRevealElements();

    const mutationObserver = new MutationObserver(observeRevealElements);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}

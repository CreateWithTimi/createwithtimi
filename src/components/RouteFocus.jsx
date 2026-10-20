import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Mount inside Suspense so lazy route content exists before moving focus.
export default function RouteFocus() {
  const location = useLocation();

  useEffect(() => {
    let targetId = 'main-content';
    if (location.hash) {
      try { targetId = decodeURIComponent(location.hash.slice(1)); }
      catch { return undefined; }
    }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let observer;
    let frame;
    const moveToDestination = () => {
      const target = document.getElementById(targetId);
      const heading = document.querySelector('#main-content h1');
      if (!target || !heading) return false;
      frame = window.requestAnimationFrame(() => {
        if (location.hash) {
          target.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
        const focusTarget = location.hash ? target : heading;
        if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
        focusTarget.focus({ preventScroll: true });
      });
      return true;
    };
    if (!moveToDestination()) {
      observer = new MutationObserver(() => {
        if (moveToDestination()) observer.disconnect();
      });
      observer.observe(document.getElementById('main-content'), { childList: true, subtree: true });
    }
    return () => { observer?.disconnect(); window.cancelAnimationFrame(frame); };
  }, [location.pathname, location.hash, location.search]);

  return null;
}

import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteFooter from '../components/layout/SiteFooter.jsx';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import RouteMetadata from '../components/meta/RouteMetadata.jsx';
import RevealRuntime from '../components/RevealRuntime.jsx';

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const targetId = decodeURIComponent(location.hash.slice(1));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);

      target?.scrollIntoView({
        block: 'start',
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <RouteMetadata />
      <RevealRuntime />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" className="site-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

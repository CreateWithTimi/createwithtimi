import { Outlet } from 'react-router-dom';
import SiteFooter from '../components/layout/SiteFooter.jsx';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import RouteMetadata from '../components/meta/RouteMetadata.jsx';
import RevealRuntime from '../components/RevealRuntime.jsx';

export default function AppLayout() {

  return (
    <div className="site-shell">
      <RouteMetadata />
      <RevealRuntime />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main tabIndex="-1" id="main-content" className="site-main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

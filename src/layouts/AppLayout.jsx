import { NavLink, Outlet } from 'react-router-dom';
import { siteNavigation } from '../content/site.js';

export default function AppLayout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header" aria-label="Site header">
        <NavLink className="site-mark wordmark-compact" to="/" aria-label="CreateWithTimi Studio home">
          CWT
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {siteNavigation.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main-content" className="site-main">
        <Outlet />
      </main>
    </div>
  );
}

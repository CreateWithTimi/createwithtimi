import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteNavigation } from '../../content/site.js';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getNavigationCurrentValue(item, location) {
  if (item.kind === 'route') {
    return location.pathname === item.href ? 'page' : undefined;
  }

  return location.pathname === '/' && location.hash === `#${item.sectionId}`
    ? 'location'
    : undefined;
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const restoreFocusRef = useRef(false);

  const closeMenu = ({ restoreFocus = true } = {}) => {
    restoreFocusRef.current = restoreFocus;
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.classList.remove('menu-lock');

      if (restoreFocusRef.current) {
        triggerRef.current?.focus();
        restoreFocusRef.current = false;
      }

      return undefined;
    }

    document.body.classList.add('menu-lock');
    closeRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusable = Array.from(panelRef.current.querySelectorAll(focusableSelector)).filter(
        (element) => element.offsetParent !== null,
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('menu-lock');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header" aria-label="Site header">
      <Link className="site-mark wordmark-compact" to="/" aria-label="CreateWithTimi Studio home">
        CWT
      </Link>

      <nav className="site-nav site-nav--desktop" aria-label="Primary navigation">
        {siteNavigation.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={getNavigationCurrentValue(item, location)}
          >
            {item.label}
            {item.href === '/start-a-project' ? <span aria-hidden="true"> ↗</span> : null}
          </Link>
        ))}
      </nav>

      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls={menuId}
        aria-label="Open navigation menu"
        onClick={() => {
          restoreFocusRef.current = false;
          setIsMenuOpen(true);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      {isMenuOpen ? (
        <div className="mobile-menu" id={menuId} ref={panelRef} role="dialog" aria-modal="true">
          <div className="mobile-menu__bar">
            <Link
              className="wordmark-compact"
              to="/"
              aria-label="CreateWithTimi Studio home"
              onClick={() => closeMenu({ restoreFocus: false })}
            >
              CWT
            </Link>
            <button
              ref={closeRef}
              className="mobile-menu__close text-label"
              type="button"
              onClick={() => closeMenu()}
            >
              Close
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {siteNavigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                aria-current={getNavigationCurrentValue(item, location)}
                onClick={() => closeMenu({ restoreFocus: false })}
              >
                {item.label}
                {item.href === '/start-a-project' ? <span aria-hidden="true"> ↗</span> : null}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

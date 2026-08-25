import { Link } from 'react-router-dom';
import { siteNavigation } from '../../content/site.js';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer section-inverse">
      <div className="container-wide editorial-grid site-footer__inner">
        <div className="site-footer__identity">
          <Link className="wordmark-full site-footer__name" to="/">
            CREATEWITHTIMI
          </Link>
          <p>Independent creative-technology studio.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {siteNavigation.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.label}
              {item.href === '/start-a-project' ? <span aria-hidden="true"> ↗</span> : null}
            </Link>
          ))}
        </nav>

        <p className="site-footer__meta text-label">© CWT Studio {year}</p>
      </div>
    </footer>
  );
}

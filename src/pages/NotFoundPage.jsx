import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="placeholder-page" aria-labelledby="not-found-title">
      <div className="container-wide editorial-grid placeholder-page__inner">
        <div className="placeholder-page__content">
          <p className="placeholder-page__eyebrow text-label">404</p>
          <h1 id="not-found-title">Page not found</h1>
          <p>The page you are looking for is not part of the V1 route architecture.</p>
          <Link className="text-link" to="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}

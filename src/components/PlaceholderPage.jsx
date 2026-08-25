export default function PlaceholderPage({ eyebrow, title, body }) {
  return (
    <section className="placeholder-page" aria-labelledby="page-title">
      <div className="container-wide editorial-grid placeholder-page__inner">
        <div className="placeholder-page__content">
          <p className="placeholder-page__eyebrow text-label">{eyebrow}</p>
          <h1 id="page-title">{title}</h1>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}

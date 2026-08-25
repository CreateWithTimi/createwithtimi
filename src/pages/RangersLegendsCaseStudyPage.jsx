import { Link } from 'react-router-dom';
import cardBackImage from '../assets/C01 — THE LEGEND-BACK.png';
import cardFrontImage from '../assets/C01 — THE LEGEND-FRONT.png';
import teeImage from '../assets/TEE 01.png';
import collectionHeroImage from '../assets/collection-hero-main.png';
import comicPageImage from '../assets/comic-page-01.png';
import graphicChairmanImage from '../assets/graphic-chairman-01.png';
import interfaceImage from '../assets/rangers-interface-home.png';
import { rangersLegendsCaseStudy } from '../content/projects/rangersLegends.js';

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

const mediaByExperience = {
  read: {
    src: comicPageImage,
    alt: 'Comic page artwork from the Rangers Legends concept.',
  },
  explore: {
    src: interfaceImage,
    alt: 'Rangers Legends live website interface screenshot.',
  },
  share: {
    src: graphicChairmanImage,
    alt: 'Rangers Legends Chairman graphic poster concept.',
  },
  wear: {
    src: teeImage,
    alt: 'Rangers Legends Chairman T-shirt concept board.',
  },
};

export default function RangersLegendsCaseStudyPage() {
  const caseStudy = rangersLegendsCaseStudy;

  return (
    <article className="rangers-case story-world">
      <section className="case-hero section-inverse site-section--loose" aria-labelledby="case-title">
        <div className="container-wide editorial-grid case-hero__grid">
          <div className="case-hero__copy">
            <Link className="text-link case-back-link" to={caseStudy.backLink.href}>
              {caseStudy.backLink.label} <Arrow />
            </Link>
            <p className="text-label section-kicker">{caseStudy.intro.eyebrow}</p>
            <h1 id="case-title">
              {caseStudy.intro.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="case-hero__statement text-label">
              {caseStudy.intro.statement.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="case-hero__body text-body-lg">{caseStudy.intro.body}</p>
            <ul className="case-taxonomy" aria-label="Project taxonomy">
              {caseStudy.intro.taxonomy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="case-status text-label">{caseStudy.intro.status}</p>
            <a
              className="text-link"
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${caseStudy.intro.cta} at rangers-legends.vercel.app`}
            >
              {caseStudy.intro.cta} <ExternalArrow />
            </a>
          </div>

          <figure className="case-hero__media">
            <img
              src={collectionHeroImage}
              alt="Rangers Legends Collection 001 world board with Christian Chukwu story and related artifacts."
            />
            <figcaption className="text-label">World / Primary object</figcaption>
          </figure>
        </div>
      </section>

      <section className="case-opportunity site-section" aria-labelledby="case-opportunity-title">
        <div className="container-wide editorial-grid">
          <p className="text-label section-kicker case-act-label">{caseStudy.opportunity.eyebrow}</p>
          <h2 id="case-opportunity-title">
            {caseStudy.opportunity.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="case-copy flow">
            {caseStudy.opportunity.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="case-idea site-section--loose section-inverse" aria-labelledby="case-idea-title">
        <div className="container-wide editorial-grid case-idea__grid">
          <div className="case-idea__statement">
            <p className="text-label section-kicker">{caseStudy.idea.eyebrow}</p>
            <h2 id="case-idea-title">
              {caseStudy.idea.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="case-idea__body">
            <p>{caseStudy.idea.body}</p>
            <div className="case-strategy-move" aria-label="Strategic move">
              <p className="text-label">{caseStudy.idea.move.from}</p>
              <span aria-hidden="true">→</span>
              <p className="text-label">{caseStudy.idea.move.to}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="case-expansion site-section--loose" aria-labelledby="case-expansion-title">
        <div className="container-wide editorial-grid">
          <div className="case-expansion__intro">
            <p className="text-label section-kicker">{caseStudy.expansion.eyebrow}</p>
            <h2 id="case-expansion-title">
              {caseStudy.expansion.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>

          <ol className="case-ladder" aria-label="Story to world expansion">
            {caseStudy.expansion.stages.map((stage) => (
              <li key={stage.label}>
                <p className="text-label">{stage.label}</p>
                <h3>{stage.title}</h3>
              </li>
            ))}
          </ol>

          <ul className="case-experience-strip" aria-label="Experience expressions">
            {caseStudy.expansion.experiences.map((item) => (
              <li key={item.verb}>
                <span className="text-label">{item.verb}</span>
                <p>{item.medium}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-system site-section--loose" aria-labelledby="case-system-title">
        <div className="container-wide editorial-grid case-system__intro">
          <p className="text-label section-kicker">{caseStudy.system.eyebrow}</p>
          <div>
            <h2 id="case-system-title">
              {caseStudy.system.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{caseStudy.system.body}</p>
          </div>
        </div>

        <div className="container-wide experience-list">
          {caseStudy.system.items.map((item) => (
            <article className={`experience-item experience-item--${item.id}`} key={item.id}>
              <div className="experience-item__copy">
                <p className="text-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>

              {item.id === 'collect' ? (
                <figure className="experience-item__media experience-item__media--cards">
                  <div className="case-card-pair" aria-label="Collectible card front and back">
                    <img
                      src={cardBackImage}
                      alt="Back of the Rangers Legends Christian Chukwu collectible card."
                    />
                    <img
                      src={cardFrontImage}
                      alt="Front of the Rangers Legends Christian Chukwu collectible card."
                    />
                  </div>
                  <figcaption className="text-label">Cards / Front and back</figcaption>
                </figure>
              ) : (
                <figure className="experience-item__media">
                  <img src={mediaByExperience[item.id].src} alt={mediaByExperience[item.id].alt} />
                  <figcaption className="text-label">{item.label}</figcaption>
                </figure>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="case-proves section-inverse site-section--loose" aria-labelledby="case-proves-title">
        <div className="container-wide editorial-grid">
          <p className="text-label section-kicker">{caseStudy.proves.eyebrow}</p>
          <h2 id="case-proves-title">
            {caseStudy.proves.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <div className="case-proves__copy flow">
            {caseStudy.proves.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="case-category-strip" aria-label="Possible application categories">
            {caseStudy.proves.categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-live-bridge site-section--loose" aria-labelledby="case-live-title">
        <div className="container-wide editorial-grid">
          <div className="case-live-bridge__copy">
            <p className="text-label section-kicker">{caseStudy.liveBridge.eyebrow}</p>
            <h2 id="case-live-title">
              {caseStudy.liveBridge.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="case-live-bridge__action">
            <p>{caseStudy.liveBridge.body}</p>
            <a
              className="text-link"
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${caseStudy.liveBridge.cta} at rangers-legends.vercel.app`}
            >
              {caseStudy.liveBridge.cta} <ExternalArrow />
            </a>
          </div>
        </div>
      </section>

      <section className="case-next-cta section-inverse site-section--loose" aria-labelledby="case-next-title">
        <div className="container-wide editorial-grid">
          <div>
            <p className="text-label section-kicker">{caseStudy.nextCta.eyebrow}</p>
            <h2 id="case-next-title">
              {caseStudy.nextCta.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="case-next-cta__body">
            <p>{caseStudy.nextCta.body}</p>
            <Link className="text-link" to={caseStudy.nextCta.href}>
              {caseStudy.nextCta.cta} <ExternalArrow />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

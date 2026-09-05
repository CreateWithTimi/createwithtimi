import { Link } from 'react-router-dom';
import heroImage from '../assets/optimized/omniretail/omni-page01-hero-1400.jpg';
import omniLogo from '../assets/omniretail/originals/omni-retail-logo.png';
import someoneAsksImage from '../assets/optimized/omniretail/omni-page02-someone-asks-1100.jpg';
import someoneAvailableImage from '../assets/optimized/omniretail/omni-page02-someone-has-to-make-it-available-1100.jpg';
import someoneMoveImage from '../assets/optimized/omniretail/omni-page02-someone-has-to-move-it-1100.jpg';
import someoneStockImage from '../assets/optimized/omniretail/omni-page02-someone-has-to-stock-it-1100.jpg';
import someoneNeedsImage from '../assets/optimized/omniretail/omni-page02-someone-needs-it-1100.jpg';
import opportunityImage from '../assets/optimized/omniretail/omni-page03-opportunity-1300.jpg';
import defineImage from '../assets/optimized/omniretail/omni-page04-define-1100.jpg';
import discoveryImage from '../assets/optimized/omniretail/omni-page04-discovery-1100.jpg';
import prototypeImage from '../assets/optimized/omniretail/omni-page04-prototype-1100.jpg';
import invitationImage from '../assets/optimized/omniretail/omni-page05-invitation-1400.jpg';
import { omniRetailStudy } from '../content/projects/omniRetail.js';

const worldImages = {
  needs: someoneNeedsImage,
  stock: someoneStockImage,
  move: someoneMoveImage,
  available: someoneAvailableImage,
  asks: someoneAsksImage,
};

const wayInImages = {
  discovery: discoveryImage,
  define: defineImage,
  prototype: prototypeImage,
};

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function OmniRetailCaseStudyPage() {
  const study = omniRetailStudy;

  return (
    <article className="omni-study story-world">
      <section className="omni-hero site-section--loose" aria-labelledby="omni-title">
        <div className="container-wide editorial-grid omni-hero__grid">
          <div className="omni-hero__copy" data-reveal="rise">
            <Link className="text-link case-back-link" to="/#work">
              Back to work <Arrow />
            </Link>
            <p className="text-label section-kicker">{study.eyebrow}</p>
            <div className="omni-hero__brand">
              <img src={omniLogo} alt="OmniRetail logo." width="500" height="500" />
              <p className="omni-hero__subject text-label">{study.subject}</p>
            </div>
            <h1 id="omni-title">
              {study.hero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="text-body-lg">{study.hero.body}</p>
            <p className="omni-hero__provocation">{study.hero.provocation}</p>
            <dl className="omni-meta">
              <div>
                <dt className="text-label">Exploration</dt>
                <dd>{study.wayIn}</dd>
              </div>
              <div>
                <dt className="text-label">Status</dt>
                <dd>{study.status}</dd>
              </div>
              <div>
                <dt className="text-label">Focus</dt>
                <dd>{study.focus}</dd>
              </div>
            </dl>
            <p className="omni-study__note">{study.hero.context}</p>
          </div>

          <figure className="omni-hero__media" data-reveal="media">
            <img
              src={heroImage}
              alt="Cinematic neighbourhood shop scene for the OmniRetail creative study."
              width="1400"
              height="788"
              decoding="async"
            />
            <figcaption className="text-label">Observation / Neighbourhood shelf</figcaption>
          </figure>
        </div>
      </section>

      <section className="omni-world site-section--loose" aria-labelledby="omni-world-title">
        <div className="container-wide editorial-grid omni-world__intro">
          <p className="text-label section-kicker">{study.world.eyebrow}</p>
          <div>
            <h2 id="omni-world-title">
              {study.world.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{study.world.body}</p>
          </div>
        </div>

        <div className="container-wide omni-beat-list" data-reveal="stagger">
          {study.world.beats.map((beat) => (
            <article className="omni-beat" data-reveal-item key={beat.number}>
              <figure className="omni-beat__media">
                <img
                  src={worldImages[beat.image]}
                  alt={beat.alt}
                  width="1100"
                  height="619"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="omni-beat__copy">
                <p className="text-label">{beat.number}</p>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="container-wide editorial-grid omni-world__close">
          <p className="text-label">{study.world.close.title}</p>
          <p>{study.world.close.body}</p>
        </div>
      </section>

      <section className="omni-opportunity site-section--loose section-inverse" aria-labelledby="omni-opportunity-title">
        <div className="container-wide editorial-grid omni-opportunity__grid">
          <div className="omni-opportunity__copy">
            <p className="text-label section-kicker">{study.opportunity.eyebrow}</p>
            <h2 id="omni-opportunity-title">
              {study.opportunity.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <div className="flow">
              {study.opportunity.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <figure className="omni-opportunity__media" data-reveal="media">
            <img
              src={opportunityImage}
              alt="Human network and creative expressions visual for the OmniRetail study."
              width="1300"
              height="866"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="text-label">Network / Possible expressions</figcaption>
          </figure>

          <div className="omni-expression-list" data-reveal="stagger">
            {study.opportunity.expressions.map((item) => (
              <article data-reveal-item key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="omni-opportunity__close">
            <p className="text-label">{study.opportunity.conclusion}</p>
            <p>{study.opportunity.bridge}</p>
          </div>
        </div>
      </section>

      <section className="omni-way-in site-section--loose" aria-labelledby="omni-way-in-title">
        <div className="container-wide editorial-grid omni-way-in__intro">
          <p className="text-label section-kicker">{study.wayInSection.eyebrow}</p>
          <div>
            <h2 id="omni-way-in-title">
              {study.wayInSection.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{study.wayInSection.body}</p>
          </div>
        </div>

        <div className="container-wide omni-sprint-list" data-reveal="stagger">
          {study.wayInSection.stages.map((stage) => (
            <article className="omni-sprint-step" data-reveal-item key={stage.number}>
              <figure>
                <img
                  src={wayInImages[stage.image]}
                  alt={stage.alt}
                  width="1100"
                  height="733"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="omni-sprint-step__copy">
                <p className="text-label">{stage.number} / {stage.title}</p>
                <h3>{stage.question}</h3>
                <p>{stage.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="container-wide editorial-grid omni-way-in__outcome">
          <h3>
            {study.wayInSection.outcome.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p className="text-label">
            {study.wayInSection.method} / {study.wayInSection.methodFlow}
          </p>
        </div>
      </section>

      <section className="omni-invitation site-section--loose" aria-labelledby="omni-invitation-title">
        <div className="container-wide editorial-grid omni-invitation__grid">
          <figure className="omni-invitation__media" data-reveal="media">
            <img
              src={invitationImage}
              alt="Quiet neighbourhood shop at dusk for the OmniRetail creative study."
              width="1400"
              height="788"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="omni-invitation__copy">
            <p className="text-label section-kicker">{study.invitation.eyebrow}</p>
            <h2 id="omni-invitation-title">
              {study.invitation.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{study.invitation.body}</p>
            <p className="omni-invitation__statement text-label">{study.invitation.ctaStatement}</p>
            <p className="text-label">
              {study.invitation.method} / {study.invitation.methodFlow}
            </p>
            <Link className="text-link" to={study.invitation.cta.href}>
              {study.invitation.cta.label} <Arrow />
            </Link>
            <p className="omni-study__note">{study.invitation.note}</p>
          </div>
        </div>
      </section>
    </article>
  );
}

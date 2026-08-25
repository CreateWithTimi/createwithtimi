import { Link } from 'react-router-dom';
import cardBackImage from '../assets/C01 — THE LEGEND-BACK.png';
import cardFrontImage from '../assets/C01 — THE LEGEND-FRONT.png';
import interfaceImage from '../assets/rangers-interface-home.png';
import teeImage from '../assets/TEE 01.png';
import collectionHeroImage from '../assets/collection-hero-main.png';
import comicPageImage from '../assets/comic-page-01.png';
import {
  audienceOutcomes,
  featuredWorld,
  finalCta,
  homeHero,
  methodSteps,
  offers,
  storyProgression,
} from '../content/home.js';

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero site-section--loose" aria-labelledby="home-hero-title">
        <div className="container-wide editorial-grid home-hero__grid">
          <div className="home-hero__statement">
            <p className="text-label section-kicker">{homeHero.eyebrow}</p>
            <h1 id="home-hero-title">
              {homeHero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="home-hero__body text-body-lg">{homeHero.body}</p>
            <a className="text-link" href={homeHero.cta.href}>
              {homeHero.cta.label} <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="home-hero__system" aria-label="CreateWithTimi transformation approach">
            <p className="text-label section-kicker">Story / World / Experience</p>
            <ol className="transformation-list">
              {storyProgression.map((item) => (
                <li key={item.title}>
                  <span className="transformation-list__title text-label">{item.title}</span>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
            <ul className="principle-list" aria-label="Studio principles">
              <li>Story first</li>
              <li>Design led</li>
              <li>Technology enabled</li>
              <li>Culture driven</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="story-system site-section" aria-labelledby="story-system-title">
        <div className="container-wide editorial-grid">
          <div className="story-system__intro">
            <p className="text-label section-kicker">Story → World → Experience</p>
            <h2 id="story-system-title">The medium follows the story.</h2>
          </div>
          <div className="story-system__map" aria-label="How a story becomes a world">
            {storyProgression.map((item, index) => (
              <article className="story-system__step" key={item.title}>
                <p className="text-label">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <ul className="outcome-strip" aria-label="Audience-facing outcomes">
            {audienceOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="featured-world story-world site-section--loose"
        id="work"
        aria-labelledby="featured-world-title"
      >
        <div className="container-wide editorial-grid featured-world__grid">
          <div className="featured-world__copy">
            <p className="text-label section-kicker">{featuredWorld.eyebrow}</p>
            <h2 id="featured-world-title">{featuredWorld.title}</h2>
            <p className="featured-world__tagline text-label">
              {featuredWorld.tagline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p>{featuredWorld.body}</p>
            <p className="featured-world__safety">{featuredWorld.safetyNote}</p>
            <div className="link-cluster" aria-label="Rangers Legends links">
              <Link className="text-link" to={featuredWorld.primaryCta.href}>
                {featuredWorld.primaryCta.label} <Arrow />
              </Link>
              <a
                className="text-link"
                href={featuredWorld.secondaryCta.href}
                target="_blank"
                rel="noreferrer"
              >
                {featuredWorld.secondaryCta.label} <ExternalArrow />
              </a>
            </div>
          </div>

          <div className="featured-world__media" aria-label="Rangers Legends connected story world media">
            <figure className="world-object world-object--primary">
              <img src={collectionHeroImage} alt={featuredWorld.media.world.alt} />
              <figcaption className="text-label">{featuredWorld.media.world.label}</figcaption>
            </figure>
            <figure className="world-object world-object--comic">
              <img src={comicPageImage} alt={featuredWorld.media.story.alt} />
              <figcaption className="text-label">{featuredWorld.media.story.label}</figcaption>
            </figure>
            <figure className="world-object world-object--interface">
              <img src={interfaceImage} alt={featuredWorld.media.digital.alt} />
              <figcaption className="text-label">{featuredWorld.media.digital.label}</figcaption>
            </figure>
            <figure className="world-object world-object--tee">
              <img src={teeImage} alt={featuredWorld.media.apparel.alt} />
              <figcaption className="text-label">{featuredWorld.media.apparel.label}</figcaption>
            </figure>
            <figure className="world-object world-object--cards">
              <div className="card-pair" aria-label="Collectible card front and back">
                <img src={cardBackImage} alt={featuredWorld.media.collectibleBack.alt} />
                <img src={cardFrontImage} alt={featuredWorld.media.collectibleFront.alt} />
              </div>
              <figcaption className="text-label">{featuredWorld.media.collectibleFront.label}</figcaption>
            </figure>
          </div>

          <p className="featured-world__system text-label">
            Not six random deliverables. One connected world.
          </p>

          <ul className="media-categories" aria-label="Rangers Legends media categories">
            {featuredWorld.categories.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="method-section site-section--loose" id="how-we-work" aria-labelledby="method-title">
        <div className="container-wide editorial-grid method-section__intro">
          <div>
            <p className="text-label section-kicker">How We Work</p>
            <h2 id="method-title">
              Start with
              <span>the story.</span>
            </h2>
          </div>
          <p>
            Our process is designed to uncover the heart of a story and build the right world
            around it, layer by layer.
          </p>
        </div>
        <div className="container-wide method-grid" aria-label="CreateWithTimi method">
          {methodSteps.map((step) => (
            <article className="method-step" key={step.number}>
              <p className="method-step__number text-label">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </section>

      <section className="offers-section site-section" aria-labelledby="offers-title">
        <div className="container-wide editorial-grid offers-section__intro">
          <p className="text-label section-kicker">Ways to work together</p>
          <h2 id="offers-title">
            Different stories
            <span>need different</span>
            <span>ways in.</span>
          </h2>
        </div>
        <div className="container-wide offer-list">
          {offers.map((offer) => (
            <article className="offer-row" key={offer.number}>
              <p className="offer-row__number text-label">{offer.number} /</p>
              <div className="offer-row__content">
                <h3>{offer.title}</h3>
                <p className="offer-row__position">{offer.position}</p>
                <p>{offer.body}</p>
              </div>
              <Link className="text-link offer-row__link" to={offer.href}>
                Start <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta section-inverse site-section--loose" aria-labelledby="home-cta-title">
        <div className="container-wide editorial-grid home-cta__grid">
          <div>
            <p className="text-label section-kicker">{finalCta.eyebrow}</p>
            <h2 id="home-cta-title">
              {finalCta.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>
          <div className="home-cta__body">
            <p>{finalCta.body}</p>
            <Link className="text-link" to={finalCta.cta.href}>
              {finalCta.cta.label} <ExternalArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

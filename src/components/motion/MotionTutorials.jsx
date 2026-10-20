import { useState } from 'react';
import { motionTutorials, tutorialThumbnailUrl, tutorialUrl, youtubeChannelUrl } from '../../content/tutorials.js';

export function TutorialThumbnail({ videoId }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="motion-tutorial__thumbnail">
      {failed ? (
        <p className="motion-tutorial__fallback">Preview unavailable.<br />Watch this tutorial on YouTube.</p>
      ) : (
        <img
          src={tutorialThumbnailUrl(videoId)}
          alt=""
          width="480"
          height="360"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={(event) => {
            // YouTube may return a tiny placeholder with HTTP 200 for missing videos.
            if (event.currentTarget.naturalWidth < 480) setFailed(true);
          }}
        />
      )}
    </div>
  );
}

export default function MotionTutorials() {
  return (
    <section className="site-section--loose motion-tutorials" aria-labelledby="motion-tutorials-title">
      <div className="container-wide">
        <p className="text-label section-kicker">03 / Rive tutorials</p>
        <h2 id="motion-tutorials-title">Beyond the animation.</h2>
        <p className="motion-tutorials__intro text-body-lg">
          I don't just build interactive experiences. I enjoy breaking down how they work, from character rigging and data binding to playful UI and game interactions.
        </p>
        <div className="motion-tutorials__grid">
          {motionTutorials.map((tutorial) => (
            <article className="motion-tutorial" key={tutorial.videoId}>
              <TutorialThumbnail videoId={tutorial.videoId} />
              <p className="text-label">{tutorial.category}</p>
              <h3>{tutorial.title}</h3>
              <a className="text-link" href={tutorialUrl(tutorial.videoId)} target="_blank" rel="noopener noreferrer">
                Watch Tutorial <span aria-hidden="true">↗</span>
                <span className="visually-hidden">: {tutorial.title} (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
        <a className="text-link" href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
          Explore more tutorials on YouTube <span aria-hidden="true">↗</span>
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}

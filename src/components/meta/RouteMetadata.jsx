import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAbsoluteUrl, routeMetadata, siteMeta } from '../../content/site.js';

const ensureMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const removeMeta = (attribute, key) => {
  const element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (element) {
    element.remove();
  }
};

const ensureCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    if (element) {
      element.remove();
    }

    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const isKnownRoute = Boolean(routeMetadata[pathname]);
  const metadata = routeMetadata[pathname] ?? {
    title: `Page Not Found — ${siteMeta.name}`,
    description: siteMeta.description,
    robots: 'noindex, follow',
  };

  useEffect(() => {
    const canonicalUrl = isKnownRoute ? getAbsoluteUrl(pathname) : '';
    const socialImageUrl = siteMeta.siteUrl
      ? getAbsoluteUrl(siteMeta.socialImagePath)
      : siteMeta.socialImagePath;

    document.title = metadata.title;

    ensureMeta('name', 'description', metadata.description);
    ensureMeta('name', 'robots', metadata.robots);

    ensureMeta('property', 'og:type', 'website');
    ensureMeta('property', 'og:title', metadata.title);
    ensureMeta('property', 'og:description', metadata.description);
    ensureMeta('property', 'og:image', socialImageUrl);
    ensureMeta('property', 'og:image:alt', siteMeta.socialImageAlt);

    if (canonicalUrl) {
      ensureMeta('property', 'og:url', canonicalUrl);
    } else {
      removeMeta('property', 'og:url');
    }

    ensureMeta('name', 'twitter:card', 'summary_large_image');
    ensureMeta('name', 'twitter:title', metadata.title);
    ensureMeta('name', 'twitter:description', metadata.description);
    ensureMeta('name', 'twitter:image', socialImageUrl);
    ensureMeta('name', 'twitter:image:alt', siteMeta.socialImageAlt);

    ensureCanonical(canonicalUrl);
  }, [isKnownRoute, metadata.description, metadata.robots, metadata.title, pathname]);

  return null;
}

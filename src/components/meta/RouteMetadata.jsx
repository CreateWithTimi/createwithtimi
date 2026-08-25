import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeMetadata, siteMeta } from '../../content/site.js';

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const metadata = routeMetadata[pathname] ?? {
    title: `Page Not Found | ${siteMeta.name}`,
    description: siteMeta.description,
  };

  useEffect(() => {
    document.title = metadata.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', metadata.description);
    }
  }, [metadata.description, metadata.title]);

  return null;
}

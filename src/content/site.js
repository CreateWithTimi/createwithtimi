export const siteNavigation = [
  {
    label: 'Work',
    href: '/#work',
    sectionId: 'work',
    kind: 'section',
  },
  {
    label: 'How We Work',
    href: '/#how-we-work',
    sectionId: 'how-we-work',
    kind: 'section',
  },
  {
    label: 'Start a Project',
    href: '/start-a-project',
    kind: 'route',
  },
];

const normalizeSiteUrl = (value) => {
  if (!value) {
    return '';
  }

  return value.replace(/\/+$/, '');
};

const socialImagePath = '/cwt-social-preview.png';
const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

export const publicRoutes = ['/', '/work/rangers-legends', '/start-a-project'];

export const getAbsoluteUrl = (path = '/') => {
  if (!siteUrl) {
    return '';
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export const siteMeta = {
  name: 'CreateWithTimi',
  title: 'CreateWithTimi — We Build Worlds Around Stories People Care About',
  description:
    'CreateWithTimi is a creative-technology studio turning stories, brands and cultural IP into connected digital and physical experiences.',
  socialImagePath,
  socialImageAlt:
    'CreateWithTimi social preview artwork with the studio positioning: We build worlds around stories people care about.',
  siteUrl,
};

export const routeMetadata = {
  '/': {
    title: siteMeta.title,
    description: siteMeta.description,
    robots: 'index, follow',
  },
  '/work/rangers-legends': {
    title: 'Rangers Legends Case Study — CreateWithTimi',
    description:
      'A CreateWithTimi concept exploration showing how one football heritage story can become a connected story world across digital and physical experiences.',
    robots: 'index, follow',
  },
  '/start-a-project': {
    title: 'Start a Project — CreateWithTimi',
    description:
      'Start a focused project inquiry with CreateWithTimi around a story, brand, community, character, culture or idea worth building around.',
    robots: 'index, follow',
  },
};

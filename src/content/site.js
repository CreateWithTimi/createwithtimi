import { publishedMotionProjects } from './motion.js';
export const siteNavigation = [
  {
    label: 'Work',
    href: '/#work',
    sectionId: 'work',
    kind: 'section',
  },
  {
    label: 'Motion', href: '/motion', kind: 'route',
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

  const trimmedValue = value.trim().replace(/\/+$/, '');

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

const socialImagePath = '/cwt-social-preview.png';
const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

export const publicRoutes = ['/', '/work/rangers-legends', '/work/omniretail', '/start-a-project', '/motion', ...publishedMotionProjects.map(project => `/motion/${project.slug}`)];

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
  '/motion': { title: 'Interactive Motion & Rive — CreateWithTimi', description: 'Interactive motion by Timi, founder of CWT. Explore Rive experiments, implementation notes, and freelance, contract or remote opportunities.', robots: 'index, follow' },
  ...Object.fromEntries(publishedMotionProjects.map(project => [`/motion/${project.slug}`, { title: `${project.title} — CreateWithTimi`, description: project.description, robots: 'index, follow' }])),
  '/': {
    title: siteMeta.title,
    description: siteMeta.description,
    robots: 'index, follow',
  },
  '/work/rangers-legends': {
    title: 'Rangers Legends Case Study — CreateWithTimi',
    description:
      'A creative study showing how CreateWithTimi developed a Rangers Legends direction introduced by NZAPI into a connected storytelling, digital and physical experience system.',
    robots: 'index, follow',
  },
  '/work/omniretail': {
    title: 'OmniRetail — The World Behind the Shelf | CWT Creative Study 002',
    description:
      'CreateWithTimi Studio explores the human world behind OmniRetail’s commerce network — and how an invisible system of people, products and movement could become a connected storytelling world.',
    robots: 'index, follow',
  },
  '/start-a-project': {
    title: 'Start a Project — CreateWithTimi',
    description:
      'Start a focused project inquiry with CreateWithTimi around a story, brand, community, character, culture or idea worth building around.',
    robots: 'index, follow',
  },
};

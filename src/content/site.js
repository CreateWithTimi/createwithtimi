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

export const siteMeta = {
  name: 'CreateWithTimi Studio',
  description:
    'CreateWithTimi is an independent creative-technology studio building worlds around stories people care about.',
};

export const routeMetadata = {
  '/': {
    title: 'CreateWithTimi Studio',
    description: siteMeta.description,
  },
  '/work/rangers-legends': {
    title: 'Rangers Legends | CreateWithTimi Case Study',
    description:
      'A CreateWithTimi concept case study on turning one football heritage story into a connected story world.',
  },
  '/start-a-project': {
    title: 'Start a Project | CreateWithTimi Studio',
    description:
      'Begin a conversation with CreateWithTimi about a story, brand, culture, archive, or IP worth developing.',
  },
};

// Public, approved records only. Keep confidential drafts outside the client bundle.
export const motionProjects = [{
  slug: 'drag-to-cart',
  title: 'Drag to Cart — Interactive Shopping Experience',
  shortTitle: 'Drag to Cart',
  classification: 'Personal / Educational Experiment',
  status: 'published',
  description: 'A playful shopping interaction built with three independent Rive components, coordinated through View Model data binding and vanilla JavaScript.',
  creator: { name: 'Timi', role: 'Rive Animator & Interactive Motion Designer', contribution: 'Rive component animation, interaction design, View Model data binding, and vanilla JavaScript integration.' },
  demo: { mode: 'external', url: 'https://cwt-drag-to-cart.vercel.app/', riveAsset: null },
  capabilities: [
    { title: 'Interactive product motion', body: 'Product movement, drop feedback, and success animation turn a shopping action into a responsive experience.' },
    { title: 'View Model data binding', body: 'Application state is communicated to independent Rive components through their bound data.' },
    { title: 'Multi-instance coordination', body: 'Vanilla JavaScript coordinates the product, drop zone, and feedback as one interaction.' },
  ],
  components: [
    { title: 'Product Card', body: 'The draggable product and its motion. It gives the product a visual response as the visitor picks it up and moves it.' },
    { title: 'Drop Zone', body: 'Active, hover, acceptance, and reset feedback. It communicates where the product can go and whether the action has been accepted.' },
    { title: 'Feedback', body: 'The success animation lives in the stationary product home slot. It is separate from the product being dragged and the receiving drop zone.' },
  ],
  walkthrough: [
    { title: 'Pick up', body: 'Press and hold the headphones to begin the interaction.' },
    { title: 'Move over', body: 'Bring the product into the drop zone and watch its visual feedback.' },
    { title: 'Let go', body: 'Release over the drop zone to add the product. Success feedback appears in the product’s home slot.' },
    { title: 'Try another way', body: 'Use “Add to bag” for the button-based alternative, or “Reset” to return to the starting state.' },
  ],
}];

export const publishedMotionProjects = motionProjects.filter((project) => project.status === 'published');
export const getMotionProject = (slug) => publishedMotionProjects.find((project) => project.slug === slug);
export const motionInquiryHref = (slug) => `/start-a-project?service=motion${getMotionProject(slug) ? `&project=${encodeURIComponent(slug)}` : ''}`;

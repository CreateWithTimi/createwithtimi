import { getMotionProject } from '../content/motion.js';

export const motionEnquiryTypes = ['Freelance Rive animation', 'Interactive product motion', 'Character animation', 'Contract opportunity', 'Remote-job opportunity'];

export function getInquiryContext(search) {
  const params = new URLSearchParams(search);
  const isMotion = params.get('service') === 'motion';
  return { isMotion, project: isMotion ? getMotionProject(params.get('project'))?.slug ?? null : null };
}

export function validateForm(formState, isMotion = false) {
  const errors = {};
  if (isMotion) {
    if (!motionEnquiryTypes.includes(formState.enquiryType)) errors.enquiryType = 'Choose an enquiry type.';
  } else {
    if (!formState.around) errors.around = 'Choose what we are building around.';
    if (!formState.bringing) errors.bringing = 'Choose what you are bringing.';
    if (!formState.destinations.length) errors.destinations = 'Choose at least one possible direction.';
  }
  if (!formState.name.trim()) errors.name = 'Enter your name.';
  if (!formState.email.trim()) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) errors.email = 'Enter a valid email address.';
  if (!formState.description.trim()) errors.description = isMotion ? 'Tell us about the project or opportunity.' : 'Tell us a little about the project.';
  return errors;
}

export function buildInquiryPayload(formState, honeypotValue, context = { isMotion: false, project: null }) {
  return {
    ...(context.isMotion ? {
      Service: 'Motion',
      'Enquiry type': formState.enquiryType,
      'Related project': getMotionProject(context.project)?.title ?? 'General motion enquiry',
    } : {
      'What are we building around?': formState.around,
      'What are you bringing?': formState.bringing,
      'Where could it go?': formState.destinations.join(', '),
    }),
    'Your name': formState.name.trim(),
    'Email address': formState.email.trim(),
    'Organization / brand': formState.organization.trim() || 'Not provided',
    [context.isMotion ? 'Project or opportunity' : 'Tell us about your project']: formState.description.trim(),
    [context.isMotion ? 'Timeline / start date' : 'Project timeline']: formState.timeline || 'Not provided',
    [context.isMotion ? 'Budget / compensation context' : 'Budget context']: formState.budget || 'Not provided',
    email: formState.email.trim(),
    _replyto: formState.email.trim(),
    _gotcha: honeypotValue,
  };
}

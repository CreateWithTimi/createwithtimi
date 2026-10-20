import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { startProject as studioProject } from '../content/startProject.js';

import { buildInquiryPayload, getInquiryContext, motionEnquiryTypes, validateForm } from '../lib/inquiry.js';
import '../styles/motion.css';

const formspreeEndpoint = studioProject.delivery.endpoint;

const initialFormState = {
  enquiryType: '',
  around: '',
  bringing: '',
  destinations: [],
  name: '',
  email: '',
  organization: '',
  description: '',
  timeline: '',
  budget: '',
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function StepHeading({ number, question, id }) {
  return (
    <div className="project-step__heading">
      <p className="project-step__number text-label">{number}</p>
      <h2 id={id}>
        {question.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
    </div>
  );
}

function OptionControl({ option, type, name, checked, onChange, required = false, special = false }) {
  const optionId = `${name}-${slugify(option)}`;

  return (
    <label className={`project-option${special ? ' project-option--special' : ''}`} htmlFor={optionId}>
      <input
        id={optionId}
        type={type}
        name={name}
        value={option}
        checked={checked}
        required={required}
        onChange={onChange}
      />
      <span className="project-option__indicator" aria-hidden="true" />
      <span>{option}</span>
    </label>
  );
}

export default function StartAProjectPage() {
  const { search } = useLocation();
  const context = getInquiryContext(search);
  return <InquiryForm key={context.isMotion ? `motion:${context.project ?? ''}` : 'studio'} context={context} />;
}

function InquiryForm({ context }) {
  const { isMotion } = context;
  const startProject = isMotion ? {
    ...studioProject,
    hero: { ...studioProject.hero, eyebrow: 'Motion / Enquiry', title: ['Let’s talk', 'motion.'], body: 'Tell me about your Rive brief, product interaction, character animation, contract, or remote-job opportunity.', reassurance: { title: 'A short introduction is enough.', body: 'Share the project or role, what you need, and any timing you have in mind.' } },
    steps: [],
    details: { ...studioProject.details, number: '02', question: ['The project', 'or opportunity.'], hint: 'Name, email, and a short description are required. Everything else is optional.', fields: { ...studioProject.details.fields, description: 'Project or role description', timeline: 'Timeline / start date (optional)', budget: 'Budget / compensation (optional)' } },
    submit: { ...studioProject.submit, title: ['Let’s talk', 'motion.'], action: 'Send enquiry', submitting: 'Sending enquiry…', success: { eyebrow: 'Enquiry received.', title: ['Thanks for', 'getting in touch.'], body: 'Your enquiry has been sent. We’ll continue the conversation by email.', href: '/motion', cta: 'Back to Motion' } },
  } : studioProject;
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const errorSummaryRef = useRef(null);
  const honeypotRef = useRef(null);
  const submitMessageRef = useRef(null);
  const successRef = useRef(null);

  const updateField = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
    setSubmitStatus((currentStatus) => (currentStatus === 'error' ? 'idle' : currentStatus));
    setSubmitError('');
  };

  const toggleDestination = (value) => {
    setFormState((current) => {
      const isSelected = current.destinations.includes(value);

      return {
        ...current,
        destinations: isSelected
          ? current.destinations.filter((item) => item !== value)
          : [...current.destinations, value],
      };
    });
    setSubmitStatus((currentStatus) => (currentStatus === 'error' ? 'idle' : currentStatus));
    setSubmitError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitStatus === 'submitting' || submitStatus === 'success') {
      return;
    }

    const nextErrors = validateForm(formState, isMotion);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitStatus('idle');
      setSubmitError('');
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildInquiryPayload(formState, honeypotRef.current?.value || '', context)),
      });

      if (!response.ok) {
        throw new Error('Formspree rejected the inquiry.');
      }

      setSubmitStatus('success');
      window.requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setSubmitStatus('error');
      setSubmitError(startProject.submit.error.body);
      window.requestAnimationFrame(() => submitMessageRef.current?.focus());
    }
  };

  if (submitStatus === 'success') {
    return (
      <article className="start-project-page">
        <section
          className="project-success site-section--loose"
          aria-labelledby="project-success-title"
          tabIndex="-1"
          ref={successRef}
        >
          <div className="container-wide editorial-grid project-success__grid">
            <p className="text-label section-kicker">{startProject.submit.success.eyebrow}</p>
            <div className="project-success__message">
              <h1 id="project-success-title">
                {startProject.submit.success.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p className="text-body-lg">{startProject.submit.success.body}</p>
              <Link className="text-link" to={startProject.submit.success.href}>
                {startProject.submit.success.cta} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    );
  }

  return (
    <article className="start-project-page">
      <section className="project-inquiry site-section--loose" aria-labelledby="start-project-title">
        <div className="container-wide">
          <div className="project-inquiry__hero editorial-grid">
            <div className="project-inquiry__intro">
              <p className="text-label section-kicker">{startProject.hero.eyebrow}</p>
              <h1 id="start-project-title">
                {startProject.hero.title.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <span className="project-inquiry__mark" aria-hidden="true" />
              <p className="project-inquiry__body text-body-lg">{startProject.hero.body}</p>
              <div className="project-reassurance">
                <span aria-hidden="true">*</span>
                <div>
                  <p className="text-label">{startProject.hero.reassurance.title}</p>
                  <p>{startProject.hero.reassurance.body}</p>
                </div>
              </div>
            </div>

            <div className="project-inquiry__field" aria-hidden="true" />
          </div>

          <form className={`project-form${isMotion ? ' project-form--motion' : ''}`} noValidate onSubmit={handleSubmit}>
            <div className="project-honeypot" aria-hidden="true">
              <label htmlFor="project-company-website">Company website</label>
              <input
                id="project-company-website"
                ref={honeypotRef}
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {Object.keys(errors).length > 0 ? (
              <div className="project-error-summary" ref={errorSummaryRef} tabIndex="-1" role="alert">
                <p className="text-label">Before sending</p>
                <ul>
                  {Object.entries(errors).map(([field, message]) => (
                    <li key={field}>
                      <a href={`#${field}`}>{message}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="project-form__grid">
              {isMotion && <section className="project-step" aria-labelledby="enquiry-heading">
                <StepHeading number="01" question={['What brings', 'you here?']} id="enquiry-heading" />
                <div className="project-field">
                  <label htmlFor="enquiryType">Enquiry type (required)</label>
                  <select id="enquiryType" value={formState.enquiryType} required aria-invalid={Boolean(errors.enquiryType)} aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined} onChange={event => updateField('enquiryType', event.target.value)}>
                    <option value="">Choose an enquiry type</option>
                    {motionEnquiryTypes.map(type => <option key={type}>{type}</option>)}
                  </select>
                  {errors.enquiryType && <p className="project-field-error" id="enquiryType-error">{errors.enquiryType}</p>}
                </div>
                {context.project && <p className="project-step__hint">Related work: Drag to Cart</p>}
                <p className="project-step__hint">For wider studio projects, <Link to="/start-a-project">use the studio enquiry form</Link>.</p>
              </section>}
              {startProject.steps.map((step) => {
                const legendId = `${step.id}-legend`;
                const hintId = `${step.id}-hint`;
                const errorId = `${step.id}-error`;
                const hasError = Boolean(errors[step.id]);

                return (
                  <fieldset
                    className="project-step"
                    key={step.id}
                    aria-labelledby={legendId}
                    aria-describedby={`${hintId}${hasError ? ` ${errorId}` : ''}`}
                  >
                    <legend className="visually-hidden">{step.question.join(' ')}</legend>
                    <StepHeading number={step.number} question={step.question} id={legendId} />
                    <p className="project-step__hint" id={hintId}>
                      {step.hint}
                    </p>

                    <div className="project-option-list" id={step.id}>
                      {step.options.map((option) => {
                        const isMultiple = step.type === 'multiple';
                        const isSpecial = option.toLowerCase().startsWith('not sure');

                        return (
                          <OptionControl
                            key={option}
                            option={option}
                            type={isMultiple ? 'checkbox' : 'radio'}
                            name={step.id}
                            checked={
                              isMultiple
                                ? formState.destinations.includes(option)
                                : formState[step.id] === option
                            }
                            special={isSpecial}
                            required={!isMultiple}
                            onChange={() => {
                              if (isMultiple) {
                                toggleDestination(option);
                              } else {
                                updateField(step.id, option);
                              }
                            }}
                          />
                        );
                      })}
                    </div>

                    {hasError ? (
                      <p className="project-field-error" id={errorId}>
                        {errors[step.id]}
                      </p>
                    ) : null}
                  </fieldset>
                );
              })}

              <section
                className="project-step project-step--details"
                aria-labelledby="details-heading"
                aria-describedby="details-hint"
              >
                <StepHeading
                  number={startProject.details.number}
                  question={startProject.details.question}
                  id="details-heading"
                />
                <p className="project-step__hint" id="details-hint">
                  {startProject.details.hint}
                </p>

                <div className="project-details-grid">
                  <div className="project-field">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="name">
                      {startProject.details.fields.name}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={startProject.details.fields.name}
                      value={formState.name}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      onChange={(event) => updateField('name', event.target.value)}
                    />
                    {errors.name ? (
                      <p className="project-field-error" id="name-error">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="project-field">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="email">
                      {startProject.details.fields.email}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={startProject.details.fields.email}
                      value={formState.email}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      onChange={(event) => updateField('email', event.target.value)}
                    />
                    {errors.email ? (
                      <p className="project-field-error" id="email-error">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="project-field">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="organization">
                      {startProject.details.fields.organization} optional
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      autoComplete="organization"
                      placeholder={`${startProject.details.fields.organization} (optional)`}
                      value={formState.organization}
                      onChange={(event) => updateField('organization', event.target.value)}
                    />
                  </div>

                  <div className="project-field project-field--full">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="description">
                      {startProject.details.fields.description}
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      placeholder={`${startProject.details.fields.description} (short description)`}
                      value={formState.description}
                      required
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? 'description-error' : undefined}
                      onChange={(event) => updateField('description', event.target.value)}
                    />
                    {errors.description ? (
                      <p className="project-field-error" id="description-error">
                        {errors.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="project-field">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="timeline">
                      {startProject.details.fields.timeline}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formState.timeline}
                      onChange={(event) => updateField('timeline', event.target.value)}
                    >
                      <option value="">{startProject.details.fields.timeline}</option>
                      {startProject.details.timelineChoices.map((choice) => (
                        <option value={choice} key={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="project-field">
                    <label className={isMotion ? undefined : "visually-hidden"} htmlFor="budget">
                      {startProject.details.fields.budget}
                    </label>
                    {isMotion ? <input id="budget" name="budget" value={formState.budget} placeholder="Optional budget or compensation context" onChange={event => updateField('budget', event.target.value)} /> : <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={(event) => updateField('budget', event.target.value)}
                    >
                      <option value="">{startProject.details.fields.budget}</option>
                      {startProject.details.budgetChoices.map((choice) => (
                        <option value={choice} key={choice}>{choice}</option>
                      ))}
                    </select>}
                  </div>
                </div>

                <div className="project-submit">
                  <p className="project-submit__title text-label">
                    {startProject.submit.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  <button
                    className="project-submit__button"
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? startProject.submit.submitting : startProject.submit.action}
                    {submitStatus === 'submitting' ? null : (
                      <>
                        {' '}
                        <Arrow />
                      </>
                    )}
                  </button>
                  <p className="project-submit__note">
                    Prefer email? <a className="motion-email" href={`mailto:${studioProject.delivery.recipient}`}>{studioProject.delivery.recipient}</a>
                  </p>
                  <p className="visually-hidden" role="status" aria-live="polite">
                    {submitStatus === 'submitting' ? startProject.submit.submitting : ''}
                  </p>
                  {submitStatus === 'error' ? (
                    <div
                      className="project-submit__error"
                      ref={submitMessageRef}
                      tabIndex="-1"
                      role="alert"
                    >
                      <p className="text-label">{startProject.submit.error.title}</p>
                      <p>{submitError}</p>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
}

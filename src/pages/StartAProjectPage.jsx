import { useRef, useState } from 'react';
import { startProject } from '../content/startProject.js';

const initialFormState = {
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

function validateForm(formState) {
  const nextErrors = {};

  if (!formState.around) {
    nextErrors.around = 'Choose what we are building around.';
  }

  if (!formState.bringing) {
    nextErrors.bringing = 'Choose what you are bringing.';
  }

  if (formState.destinations.length === 0) {
    nextErrors.destinations = 'Choose at least one possible direction.';
  }

  if (!formState.name.trim()) {
    nextErrors.name = 'Enter your name.';
  }

  if (!formState.email.trim()) {
    nextErrors.email = 'Enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
    nextErrors.email = 'Enter a valid email address.';
  }

  if (!formState.description.trim()) {
    nextErrors.description = 'Tell us a little about the project.';
  }

  return nextErrors;
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
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  const errorSummaryRef = useRef(null);

  const updateField = (field, value) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
    setSubmitMessage('');
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
    setSubmitMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(formState);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitMessage('');
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setSubmitMessage(startProject.submit.pending);
  };

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

          <form className="project-form" noValidate onSubmit={handleSubmit}>
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
                    <label className="visually-hidden" htmlFor="name">
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
                    <label className="visually-hidden" htmlFor="email">
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
                    <label className="visually-hidden" htmlFor="organization">
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
                    <label className="visually-hidden" htmlFor="description">
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
                    <label className="visually-hidden" htmlFor="timeline">
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
                    <label className="visually-hidden" htmlFor="budget">
                      {startProject.details.fields.budget}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formState.budget}
                      onChange={(event) => updateField('budget', event.target.value)}
                    >
                      <option value="">{startProject.details.fields.budget}</option>
                      {startProject.details.budgetChoices.map((choice) => (
                        <option value={choice} key={choice}>
                          {choice}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="project-submit">
                  <p className="project-submit__title text-label">
                    {startProject.submit.title.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                  <button className="project-submit__button" type="submit">
                    {startProject.submit.action} <Arrow />
                  </button>
                  <p className="project-submit__note">{startProject.submit.note}</p>
                  {submitMessage ? (
                    <p className="project-submit__pending" role="status">
                      {submitMessage}
                    </p>
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

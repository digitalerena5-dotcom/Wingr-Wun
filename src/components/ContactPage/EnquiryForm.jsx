import { useRef, useState } from 'react';
import { ArrowRight, Check, Copy, AlertCircle, Mail } from 'lucide-react';
import { contact } from '../../data/contact.js';
import { requirementAreas, timelines, emptyForm, validate, composeEnquiry, sendEnquiry } from './enquiry.js';

/* Dark, technical field styling shared by every control */
const control =
  'block w-full rounded border bg-[color:var(--field-bg)] px-4 text-[1rem] text-white placeholder:text-steel-grey ' +
  'transition-[border-color,box-shadow,background-color] duration-200 hover:border-[color:var(--line-dark-strong)] ' +
  'focus:border-gold focus:bg-[color:var(--field-bg-focus)] focus:shadow-[inset_0_-2px_0_var(--c-gold)] focus:outline-none';

function Field({ id, label, required, optional, hint, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-[0.9rem] font-medium text-[color:var(--text-on-dark)]">
        {label}
        {required && (
          <>
            <span className="ml-1 text-gold" aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
        {optional && <span className="ml-2 text-[0.8rem] font-normal text-steel-grey">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.85rem] leading-snug text-steel-grey">
          {hint}
        </p>
      )}
      <div className="mt-2.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[0.85rem] text-[color:var(--c-error-on-dark)]">
          <AlertCircle size={15} strokeWidth={1.75} className="mt-[2px] shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/* A numbered block: index + title on the left, fields on the right */
function Group({ number, title, note, children }) {
  const id = `grp-${number}`;
  return (
    <div role="group" aria-labelledby={id}
      className="grid gap-6 border-t border-[color:var(--line-dark)] py-9 first:border-t-0 first:pt-2 md:grid-cols-[11rem_1fr] md:gap-10 md:py-11">
      <div>
        <span className="mono block text-sm text-gold" aria-hidden="true">{number}</span>
        <h3 id={id} className="mt-2 font-display text-[1.125rem] font-semibold tracking-tight text-white">{title}</h3>
        {note && <p className="mt-1.5 text-[0.85rem] leading-snug text-steel-grey">{note}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mail-opened | not-configured | error
  const [copied, setCopied] = useState(false);
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const copyRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const describedBy = (id, hasHint) =>
    [hasHint ? `cf-${id}-hint` : null, errors[id] ? `cf-${id}-error` : null].filter(Boolean).join(' ') || undefined;
  const border = (id) => (errors[id] ? 'border-[color:var(--c-error-on-dark)]' : 'border-[color:var(--line-dark)]');

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      formRef.current?.querySelector(`#cf-${firstKey}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      setStatus(await sendEnquiry(values));
    } catch {
      setStatus('error');
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(composeEnquiry(values));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      copyRef.current?.select();
    }
  };

  const reset = () => {
    setValues(emptyForm);
    setErrors({});
    setStatus('idle');
  };

  /* ---------- result states ---------- */
  if (status === 'sent' || status === 'mail-opened' || status === 'not-configured') {
    const content = {
      sent: {
        icon: Check,
        title: 'Your enquiry has been sent',
        body: 'Thank you. We will review your requirement and reply to the email address you provided.',
      },
      'mail-opened': {
        icon: Mail,
        title: 'Your email app should now be open',
        body: (
          <>
            The enquiry is written out and addressed to{' '}
            <span className="select-all font-medium text-white">{contact.email}</span>. Press send in your email app to deliver
            it. If nothing opened, copy the enquiry below and email it to that address.
          </>
        ),
      },
      'not-configured': {
        icon: AlertCircle,
        title: 'This form is not connected to an inbox yet',
        body: 'Your enquiry has not been sent. Copy it below so you keep a record of what you wrote.',
      },
    }[status];
    const Icon = content.icon;
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="px-6 py-10 focus:outline-none sm:px-10 sm:py-12">
        <div className="flex items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold text-gold">
            <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-white">{content.title}</h2>
            <p className="mt-3 max-w-[34rem] text-[color:var(--text-muted-dark)]">{content.body}</p>
          </div>
        </div>

        {status !== 'sent' && (
          <div className="mt-10">
            <label htmlFor="cf-copy" className="mono text-[0.75rem] font-medium uppercase text-gold">
              Your enquiry
            </label>
            <textarea
              id="cf-copy"
              ref={copyRef}
              readOnly
              rows={9}
              value={composeEnquiry(values)}
              className={`${control} mt-3 resize-y border-[color:var(--line-dark)] py-3 font-mono text-[0.85rem] leading-relaxed`}
            />
            <button type="button" onClick={copyEnquiry} className="btn btn-primary mt-5 w-full sm:w-auto">
              {copied ? 'Copied' : 'Copy enquiry'}
              {copied ? <Check size={16} strokeWidth={1.75} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-[44px] items-center text-[0.9rem] font-semibold text-white underline decoration-gold underline-offset-4 hover:text-[color:var(--c-gold-soft)]"
        >
          Start a new enquiry
        </button>
      </div>
    );
  }

  /* ---------- form ---------- */
  const sending = status === 'sending';
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Enquiry form" className="[color-scheme:dark]">
      <p className="sr-only" aria-live="polite">
        {errorCount ? `${errorCount} ${errorCount === 1 ? 'field needs' : 'fields need'} attention.` : ''}
      </p>

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <div className="px-6 pt-8 sm:px-10 sm:pt-10">
        <Group number="01" title="Your details" note="So we know who to reply to.">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="cf-name" label="Full name" required error={errors.name}>
              <input id="cf-name" name="name" autoComplete="name" value={values.name} onChange={set('name')}
                aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={`${control} h-12 ${border('name')}`} />
            </Field>
            <Field id="cf-organisation" label="Organisation" optional>
              <input id="cf-organisation" name="organisation" autoComplete="organization" value={values.organisation} onChange={set('organisation')}
                className={`${control} h-12 ${border('organisation')}`} />
            </Field>
            <Field id="cf-email" label="Work email" required error={errors.email}>
              <input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={set('email')}
                aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={`${control} h-12 ${border('email')}`} />
            </Field>
            <Field id="cf-phone" label="Phone" optional>
              <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')}
                className={`${control} h-12 ${border('phone')}`} />
            </Field>
          </div>
        </Group>

        <Group number="02" title="Your requirement" note="The more detail you share, the more useful our first reply.">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="cf-area" label="Area of requirement" required error={errors.area}>
              <select id="cf-area" name="area" value={values.area} onChange={set('area')}
                aria-invalid={!!errors.area} aria-describedby={describedBy('area')}
                className={`${control} select h-12 pr-10 ${border('area')} ${values.area ? '' : 'text-steel-grey'}`}>
                <option value="" disabled>Select an area</option>
                {requirementAreas.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field id="cf-timeline" label="Required by" optional>
              <select id="cf-timeline" name="timeline" value={values.timeline} onChange={set('timeline')}
                className={`${control} select h-12 pr-10 ${border('timeline')} ${values.timeline ? '' : 'text-steel-grey'}`}>
                <option value="">Select a timeframe</option>
                {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field id="cf-description" label="Describe the requirement" required error={errors.description}
                hint="The component, assembly, subsystem or legacy item, any identifying details, and what it supports.">
                <textarea id="cf-description" name="description" rows={6} value={values.description} onChange={set('description')}
                  aria-invalid={!!errors.description} aria-describedby={describedBy('description', true)}
                  className={`${control} resize-y py-3 leading-relaxed ${border('description')}`} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id="cf-destination" label="Destination country or region" optional
                hint="Helps identify any trade or export considerations early.">
                <input id="cf-destination" name="destination" autoComplete="country-name" value={values.destination} onChange={set('destination')}
                  aria-describedby="cf-destination-hint" className={`${control} h-12 ${border('destination')}`} />
              </Field>
            </div>
          </div>
        </Group>
      </div>

      {/* footer bar */}
      <div className="border-t border-[color:var(--line-dark)] bg-[color:var(--field-bg)] px-6 py-7 sm:px-10">
        <label htmlFor="cf-consent" className="-mx-2 flex cursor-pointer items-start gap-3.5 rounded px-2 py-2 text-[0.92rem] leading-relaxed text-[color:var(--text-muted-dark)]">
          <input id="cf-consent" type="checkbox" checked={values.consent} onChange={set('consent')}
            aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')}
            className="mt-[2px] h-[20px] w-[20px] shrink-0 cursor-pointer accent-[#C8A96B]" />
          <span>
            I agree that Wingr Wun may use the details in this form to respond to my enquiry.
            <span className="ml-1 text-gold" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="cf-consent-error" className="ml-9 mt-1 flex items-start gap-1.5 text-[0.85rem] text-[color:var(--c-error-on-dark)]">
            <AlertCircle size={15} strokeWidth={1.75} className="mt-[2px] shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-5 border-l-2 border-[color:var(--c-error-on-dark)] bg-[rgba(242,160,143,0.08)] px-4 py-3 text-[0.92rem] text-[color:var(--c-error-on-dark)]">
            The enquiry could not be sent. Check your connection and try again.
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.85rem] text-steel-grey">
            <span className="text-gold" aria-hidden="true">*</span> Required fields
          </p>
          <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
            {sending ? 'Sending…' : 'Send enquiry'}
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

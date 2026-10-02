import { contact } from '../../data/contact.js';

export const requirementAreas = [
  'Strategic global sourcing',
  'Legacy component procurement',
  'Regulatory & export compliance',
  'Logistics & pipeline facilitation',
  'General consultancy enquiry',
];

export const timelines = [
  'Urgent — affecting operations',
  'Within 1 month',
  '1–3 months',
  'More than 3 months',
  'Not yet defined',
];

export const emptyForm = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  area: '',
  timeline: '',
  description: '',
  destination: '',
  consent: false,
  website: '', // honeypot — real visitors never see or fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter an email address so we can reply.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@company.com.';
  if (!v.area) e.area = 'Choose the area your requirement relates to.';
  if (v.description.trim().length < 20)
    e.description = 'Describe the requirement in a little more detail (at least 20 characters).';
  if (!v.consent) e.consent = 'Confirm that we may use these details to respond.';
  return e;
}

export function composeEnquiry(v) {
  const line = (label, value) => (value && String(value).trim() ? `${label}: ${String(value).trim()}` : null);
  return [
    line('Name', v.name),
    line('Organisation', v.organisation),
    line('Email', v.email),
    line('Phone', v.phone),
    line('Area of requirement', v.area),
    line('Required by', v.timeline),
    line('Destination country / region', v.destination),
    '',
    'Requirement:',
    v.description.trim(),
  ]
    .filter((l) => l !== null)
    .join('\n');
}

/**
 * Sends the enquiry using whichever channel is configured.
 * Resolves to one of: 'sent' | 'mail-opened' | 'not-configured'. Throws on network/server errors.
 */
export async function sendEnquiry(v) {
  if (v.website) return 'sent'; // silently drop bot submissions
  const { website, ...payload } = v;
  if (contact.formEndpoint) {
    const res = await fetch(contact.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, _subject: `Enquiry: ${v.area}` }),
    });
    if (!res.ok) throw new Error(`Server responded ${res.status}`);
    return 'sent';
  }
  if (contact.email) {
    const subject = encodeURIComponent(`Enquiry: ${v.area}`);
    const body = encodeURIComponent(composeEnquiry(v));
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    return 'mail-opened';
  }
  return 'not-configured';
}

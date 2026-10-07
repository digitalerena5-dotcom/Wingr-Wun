// Navigation configuration for Wingr Wun
const SINGLE = import.meta.env.MODE === 'single';
const BASE = import.meta.env.BASE_URL || '/';

export const CONTACT_HASH = 'contact-us';
export const contactHref = SINGLE ? `#${CONTACT_HASH}` : `${BASE}contact/`;
export const homeHref = (id = 'top') => (SINGLE ? `#${id}` : `${BASE}#${id}`);

export const navigation = [
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'capabilities', label: 'Process' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'contact', label: 'Contact', page: true },
];

export const navHref = (item) => (item.page ? contactHref : homeHref(item.id));

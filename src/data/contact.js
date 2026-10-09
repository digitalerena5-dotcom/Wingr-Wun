/**
 * Verified contact channels.
 * No contact details were supplied in the Wingr Wun source material, so every
 * field is intentionally null. Fill these in and the site updates itself:
 *
 *   formEndpoint  → enquiry form posts JSON here (e.g. a Formspree or Basin form URL,
 *                   or your own API). Takes priority over email.
 *   email         → without an endpoint, the form opens the visitor's email app with
 *                   the enquiry pre-written; the address also appears on the Contact
 *                   page and in the footer.
 *   phone         → shown on the Contact page and in the footer.
 *   privacyUrl / termsUrl → legal links appear in the footer bar.
 */
export const contact = {
  formEndpoint: null,
  email: 'contact@wingrwun.co.uk',
  address: '3 Woodbridge Close\nAppleton, WA4 5RD\nUnited Kingdom',
  phone: null,
  privacyUrl: null,
  termsUrl: null,
};

export const hasDirectChannel = Boolean(contact.email || contact.phone || contact.address);
export const canSubmit = Boolean(contact.formEndpoint || contact.email);

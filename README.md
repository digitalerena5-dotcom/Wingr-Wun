# Wingr Wun — Corporate Website

One-page site for Wingr Wun, aviation sourcing and procurement consultancy.
React 18 + Vite 5 + Tailwind CSS 3 + Lucide icons. No other runtime dependencies.

## Run

```bash
npm install
npm run dev        # local development
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run build:single   # optional: one self-contained HTML file → dist-single/
```

## Where things live

| Path | Purpose |
|---|---|
| `src/styles/globals.css` | Design tokens (colour, type scale, spacing, motion) and shared classes |
| `tailwind.config.js` | Palette and font families mapped into Tailwind |
| `src/data/*.js` | Navigation, services, framework stages, pillars, contact config |
| `src/components/<Section>/` | One folder per page section |
| `src/components/ContactPage/` | Contact page, enquiry form and its validation/sending logic |
| `contact/index.html` | Entry for the `/contact/` URL (same bundle, `data-page="contact"`) |
| `src/components/illustrations/` | Hand-built SVG engineering drawings (aircraft side elevation, fan stage, bridge schematic, exploded assembly, shield, requirement-to-supply route) |
| `src/hooks/` | Scroll reveal and active-section tracking |

## Before going live

1. **Connect the enquiry form** — the Contact page (`/contact/`) has a full enquiry form, but no
   inbox was supplied. In `src/data/contact.js` set either:
   - `formEndpoint` — a form service URL (Formspree, Basin, Getform…) or your own API; the form
     POSTs JSON there and shows a "sent" confirmation, or
   - `email` — the form opens the visitor's email app with the enquiry pre-written.
   Until one is set, submitting shows "This form is not connected to an inbox yet" and lets the
   visitor copy what they wrote. `email` and `phone` also appear on the Contact page and footer.
2. **Legal pages** — Privacy Policy and Terms links appear in the footer only once `privacyUrl`
   and `termsUrl` are set in the same file.
3. **Canonical URL / Open Graph image** — add `<link rel="canonical">` and `og:url` / `og:image`
   in `index.html` once the domain and a share image exist.
4. **Photography (optional)** — the site uses original line drawings instead of stock photos.
   If you add photography later, apply the `.graded` class for consistent colour treatment.

## Content rule

All company statements come from the supplied brief. No clients, partners, certifications,
locations, statistics or contact details have been invented. Keep it that way when editing.

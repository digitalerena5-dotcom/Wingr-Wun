import { Mail, Phone } from 'lucide-react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { contact, hasDirectChannel } from '../../data/contact.js';
import { homeHref } from '../../data/navigation.js';
import EnquiryForm from './EnquiryForm.jsx';

const nextSteps = [
  { title: 'Review', body: 'Your requirement is reviewed against the sourcing, compliance and logistics considerations involved.' },
  { title: 'Clarify', body: 'Where needed, we follow up to confirm specifications, quantities or timing.' },
  { title: 'Discuss an approach', body: 'We discuss how the requirement could be sourced and moved through an appropriate pathway.' },
];

const areas = ['Strategic global sourcing', 'Legacy component procurement', 'Regulatory & export compliance', 'Logistics & pipeline facilitation'];

export default function ContactPage() {
  return (
    <section id="top" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-navy-950">
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse at 85% 0%, rgba(49,86,109,0.32), transparent 55%), linear-gradient(180deg, transparent 40%, #0B1D2A 100%)' }}
        aria-hidden="true"
      />
      <span className="crosshair left-[var(--gutter)] top-[calc(var(--header-h)+28px)] hidden text-steel-grey/60 md:block" aria-hidden="true" />
      <span className="crosshair right-[var(--gutter)] top-[calc(var(--header-h)+28px)] hidden text-steel-grey/60 md:block" aria-hidden="true" />

      {/* Page intro */}
      <div className="container-x pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+5rem)]">
        <nav aria-label="Breadcrumb" className="intro" style={{ '--d': '60ms' }}>
          <ol className="mono flex items-center gap-2 text-[0.75rem] uppercase text-steel-grey">
            <li><a href={homeHref('top')} className="-my-3 inline-flex min-h-[44px] items-center transition-colors hover:text-white">Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gold">Contact</li>
          </ol>
        </nav>
        <div className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h1 id="contact-title" className="h2 intro text-white lg:col-span-7" style={{ '--d': '160ms' }}>
            Discuss Your <span className="text-[color:var(--c-gold-soft)]">Requirement.</span>
          </h1>
          <p className="lede intro text-[color:var(--text-muted-dark)] lg:col-span-4 lg:col-start-9" style={{ '--d': '300ms' }}>
            Tell us about the component, subsystem or supply challenge you are working on. The more detail you can share, the
            more useful our first conversation will be.
          </p>
        </div>
      </div>

      {/* Form + aside */}
      <div className="container-x pb-[var(--section-y)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div id="enquiry-form" className="intro brackets relative scroll-mt-[calc(var(--header-h)+1.5rem)] border border-[color:var(--line-dark-strong)] bg-navy-900/80 backdrop-blur-[2px] lg:col-span-8" style={{ '--d': '380ms' }}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line-dark)] px-6 py-4 sm:px-10">
              <h2 className="mono text-[0.75rem] font-medium uppercase text-gold">Enquiry form</h2>
              <p className="mono text-[0.75rem] uppercase text-steel-grey">Two short sections</p>
            </div>
            <EnquiryForm />
          </div>

          <aside className="lg:col-span-4" aria-label="About your enquiry">
            <Reveal className="border-t border-[color:var(--line-dark-strong)] pt-8 lg:border-t-0 lg:pt-2">
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-7">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="relative grid grid-cols-[2.25rem_1fr] pb-7 last:pb-0">
                    {/* timeline rail */}
                    {i < nextSteps.length - 1 && (
                      <span className="absolute bottom-0 left-[5px] top-4 w-px bg-[color:var(--line-dark-strong)]" aria-hidden="true" />
                    )}
                    <span className="relative mt-[6px] block h-[11px] w-[11px] border border-gold bg-navy-950" aria-hidden="true" />
                    <div>
                      <span className="mono text-xs text-gold">0{i + 1}</span>
                      <h3 className="mt-1 font-display font-semibold text-white">{s.title}</h3>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-[color:var(--text-muted-dark)]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {hasDirectChannel && (
              <Reveal delay={120} className="mt-12 border-t border-[color:var(--line-dark)] pt-8">
                <h2 className="eyebrow">Direct contact</h2>
                <ul className="mt-6 space-y-3">
                  {contact.email && (
                    <li className="flex items-center gap-3">
                      <Mail size={18} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                      <a href={`mailto:${contact.email}`} className="inline-flex min-h-[44px] items-center font-medium text-white underline decoration-gold underline-offset-4">{contact.email}</a>
                    </li>
                  )}
                  {contact.phone && (
                    <li className="flex items-center gap-3">
                      <Phone size={18} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="inline-flex min-h-[44px] items-center font-medium text-white">{contact.phone}</a>
                    </li>
                  )}
                </ul>
              </Reveal>
            )}

            <Reveal delay={200} className="brackets relative mt-12 border border-[color:var(--line-dark)] bg-navy-900/70 p-7">
              <h2 className="mono text-[0.75rem] font-medium uppercase text-gold">Areas we support</h2>
              <ul className="mt-5 space-y-3 text-[0.95rem] text-[color:var(--text-on-dark)]">
                {areas.map((a) => (
                  <li key={a} className="flex items-center gap-3">
                    <span className="block h-[6px] w-[6px] shrink-0 rotate-45 border border-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
              <a href={homeHref('services')} className="mt-4 inline-flex min-h-[44px] items-center text-[0.9rem] font-semibold text-white underline decoration-gold underline-offset-4 hover:text-[color:var(--c-gold-soft)]">
                Explore services
              </a>
            </Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

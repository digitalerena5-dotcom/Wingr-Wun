import { Reveal } from '../../hooks/useScrollReveal.jsx';
import ExplodedDrawing from '../illustrations/ExplodedDrawing.jsx';

const callouts = [
  { label: 'Obsolete Spares', body: 'Sourcing parts that are no longer in active production.' },
  { label: 'Scarce Aircraft Components', body: 'Locating items with limited or fragmented availability.' },
  { label: 'Lifecycle Support', body: 'Supporting the continued readiness of older aircraft fleets.' },
];

export default function LegacyProcurement() {
  return (
    <section id="legacy" aria-labelledby="legacy-title" className="relative bg-offwhite text-[color:var(--text-on-light)]">
      <div className="grid lg:min-h-[52rem] lg:grid-cols-2">
        {/* Drawing panel — bleeds to the left edge */}
        <div className="relative order-2 overflow-hidden bg-navy-950 lg:order-1">
          <div className="grid-bg absolute inset-0" aria-hidden="true" />
          <span className="crosshair left-6 top-6 text-steel-grey/70" aria-hidden="true" />
          <span className="crosshair bottom-6 right-6 text-steel-grey/70" aria-hidden="true" />
          <div className="relative mx-auto aspect-[19/20] w-full max-w-[44rem] px-4 py-10 sm:px-10 lg:absolute lg:inset-0 lg:aspect-auto lg:max-w-none lg:px-12 lg:py-16">
            <ExplodedDrawing />
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 flex items-center lg:order-2">
          <div className="w-full px-[var(--gutter)] py-[var(--section-y)] lg:max-w-[44rem] lg:pl-16 xl:pl-24">
            <Reveal>
              <p className="eyebrow eyebrow--steel">Legacy Procurement</p>
              <h2 id="legacy-title" className="h2 mt-6 text-navy-900">
                Keeping proven platforms operational
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-5 text-[color:var(--text-muted-light)]">
              <p className="lede text-navy-900">
                Older aircraft fleets can remain in service long after their original supply base has moved on.
              </p>
              <p>
                Wingr Wun locates components that are difficult to source, along with obsolete spares, supporting the
                lifecycle and operational readiness of these fleets through persistent market searching and careful vendor
                vetting.
              </p>
            </Reveal>

            <Reveal as="ul" delay={220} className="mt-12 border-t border-[color:var(--line-light)]">
              {callouts.map((c, i) => (
                <li key={c.label} className="grid grid-cols-[2.75rem_1fr] gap-y-1 border-b border-[color:var(--line-light)] py-5 sm:grid-cols-[2.75rem_15rem_1fr]">
                  <span className="mono pt-0.5 text-[0.75rem] text-steel">0{i + 1}</span>
                  <h3 className="mono pt-0.5 text-[0.75rem] font-medium uppercase leading-snug text-navy-900">{c.label}</h3>
                  <p className="col-start-2 text-[0.95rem] leading-relaxed text-[color:var(--text-muted-light)] sm:col-start-3">{c.body}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { services } from '../../data/services.js';
import { Globe2, PackageSearch, ShieldCheck, Waypoints, ArrowRight } from 'lucide-react';

const icons = {
  'global-sourcing': Globe2,
  'legacy-procurement': PackageSearch,
  'export-compliance': ShieldCheck,
  logistics: Waypoints,
};

export default function Services({ onOpenRFQ }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative bg-navy-950">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">CORE CONSULTANCY DISCIPLINES</span>
            <h2 id="services-title" className="h2 mt-4 text-white tracking-tight">
              Procurement built around operational requirements
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[color:var(--text-muted-dark)]">
              Grounded in the realities of aerospace procurement. Each service is delivered as structured consultancy to secure components, navigate regulatory regimes, and protect operational aircraft readiness.
            </p>
          </Reveal>
        </div>

        {/* Refined 2x2 Services Matrix */}
        <div className="mt-16 grid border-l border-t border-[color:var(--line-dark)] md:grid-cols-2 lg:mt-20">
          {services.map((s, i) => {
            const IconComponent = icons[s.id] || Globe2;
            return (
              <Reveal
                as="article"
                key={s.id}
                delay={i * 90}
                className="group relative border-b border-r border-[color:var(--line-dark)] p-5 transition-colors duration-500 hover:bg-[#081E2E] sm:p-12 lg:p-14"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded border border-[color:var(--line-dark)] bg-navy-900 text-steel-grey transition-all duration-300 group-hover:border-gold group-hover:text-gold group-hover:scale-105">
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="h3 mt-6 text-white sm:mt-12 transition-colors group-hover:text-white">
                  {s.title}
                </h3>

                <p className="mt-4 text-[0.98rem] leading-relaxed text-[color:var(--text-muted-dark)]">
                  {s.body}
                </p>

                {/* Practical Purpose Callout */}
                <div className="mt-6 rounded-lg border border-gold/35 bg-navy-900/90 p-5 sm:p-6 shadow-md backdrop-blur-sm">
                  <span className="mono text-[0.78rem] sm:text-[0.82rem] font-bold tracking-wider uppercase text-gold block">
                    PRACTICAL PURPOSE:
                  </span>
                  <p className="mt-2 text-[0.88rem] sm:text-[0.94rem] leading-relaxed text-slate-200">
                    {s.purpose}
                  </p>
                </div>

                {/* Relevant Enquiry Action */}
                <div className="mt-8 pt-6 border-t border-[color:var(--line-dark)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onOpenRFQ}
                    className="inline-flex items-center gap-2 mono text-xs font-semibold text-white transition-colors group-hover:text-gold"
                  >
                    <span>{s.actionLabel}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

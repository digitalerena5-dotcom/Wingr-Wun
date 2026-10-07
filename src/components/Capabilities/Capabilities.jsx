import { useState } from 'react';
import { Reveal, useScrollReveal } from '../../hooks/useScrollReveal.jsx';
import { capabilities } from '../../data/capabilities.js';

export default function Capabilities() {
  const ref = useScrollReveal({ threshold: 0.2 });
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section id="capabilities" aria-labelledby="cap-title" className="section-y relative overflow-hidden bg-navy-950">
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow">PROCUREMENT METHODOLOGY</span>
            <h2 id="cap-title" className="h2 mt-4 text-white tracking-tight">
              Procurement Module
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-base text-[color:var(--text-muted-dark)] leading-relaxed">
              A disciplined procurement process with clearly defined review stages that advances each sourcing requirement through market intelligence, rigorous vendor evaluation, and international trade compliance.
            </p>
          </Reveal>
        </div>

        {/* Process Box */}
        <div className="relative mt-14 border border-[color:var(--line-dark)] bg-navy-900/60 shadow-2xl backdrop-blur-sm sm:mt-18 lg:mt-20">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--line-dark)] px-4 py-3 sm:px-10 sm:py-4 mono text-[0.7rem] sm:text-[0.72rem] text-steel-grey">
            <p>
              <span className="text-gold font-bold">INPUT</span> — Flight Readiness Requirement
            </p>
            <p className="hidden sm:block">
              <span className="text-gold font-bold">OUTPUT</span> — Certified Airworthy Supply
            </p>
          </div>

          <div ref={ref} className="group px-4 py-8 sm:px-10 sm:py-14 lg:py-16">
            <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-4">
              {/* Vertical line (Mobile/Tablet) */}
              <span
                className="absolute bottom-6 left-[7px] top-4 w-px bg-[color:var(--line-dark-strong)] lg:hidden"
                aria-hidden="true"
              >
                <span className="absolute inset-0 origin-top scale-y-0 bg-gold transition-transform duration-[1800ms] ease-precise group-[.is-visible]:scale-y-100" />
              </span>

              {/* Horizontal line (Desktop) */}
              <span
                className="absolute left-6 right-6 top-[54px] hidden h-px bg-[color:var(--line-dark-strong)] lg:block"
                aria-hidden="true"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-[1800ms] ease-precise group-[.is-visible]:scale-x-100" />
              </span>

              {capabilities.map((c, i) => {
                const isHovered = activeStage === c.number;
                return (
                  <li
                    key={c.number}
                    onMouseEnter={() => setActiveStage(c.number)}
                    onMouseLeave={() => setActiveStage(null)}
                    className="relative pb-8 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-5 group/item cursor-pointer"
                  >
                    <span
                      className="mono block text-xs font-bold text-gold opacity-0 transition-opacity duration-500 group-[.is-visible]:opacity-100 lg:h-7"
                      style={{ transitionDelay: `${150 + i * 180}ms` }}
                    >
                      STAGE {c.number}
                    </span>

                    <div className="lg:mb-8 lg:flex lg:h-9 lg:items-center">
                      <span
                        className={`absolute left-0 top-[6px] block h-3.5 w-3.5 border transition-all duration-300 lg:static ${
                          isHovered
                            ? 'border-gold bg-gold scale-125 shadow-[0_0_12px_rgba(201,155,71,0.8)]'
                            : 'border-gold bg-navy-950 scale-100 group-[.is-visible]:border-gold'
                        }`}
                        style={{ transitionDelay: `${150 + i * 180}ms` }}
                        aria-hidden="true"
                      />
                    </div>

                    <div
                      className="translate-y-3 opacity-0 transition-[opacity,transform] duration-700 ease-precise group-[.is-visible]:translate-y-0 group-[.is-visible]:opacity-100"
                      style={{ transitionDelay: `${250 + i * 180}ms` }}
                    >
                      <h3 className="font-display text-base font-semibold text-white group-hover/item:text-gold transition-colors">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted-dark)] text-left">
                        {c.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:var(--line-dark)] px-4 py-3 mono text-[0.68rem] text-steel-grey sm:px-10">
            <span>AUDIT TRAIL PRESERVED ACROSS ALL 6 PHASES</span>
            <span className="text-gold">FAA / EASA COMPLIANCE VERIFIED</span>
          </div>
        </div>
      </div>
    </section>
  );
}

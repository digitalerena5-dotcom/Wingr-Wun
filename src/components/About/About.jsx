import { Compass, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';
import BridgeSchematic from '../illustrations/BridgeSchematic.jsx';

export default function About() {
  const pillars = [
    {
      icon: Compass,
      tag: 'ADVISORY',
      title: 'Strategic Sourcing Advisory',
      body: 'Informed procurement guidance evaluating mission parameters, platform lifecycles, and global market availability before commitments are made.',
    },
    {
      icon: ShieldCheck,
      tag: 'EVALUATION',
      title: 'Rigorous Vendor Vetting',
      body: 'Comprehensive audit of Western OEMs, stockists, and certified repair stations to ensure pedigree, financial stability, and quality adherence.',
    },
    {
      icon: Search,
      tag: 'INTELLIGENCE',
      title: 'Deep Market Intelligence',
      body: 'Exhaustive research across fragmented supply channels, tracing hard-to-find components and obsolete spares across trusted networks.',
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative bg-[#F2F2EF] text-[#071925] overflow-hidden">
      {/* Precision Light Grid */}
      <div className="grid-bg--light absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* LEFT: Large Editorial Heading & Authority Credentials */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <span className="eyebrow eyebrow--steel">COMPANY POSITIONING &amp; MANDATE</span>
              <h2 id="about-title" className="h2 mt-4 text-[#071925] tracking-tight">
                A Strategic Bridge<br />
                Between Defence<br />
                Requirements<br />
                and Western<br />
                Aerospace Supply.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[#4A6272]">
                Direct advisory architecture connecting sovereign defence operators, government procurement directorates, and fleet managers with pre-audited Western OEM production lines and accredited distributors.
              </p>
            </Reveal>

            {/* Credential Callout Card */}
            <Reveal delay={120} className="rounded-lg border border-[rgba(7,25,37,0.12)] bg-white p-6 sm:p-7 shadow-md">
              <div className="flex items-center justify-between border-b border-[rgba(7,25,37,0.08)] pb-4">
                <span className="mono text-xs font-semibold uppercase tracking-wider text-[#31566D]">
                  FOUNDING HERITAGE
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#071925]/5 px-2.5 py-0.5 mono text-[0.65rem] text-[#31566D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C99B47]" />
                  Aviation Specialists
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#071925] font-medium">
                Established by Defense Aviation Experts and Aviation Specialists who bring the discipline, operational experience, and systematic precision of aviation practice to complex procurement challenges.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 pt-5 border-t border-[rgba(7,25,37,0.08)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                  <span className="mono text-[0.72rem] text-[#31566D] font-medium">ITAR / EAR Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                  <span className="mono text-[0.72rem] text-[#31566D] font-medium">100% Pedigree Audits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                  <span className="mono text-[0.72rem] text-[#31566D] font-medium">Tier-1 Western OEMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                  <span className="mono text-[0.72rem] text-[#31566D] font-medium">Mission-Critical AOG</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: In-depth Authentic Narrative & Interactive Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={100} className="space-y-5 text-[#4A6272] leading-relaxed">
              <p className="font-display text-xl font-medium leading-relaxed text-[#071925]">
                Wingr Wun is a premier aviation sourcing and procurement consultancy bridging the gap between international defence markets and leading aerospace suppliers across the West.
              </p>
              <p className="text-[0.95rem]">
                We specialize in providing the strategic advisory, vendor vetting, and market intelligence required to source high-calibre aircraft components, subsystems, and legacy technologies. We solve routine organizational friction, accelerate parts acquisition, and eliminate procurement blind spots.
              </p>
              <p className="text-[0.95rem]">
                By simplifying the complexities of international trade regulations, export licensing, and documentation standards, Wingr Wun enables clients to optimize their aviation pipelines, secure critical part availability, and build resilient, fully compliant global supply chains that keep fleets operationally ready.
              </p>
            </Reveal>

            {/* THREE STRATEGIC ADVISORY PILLARS */}
            <div className="mt-8 space-y-4">
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#31566D] block">
                CORE ADVISORY CAPABILITIES
              </span>

              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal
                    key={p.title}
                    delay={160 + i * 80}
                    className="group rounded-lg border border-[rgba(7,25,37,0.12)] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#C99B47] hover:shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-[rgba(7,25,37,0.1)] bg-[#F2F2EF] text-[#31566D] transition-colors duration-300 group-hover:border-[#C99B47] group-hover:text-[#C99B47] group-hover:bg-[#C99B47]/10">
                        <Icon size={20} strokeWidth={1.6} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-display text-base font-bold text-[#071925] transition-colors group-hover:text-[#071925]">
                            {p.title}
                          </h3>
                          <span className="mono text-[0.68rem] font-semibold uppercase tracking-wider text-[#31566D] bg-[#F2F2EF] px-2 py-0.5 rounded">
                            {p.tag}
                          </span>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#4A6272]">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Bridge Schematic Illustration */}
        <Reveal delay={150} className="brackets relative mt-16 overflow-hidden rounded-lg bg-navy-950 p-6 text-white shadow-2xl sm:p-10 lg:mt-20">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line-dark)] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse-amber" />
                <span className="mono text-xs uppercase tracking-wider text-gold">PROCUREMENT PIPELINE ROUTE</span>
              </div>
              <div className="flex items-center gap-4 mono text-xs text-steel-grey">
                <span>SCHEMATIC // NOT TO SCALE</span>
                <span className="hidden sm:inline text-steel-grey/40">|</span>
                <span className="hidden sm:inline text-gold">END-TO-END CORRIDOR</span>
              </div>
            </div>
            <BridgeSchematic />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

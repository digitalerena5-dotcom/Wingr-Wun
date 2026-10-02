import { Reveal } from '../../hooks/useScrollReveal.jsx';
import BridgeSchematic from '../illustrations/BridgeSchematic.jsx';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative bg-[#F2F2EF] text-[#071925]">
      {/* Precision Light Grid */}
      <div className="grid-bg--light absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Large Editorial Heading */}
          <Reveal className="lg:col-span-5">
            <span className="eyebrow eyebrow--steel">COMPANY POSITIONING</span>
            <h2 id="about-title" className="h2 mt-6 text-[#071925] tracking-tight">
              A Strategic Bridge<br />
              Between Defence<br />
              Requirements<br />
              and Western<br />
              Aerospace Supply.
            </h2>
          </Reveal>

          {/* RIGHT: In-depth Authentic Brief Narrative */}
          <div className="lg:col-span-7 lg:pt-12">
            <Reveal delay={120} className="space-y-6 text-[#4A6272] leading-relaxed">
              <p className="font-display text-xl font-medium leading-relaxed text-[#071925]">
                Wingr Wun is a premier aviation sourcing and procurement consultancy bridging the gap between international defence markets and leading aerospace suppliers across the West.
              </p>
              <p>
                We specialize in providing the strategic advisory, vendor vetting, and market intelligence required to source high-calibre aircraft components, subsystems, and legacy technologies.
              </p>
              <p>
                By simplifying the complexities of international trade regulations and export controls, Wingr Wun enables clients to optimize their aviation pipelines, secure critical part availability, and build resilient, fully compliant global supply chains that keep fleets operationally ready.
              </p>
              <p className="border-l-2 border-[#C99B47] pl-4 italic text-sm text-[#071925]">
                Established by Defense Aviation Experts and Aviation Specialists who bring the rigour, discipline, and systematic precision of aviation practice to everyday operational and procurement challenges.
              </p>
            </Reveal>

            {/* THREE STRATEGIC ADVISORY PILLARS */}
            <Reveal delay={240} className="mt-10 border-t border-[rgba(7,25,37,0.14)]">
              <div className="grid gap-6 border-b border-[rgba(7,25,37,0.14)] py-6 sm:grid-cols-[14rem_1fr]">
                <div>
                  <span className="mono text-xs uppercase text-[#31566D]">01 // ADVISORY</span>
                  <h3 className="font-display mt-1 text-base font-bold text-[#071925]">
                    Strategic Sourcing Advisory
                  </h3>
                </div>
                <p className="text-sm text-[#4A6272] self-center">
                  Informed procurement guidance evaluating mission parameters, platform lifecycles, and global market availability before commitments are made.
                </p>
              </div>

              <div className="grid gap-6 border-b border-[rgba(7,25,37,0.14)] py-6 sm:grid-cols-[14rem_1fr]">
                <div>
                  <span className="mono text-xs uppercase text-[#31566D]">02 // EVALUATION</span>
                  <h3 className="font-display mt-1 text-base font-bold text-[#071925]">
                    Rigorous Vendor Vetting
                  </h3>
                </div>
                <p className="text-sm text-[#4A6272] self-center">
                  Comprehensive audit of Western OEMs, stockists, and certified repair stations to ensure pedigree, financial stability, and quality adherence.
                </p>
              </div>

              <div className="grid gap-6 border-b border-[rgba(7,25,37,0.14)] py-6 sm:grid-cols-[14rem_1fr]">
                <div>
                  <span className="mono text-xs uppercase text-[#31566D]">03 // INTELLIGENCE</span>
                  <h3 className="font-display mt-1 text-base font-bold text-[#071925]">
                    Deep Market Intelligence
                  </h3>
                </div>
                <p className="text-sm text-[#4A6272] self-center">
                  Exhaustive research across fragmented supply channels, tracing hard-to-find components and obsolete spares across trusted networks.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Technical Bridge Schematic Illustration */}
        <Reveal delay={150} className="brackets relative mt-16 overflow-hidden rounded bg-navy-950 p-6 text-white shadow-2xl sm:p-10 lg:mt-24">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line-dark)] pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse-amber" />
                <span className="mono text-xs uppercase tracking-wider text-gold">FIG. 02 — PROCUREMENT PIPELINE ROUTE</span>
              </div>
              <span className="mono text-xs text-steel-grey">SCHEMATIC // NOT TO SCALE</span>
            </div>
            <BridgeSchematic />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

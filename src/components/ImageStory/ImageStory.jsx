import { Reveal } from '../../hooks/useScrollReveal.jsx';

export default function ImageStory() {
  return (
    <section aria-labelledby="story-title" className="section-y relative bg-[#081B28] text-white overflow-hidden">
      {/* Precision Blueprint Grid Overlay */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="container-x relative">
        {/* Section Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <span className="eyebrow">OPERATIONAL EXCELLENCE</span>
            <h2 id="story-title" className="h2 mt-4 text-white tracking-tight">
              Precision in Every Component.<br />
              Integrity Across Every Corridor.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <div className="mono flex flex-wrap gap-2 text-[0.68rem] text-gold">
              <span className="rounded border border-gold/30 bg-navy-950/80 px-2 py-1">AIRFRAME</span>
              <span className="rounded border border-gold/30 bg-navy-950/80 px-2 py-1">COMPONENT</span>
              <span className="rounded border border-gold/30 bg-navy-950/80 px-2 py-1">TRACEABILITY</span>
              <span className="rounded border border-gold/30 bg-navy-950/80 px-2 py-1">QUALITY</span>
              <span className="rounded border border-gold/30 bg-navy-950/80 px-2 py-1">LOGISTICS</span>
            </div>
          </Reveal>
        </div>

        {/* Asymmetrical Editorial Image Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Large Primary Image: Aircraft Tactical Airframe & Propulsion */}
          <Reveal className="relative lg:col-span-7 group">
            <div className="brackets relative overflow-hidden rounded border border-[color:var(--line-dark-strong)] bg-navy-950 shadow-2xl">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/images/jet_engine_tarmac.jpg"
                  alt="Military tactical transport airframe and high-bypass turbofan nacelle on airfield tarmac"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle blueprint grid overlay & grading */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <div className="grid-bg absolute inset-0 opacity-25" aria-hidden="true" />
              </div>

              {/* Technical Metadata Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--line-dark)] bg-navy-950/90 px-6 py-4 mono text-[0.7rem] text-steel-grey">
                <div>
                  <span className="text-white font-medium block">TACTICAL AIRFRAME &amp; PROPULSION</span>
                  <span className="text-[0.65rem] text-gold">WESTERN OEM SOURCING &amp; AIRFRAME ROTABLES</span>
                </div>
                <span className="rounded border border-[color:var(--line-dark)] px-2 py-0.5 text-[0.65rem]">
                  LOC: WESTERN DEFENCE CORRIDOR
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: 2 Stacked Asymmetrical Images with Blueprint Overlays */}
          <div className="space-y-8 lg:col-span-5">
            {/* Image 2: Landing Gear & Hydraulic Subsystems */}
            <Reveal delay={150} className="group">
              <div className="brackets relative overflow-hidden rounded border border-[color:var(--line-dark-strong)] bg-navy-950 shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/aviation_mechanic_turbine.jpg"
                    alt="Aircraft landing gear assembly, hydraulic shock strut, and life-limited component inspection"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent" />
                  <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--line-dark)] bg-navy-950/90 px-5 py-3 mono text-[0.68rem] text-steel-grey">
                  <div>
                    <span className="text-white font-medium block">LANDING GEAR &amp; HYDRAULIC ROTABLES</span>
                    <span className="text-[0.62rem] text-gold">ACTUATORS, STRUTS &amp; COMPONENT AUDIT</span>
                  </div>
                  <span className="text-gold">100% PEDIGREE</span>
                </div>
              </div>
            </Reveal>

            {/* Image 3: Bonded Aerospace Parts Warehousing */}
            <Reveal delay={250} className="group">
              <div className="brackets relative overflow-hidden rounded border border-[color:var(--line-dark-strong)] bg-navy-950 shadow-2xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/air_cargo_pallet.jpg"
                    alt="High-bay bonded aerospace parts warehouse and certified distributor stock facility"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent" />
                  <div className="grid-bg absolute inset-0 opacity-20" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-between border-t border-[color:var(--line-dark)] bg-navy-950/90 px-5 py-3 mono text-[0.68rem] text-steel-grey">
                  <div>
                    <span className="text-white font-medium block">BONDED PARTS LOGISTICS</span>
                    <span className="text-[0.62rem] text-gold">PRE-VETTED WESTERN DISTRIBUTOR CORRIDORS</span>
                  </div>
                  <span className="text-gold">TRACEABLE STOCK</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

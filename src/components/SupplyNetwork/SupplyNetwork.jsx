import { useState } from 'react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';

const demandNodes = [
  { id: 'd1', label: 'International Defence Fleets', sub: 'Air forces and operational programmes requiring reliable rotable availability.', detail: 'Requirement intake, mission impact assessment, and specification definitions.' },
  { id: 'd2', label: 'Fleet Operators & Airlines', sub: 'Scheduled maintenance and urgent AOG rotable replenishment.', detail: 'High-cycle rotable replacement, line replaceable unit (LRU) exchanges.' },
  { id: 'd3', label: 'Heavy MRO Facilities', sub: 'Base maintenance depots requiring difficult-to-locate assemblies.', detail: 'Overhaul component synchronisation and structural airframe spares.' },
  { id: 'd4', label: 'Procurement Directorates', sub: 'Government and institutional aviation purchasing divisions.', detail: 'Long-lead pipeline planning, obsolescence management, and contract sourcing.' },
];

const supplyNodes = [
  { id: 's1', label: 'Established International OEMs', sub: 'Direct tier-1 original equipment manufacturers across leading aerospace hubs.', detail: 'Factory-new component acquisition with original manufacturing records.' },
  { id: 's2', label: 'Certified Distributors', sub: 'Accredited aerospace stockists and vetted rotable inventories.', detail: 'Dual-release FAA 8130-3 and EASA Form 1 traceable stock.' },
  { id: 's3', label: 'Specialised Repair Stations', sub: 'Part-145 accredited maintenance and overhaul facilities.', detail: 'Bench-tested rotable overhauls, calibration, and recalibration records.' },
  { id: 's4', label: 'Bonded Transit Corridors', sub: 'Secure, compliant international shipping and customs pathways.', detail: 'Pre-cleared ITAR and export licence compliance transit corridors.' },
];

export default function SupplyNetwork() {
  const [activeRoute, setActiveRoute] = useState(null);

  const toggleRoute = (id) => {
    setActiveRoute((prev) => (prev === id ? null : id));
  };

  return (
    <section id="network" aria-labelledby="network-title" className="section-y relative bg-navy-950 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <span className="eyebrow">SUPPLIER NETWORK &amp; INTELLIGENCE</span>
            <h2 id="network-title" className="h2 mt-4 text-white tracking-tight">
              Bridging Requirements<br />
              to Global Aerospace Supply.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="text-sm text-[color:var(--text-muted-dark)] leading-relaxed">
              How Wingr Wun applies vendor vetting and market intelligence to connect international requirements with certified international supply sources.
            </p>
          </Reveal>
        </div>

        {/* Technical Architecture Canvas */}
        <div className="mt-14 rounded border border-[color:var(--line-dark)] bg-navy-900/60 p-4 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-sm">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 border-b border-[color:var(--line-dark)] pb-4 sm:pb-5 mono text-[0.7rem] sm:text-[0.72rem] text-steel-grey">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-white uppercase tracking-wider font-semibold break-words">
                SYSTEM ARCHITECTURE // VENDOR VETTING &amp; SOURCING PIPELINE
              </span>
            </div>
            <span className="text-gold">CLICK OR TAP ANY NODE TO INSPECT CORRIDOR</span>
          </div>

          {/* Diagram Body */}
          <div className="relative mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* LEFT COLUMN: International Defence & Fleet Requirements */}
            <div className="space-y-3 lg:col-span-4">
              <div className="mb-2 flex items-center justify-between border-b border-[color:var(--line-dark)] pb-2">
                <span className="mono text-xs uppercase text-gold font-bold">International Requirements</span>
                <span className="mono text-[0.65rem] text-steel-grey">INPUT CHANNELS</span>
              </div>

              {demandNodes.map((node) => {
                const isSelected = activeRoute === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => toggleRoute(node.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-4 rounded border transition-all duration-300 relative group focus:outline-none focus:border-gold ${
                      isSelected
                        ? 'border-gold bg-navy-850 shadow-[0_0_15px_rgba(201,155,71,0.2)]'
                        : 'border-[color:var(--line-dark)] bg-navy-950/70 hover:border-gold/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-white group-hover:text-gold transition-colors">
                        {node.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[color:var(--text-muted-dark)]">{node.sub}</p>
                    {isSelected && (
                      <p className="mt-2 text-xs text-gold border-t border-[color:var(--line-dark)] pt-2">
                        {node.detail}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CENTER HUB: Wingr Wun Vetting & Advisory Core */}
            <div className="relative flex flex-col items-center justify-center py-6 lg:col-span-4">
              <div className="relative flex flex-col items-center text-center">
                {/* Central Hub Insignia with Concentric Radar Orbit */}
                <div className="relative">
                  {/* Rotating Outer Radar Wave */}
                  <div className="absolute -inset-3 sm:-inset-6 rounded-full border border-dashed border-gold/25 animate-radar pointer-events-none" />
                  <div className="absolute -inset-1.5 sm:-inset-3 rounded-full border border-gold/20 pointer-events-none" />

                  {/* Central Hub Insignia */}
                  <div className="relative z-10 flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border-2 border-gold bg-navy-950 shadow-[0_0_35px_rgba(201,155,71,0.35)]">
                    <img
                      src="/images/wingr_wun_logo.png"
                      alt="Wingr Wun Hub"
                      className="h-14 w-14 object-contain"
                    />
                    <span className="mono mt-1 text-[0.62rem] font-bold uppercase tracking-wider text-gold">
                      WINGR WUN
                    </span>
                    <span className="mono text-[0.55rem] text-steel-grey">ADVISORY CORE</span>
                  </div>
                </div>

                <div className="mt-6 max-w-[260px]">
                  <p className="mono text-xs uppercase text-white font-semibold">
                    {activeRoute ? 'Active Corridor Selected' : 'Strategic Vetting & Advisory'}
                  </p>
                  <p className="mt-1.5 text-xs text-[color:var(--text-muted-dark)] leading-relaxed">
                    Market intelligence, pedigree verification, and export compliance screening applied to every requirement.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Global Aerospace Supply */}
            <div className="space-y-3 lg:col-span-4">
              <div className="mb-2 flex items-center justify-between border-b border-[color:var(--line-dark)] pb-2">
                <span className="mono text-xs uppercase text-gold font-bold">Global Aerospace Supply</span>
                <span className="mono text-[0.65rem] text-steel-grey">VERIFIED SOURCES</span>
              </div>

              {supplyNodes.map((node) => {
                const isSelected = activeRoute === node.id;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => toggleRoute(node.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-4 rounded border transition-all duration-300 relative group focus:outline-none focus:border-gold ${
                      isSelected
                        ? 'border-gold bg-navy-850 shadow-[0_0_15px_rgba(201,155,71,0.2)]'
                        : 'border-[color:var(--line-dark)] bg-navy-950/70 hover:border-gold/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-white group-hover:text-gold transition-colors">
                        {node.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[color:var(--text-muted-dark)]">{node.sub}</p>
                    {isSelected && (
                      <p className="mt-2 text-xs text-gold border-t border-[color:var(--line-dark)] pt-2">
                        {node.detail}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="mt-8 border-t border-[color:var(--line-dark)] pt-4 flex flex-wrap items-center justify-between gap-4 mono text-[0.68rem] text-steel-grey">
            <span>VENDOR VETTING &amp; INTERNATIONAL LOGISTICS PIPELINE</span>
            <span className="text-gold">COMPLIANCE-ALIGNED PROCUREMENT ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

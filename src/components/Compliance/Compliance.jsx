import { Reveal, useScrollReveal } from '../../hooks/useScrollReveal.jsx';
import ShieldDrawing from '../illustrations/ShieldDrawing.jsx';
import { ShieldCheck, FileText, Globe, AlertTriangle } from 'lucide-react';

const complianceAreas = [
  {
    icon: Globe,
    title: 'International Trade Laws & Regulations',
    body: 'Navigating international trade legalities governing aerospace goods moving between sovereign jurisdictions, minimising delays through informed transactional structuring.',
  },
  {
    icon: ShieldCheck,
    title: 'Export Licensing & ITAR Advisory',
    body: 'Guidance concerning licensing requirements that attach to international aerospace transfers, including ITAR considerations where US defence articles or technical data are involved.',
  },
  {
    icon: FileText,
    title: 'Traceability & Pedigree Verification',
    body: 'Ensuring components are accompanied by proper airworthiness documentation, such as FAA 8130-3, EASA Form 1, or original manufacturer Certificates of Conformance.',
  },
  {
    icon: AlertTriangle,
    title: 'Compliance-Conscious Transaction Structuring',
    body: 'Structuring each stage of procurement in accordance with applicable export control regulations, ensuring compliance is handled as an integral foundation rather than an afterthought.',
  },
];

export default function Compliance() {
  const artRef = useScrollReveal({ threshold: 0.15 });

  return (
    <section id="compliance" aria-labelledby="comp-title" className="section-y relative isolate overflow-hidden bg-navy-950">
      <div className="grid-bg absolute inset-0 -z-10 opacity-30" aria-hidden="true" />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Text and 4 Compliance Areas */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">REGULATORY &amp; EXPORT GUIDANCE</span>
              <h2 id="comp-title" className="h2 mt-4 text-white tracking-tight">
                Compliance Integrated Throughout the Procurement Process.
              </h2>
              <p className="lede mt-6 text-[color:var(--text-muted-dark)]">
                Structured consultancy for navigating the complexities of international trade regulations and export controls.
              </p>
              <p className="mt-4 text-sm text-[color:var(--text-muted-dark)] leading-relaxed">
                International aerospace procurement is shaped by multiple regulatory layers. Wingr Wun provides guidance on navigating export licensing, trade laws, and documentation requirements as an integral part of procurement strategy.
              </p>
            </Reveal>

            <Reveal as="div" delay={160} className="mt-10 grid gap-5 sm:grid-cols-2">
              {complianceAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    className="group rounded border border-[color:var(--line-dark)] bg-navy-900/60 p-4 sm:p-6 transition-all duration-300 hover:border-gold/60 hover:bg-navy-900"
                  >
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded border border-[color:var(--line-dark)] bg-navy-950 text-gold group-hover:border-gold transition-colors">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-display mt-4 text-base font-semibold text-white group-hover:text-gold transition-colors">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted-dark)]">
                      {area.body}
                    </p>
                  </div>
                );
              })}
            </Reveal>

            {/* Clear Consultancy Notice */}
            <p className="mt-6 mono text-[0.68rem] text-steel-grey">
              * Wingr Wun operates as a strategic advisory consultancy. We assist clients in navigating regulatory frameworks and preparing compliant procurement documentation.
            </p>
          </div>

          {/* RIGHT: Animated Technical Shield Drawing */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={artRef}
              className="brackets relative w-full max-w-[420px] rounded border border-[color:var(--line-dark-strong)] bg-navy-900/70 p-5 sm:p-8 shadow-2xl backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between border-b border-[color:var(--line-dark)] pb-3 mono text-[0.68rem] text-steel-grey">
                <span className="text-gold font-medium">COMPLIANCE SCHEMATIC</span>
              </div>

              <div className="relative py-4">
                <ShieldDrawing className="trace mx-auto h-auto w-full max-w-[320px] drop-shadow-[0_0_25px_rgba(201,155,71,0.25)]" />
              </div>

              <div className="mt-4 border-t border-[color:var(--line-dark)] pt-3 flex flex-wrap items-center justify-between gap-2 mono text-[0.65rem] text-steel-grey">
                <span>TRADE LAW &amp; ITAR GUIDANCE</span>
                <span className="text-gold">STRUCTURED AUDIT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

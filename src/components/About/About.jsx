import { Compass, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';
import BridgeSchematic from '../illustrations/BridgeSchematic.jsx';

export default function About() {
  const pillars = [
    {
      icon: Compass,
      tag: 'ADVISORY',
      title: 'Strategic sourcing advisory',
      body: 'Informed procurement guidance evaluating mission parameters, platform lifecycles, and global market availability before commitments are made.',
      highlight: 'Platform Lifecycle Audit',
      focus: 'Operational Need',
    },
    {
      icon: ShieldCheck,
      tag: 'EVALUATION',
      title: 'Rigorous vendor vetting',
      body: 'Comprehensive audit of international OEMs, accredited stockists, and certified repair stations to ensure pedigree, financial stability, and strict quality adherence.',
      highlight: '100% Pedigree Audit',
      focus: 'Certified Quality',
    },
    {
      icon: Search,
      tag: 'INTELLIGENCE',
      title: 'Deep market intelligence',
      body: 'In-depth international market research across fragmented supply channels, tracing scarce components and obsolete spares through trusted aviation networks.',
      highlight: 'Obsolete & Legacy Spares',
      focus: 'Global Network',
    },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative bg-[#F2F2EF] text-[#071925] overflow-hidden">
      {/* Precision Light Grid */}
      <div className="grid-bg--light absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="container-x relative">
        {/* Top Header & Executive Lead */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow eyebrow--steel text-[0.88rem] sm:text-[0.98rem] font-bold tracking-[0.18em]">
              COMPANY POSITIONING &amp; MANDATE
            </span>
            <h2 id="about-title" className="h2 mt-2.5 sm:mt-3 text-[#071925] tracking-tight">
              A strategic bridge between defence requirements and global aerospace <br />
              supply
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-[1.04rem] leading-relaxed text-[#4A6272]">
              Wingr Wun is an aviation sourcing and procurement consultancy bridging the gap between international defence requirements and leading aerospace suppliers across global markets. We resolve procurement friction, navigate export compliance, and secure components essential to flight operations to maintain fleet readiness.
            </p>
          </div>
        </div>

        {/* Three Core Strategic Advisory Pillars (Full 3-Column Grid) */}
        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group flex flex-col justify-between rounded-lg border border-[rgba(7,25,37,0.12)] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#C99B47] hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[rgba(7,25,37,0.08)] pb-3 sm:pb-3.5">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-md border border-[rgba(7,25,37,0.1)] bg-[#F2F2EF] text-[#31566D] transition-colors duration-300 group-hover:border-[#C99B47] group-hover:text-[#C99B47] group-hover:bg-[#C99B47]/10">
                      <Icon size={20} strokeWidth={1.6} />
                    </div>
                    <span className="mono text-[0.68rem] font-bold uppercase tracking-wider text-[#31566D] bg-[#F2F2EF] px-2.5 py-1 rounded">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="font-display mt-4 text-lg font-bold text-[#071925] transition-colors group-hover:text-[#071925]">
                    {p.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#4A6272]">
                    {p.body}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[rgba(7,25,37,0.08)] flex items-center justify-between mono text-[0.7rem] text-[#31566D]">
                  <span className="font-semibold text-[#C99B47]">{p.highlight}</span>
                  <span className="text-[0.65rem] uppercase text-[#6E8798]">{p.focus}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Heritage & Compliance Credential Bar */}
        <div className="mt-6 sm:mt-7 rounded-lg border border-[rgba(7,25,37,0.12)] bg-white p-5 sm:p-6 shadow-sm">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
            {/* Heritage Quote */}
            <div className="lg:col-span-7 border-l-2 border-[#C99B47] pl-4 sm:pl-5">
              <span className="mono text-xs font-bold uppercase tracking-wider text-[#31566D] block mb-1">
                DEFENCE AVIATION HERITAGE
              </span>
              <p className="font-display text-base font-semibold leading-relaxed text-[#071925]">
                Established by Defence Aviation Experts and Specialists, bringing the rigour, discipline, and systematic precision of aviation practice to everyday operational and procurement challenges.
              </p>
            </div>

            {/* 4 Trust Badges */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 border-t border-[rgba(7,25,37,0.08)] pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                <span className="mono text-[0.72rem] text-[#31566D] font-semibold">ITAR / EAR Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                <span className="mono text-[0.72rem] text-[#31566D] font-semibold">100% Pedigree Trace</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                <span className="mono text-[0.72rem] text-[#31566D] font-semibold">Tier-1 International OEMs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C99B47] shrink-0" />
                <span className="mono text-[0.72rem] text-[#31566D] font-semibold">Expedited AOG Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Bridge Schematic Illustration */}
        <div className="brackets relative mt-8 sm:mt-10 overflow-hidden rounded-lg bg-navy-950 p-4 sm:p-6 lg:p-8 text-white shadow-2xl">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line-dark)] pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse-amber" />
                <span className="mono text-xs uppercase tracking-wider text-gold">PROCUREMENT PIPELINE ROUTE</span>
              </div>
              <div className="flex items-center gap-4 mono text-xs text-steel-grey">
                <span>SCHEMATIC // NOT TO SCALE</span>
                <span className="hidden sm:inline text-steel-grey/40">|</span>
                <span className="hidden sm:inline text-gold font-medium">COMPLETE SOURCING CORRIDOR</span>
              </div>
            </div>
            <BridgeSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}

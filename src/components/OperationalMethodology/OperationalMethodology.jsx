import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { Compass, CheckSquare, Target, Users } from 'lucide-react';

const pillars = [
  {
    icon: CheckSquare,
    title: 'Standard operating procedures & checklists',
    body: 'Translating flight deck and defence aviation discipline into procurement pipelines. Eliminating unverified assumptions and single points of failure before commitments are locked.',
  },
  {
    icon: Target,
    title: 'Aviation risk management frameworks',
    body: 'Assessing supply chain vulnerabilities with the rigour of flight operations. Identifying supply bottlenecks, regulatory obstacles, and counterfeit component hazards early.',
  },
  {
    icon: Users,
    title: 'Operational cross-functional coordination',
    body: 'Applying crew resource management (CRM) principles to complex international transactions — aligning technical engineers, procurement directors, legal teams, and logistics agents.',
  },
  {
    icon: Compass,
    title: 'Uncompromising operational readiness',
    body: 'Viewing procurement not as administrative overhead, but as mission readiness. Every part, rotable, and document is sourced to ensure aircraft stay in the air.',
  },
];

export default function OperationalMethodology() {
  return (
    <section id="methodology" aria-labelledby="methodology-title" className="section-y relative bg-[#F2F2EF] text-[#071925] overflow-hidden">
      <div className="grid-bg--light absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <span className="eyebrow eyebrow--steel">AVIATION SPECIALISTS &amp; METHODOLOGY</span>
            <h2 id="methodology-title" className="h2 mt-2.5 sm:mt-3 text-[#071925] tracking-tight">
              Operational consultancy built for real-world challenges
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="text-sm leading-relaxed text-[#4A6272]">
              Established by defence aviation experts and experienced professionals, we help organisations strengthen operations, address complex challenges, and achieve sustainable improvements through proven methodologies, practical insight, and disciplined execution.
            </p>
          </Reveal>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal
                as="div"
                key={p.title}
                delay={i * 90}
                className="group rounded border border-[rgba(7,25,37,0.12)] bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-[#C99B47] hover:shadow-md"
              >
                <div className="border-b border-[rgba(7,25,37,0.08)] pb-3 sm:pb-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded border border-[rgba(7,25,37,0.1)] bg-[#F2F2EF] text-[#31566D] group-hover:border-[#C99B47] group-hover:text-[#C99B47] transition-colors">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="font-display mt-3.5 sm:mt-4 text-base font-bold text-[#071925] group-hover:text-[#071925]">
                  {p.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#4A6272]">
                  {p.body}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Enhanced Visual & Quote Banner */}
        <div className="mt-8 sm:mt-10 overflow-hidden rounded border border-[rgba(7,25,37,0.14)] bg-navy-950 text-white shadow-xl">
          <div className="grid lg:grid-cols-12 items-stretch">
            {/* Left Content */}
            <div className="p-5 sm:p-7 lg:p-8 lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
                  <span className="mono text-xs uppercase tracking-wider text-gold">
                    FLIGHT DECK DISCIPLINE IN COMMERCIAL PRACTICE
                  </span>
                </div>
                <blockquote className="mt-3 sm:mt-3.5 font-display text-lg sm:text-xl font-medium leading-snug text-white">
                  "In defence aviation, operational discipline is not an afterthought — it is the foundation of survival and mission success. Our Aviation Specialists translate that exact rigour into commercial procurement, vendor accountability, and organisational workflows."
                </blockquote>
                <p className="mt-3 text-xs leading-relaxed text-[color:var(--text-muted-dark)]">
                  By applying structured pre-flight checklist methodologies, crew resource management (CRM), and proactive risk matrices, Wingr Wun eliminates single points of failure across complex international procurement pipelines.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-[color:var(--line-dark)] flex flex-wrap items-center justify-between gap-4 mono text-[0.7rem] text-steel-grey">
                <span className="text-white font-medium">WINGR WUN // ADVISORY PRACTICE</span>
                <span className="text-gold">DEFENCE AVIATION EXPERTS</span>
              </div>
            </div>

            {/* Right Cockpit Imagery with Precision HUD / Telemetry */}
            <div className="relative lg:col-span-5 min-h-[240px] sm:min-h-[280px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[color:var(--line-dark)] group">
              <img
                src="/images/cockpit_annunciator.jpg"
                alt="High-precision glass cockpit avionics flight deck and flight management systems"
                className="h-full w-full object-cover object-center filter brightness-105 contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-navy-950/20 pointer-events-none" />
              <div className="grid-bg absolute inset-0 opacity-15 pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 bg-navy-950/85 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-lg border border-[color:var(--line-dark)] mono text-[0.65rem] sm:text-[0.68rem] text-steel-grey shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
                  <span className="text-white font-medium">COCKPIT CRM &amp; AVIONICS REGIME</span>
                </div>
                <span className="text-gold font-bold">ZERO ERROR TOLERANCE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Compass, Radio } from 'lucide-react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';

const enquiryPoints = [
  { title: 'The requirement', body: 'Aircraft type, part number (P/N), rotable assembly or legacy structural item.' },
  { title: 'Operational context', body: 'AOG emergency, planned depot maintenance, or fleet capability upgrade.' },
  { title: 'Certification standard', body: 'FAA 8130-3, EASA Form 1, Factory New C of C, or dual-release trace.' },
  { title: 'Delivery timeline', body: 'Target arrival date, destination airport/base code, and bonded transit criteria.' },
];

export default function FinalCTA({ onOpenRFQ }) {
  return (
    <section id="contact" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-[#071925]">
      {/* Background Grid */}
      <div className="grid-bg absolute inset-0 -z-20 opacity-40" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(49, 86, 109, 0.25) 0%, transparent 60%)',
        }}
      />

      <div className="container-x section-y">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
          {/* LEFT: Copy & CTAs */}
          <Reveal className="max-w-[44rem] min-w-0 lg:col-span-7">
            <span className="eyebrow">ENGAGE THE SOURCING DESK</span>
            <h2 id="cta-title" className="h2 mt-2.5 sm:mt-3 text-white tracking-tight">
              How can we help?
            </h2>
            <p className="lede mt-3 sm:mt-3.5 text-[color:var(--text-muted-dark)]">
              Engage early. Share the aircraft, component, platform or supply chain requirement and our team will assess the available sourcing route.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onOpenRFQ}
                className="btn btn-primary"
              >
                Discuss Requirements
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <a href="#services" className="btn btn-outline">
                Our Services
              </a>
            </div>
          </Reveal>

          {/* RIGHT: Animated Radar / Aircraft Tracking Graphic */}
          <div className="flex justify-center min-w-0 lg:col-span-5">
            <div className="brackets relative flex h-[min(18rem,80vw)] w-[min(18rem,80vw)] sm:h-84 sm:w-84 aspect-square items-center justify-center rounded-full border border-gold/30 bg-navy-950/80 shadow-[0_0_40px_rgba(7,25,37,0.9)] backdrop-blur-md overflow-hidden">
              {/* Concentric Radar Rings */}
              <div className="absolute inset-4 rounded-full border border-gold/15" />
              <div className="absolute inset-12 rounded-full border border-dashed border-steel-grey/20" />
              <div className="absolute inset-24 rounded-full border border-gold/20" />

              {/* Crosshair Axes */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-steel-grey/25" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-steel-grey/25" />

              {/* Rotating Radar Sweep Cone */}
              <div
                className="absolute inset-0 rounded-full animate-radar pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(201, 155, 71, 0.28) 0deg, transparent 60deg, transparent 360deg)',
                }}
              />

              {/* Center Aircraft Blip & Beacon */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-80" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-gold" />
                </span>
                <span className="mono mt-2 text-[0.62rem] font-bold tracking-wider text-gold">
                  RADAR ACTIVE
                </span>
                <span className="mono text-[0.55rem] text-steel-grey">CORRIDOR 340° // FL380</span>
              </div>

              {/* Satellite Coordinate Blips */}
              <div className="absolute right-12 top-14 h-2 w-2 rounded-full bg-gold animate-pulse-amber" />
              <div className="absolute left-10 bottom-16 h-2 w-2 rounded-full bg-white/70 animate-pulse-amber" />

              {/* Radar Corner Compass Marks */}
              <span className="mono absolute top-2 text-[0.6rem] text-gold">000° N</span>
              <span className="mono absolute bottom-2 text-[0.6rem] text-steel-grey">180° S</span>
              <span className="mono absolute right-2 text-[0.6rem] text-steel-grey">090° E</span>
              <span className="mono absolute left-2 text-[0.6rem] text-steel-grey">270° W</span>
            </div>
          </div>
        </div>

        {/* Preparing an Enquiry Checklist Box */}
        <Reveal
          delay={150}
          className="brackets mt-8 sm:mt-10 rounded border border-[color:var(--line-dark)] bg-navy-950/70 p-5 sm:p-7 lg:p-8 shadow-2xl backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line-dark)] pb-3 sm:pb-3.5">
            <h3 className="mono text-xs font-semibold uppercase text-gold">Preparing a requirement enquiry</h3>
            <p className="mono text-[0.7rem] uppercase text-steel-grey">Key parameters for expedited dispatch</p>
          </div>

          <div className="mt-4 sm:mt-5 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {enquiryPoints.map((item) => (
              <div key={item.title} className="border-t border-[color:var(--line-dark)] pt-3.5 sm:pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
                <h4 className="font-display text-base font-bold text-white">{item.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted-dark)]">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

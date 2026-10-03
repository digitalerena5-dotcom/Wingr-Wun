import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroAircraftVisual from './HeroAircraftVisual.jsx';

export default function Hero({ onOpenRFQ }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 pt-[var(--header-h)]"
    >
      {/* Background Engineering Grid */}
      <div
        className="grid-bg pointer-events-none absolute inset-0 -z-20 opacity-30 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Aerospace Gradient Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at 78% 42%, rgba(49, 86, 109, 0.3) 0%, rgba(7, 25, 37, 0) 65%), linear-gradient(180deg, rgba(7,25,37,0.2) 0%, #071925 100%)',
        }}
      />

      {/* Precision Frame Crosshairs */}
      <span className="crosshair left-[var(--gutter)] top-[calc(var(--header-h)+28px)] hidden text-steel-grey/60 md:block" aria-hidden="true" />
      <span className="crosshair right-[var(--gutter)] top-[calc(var(--header-h)+28px)] hidden text-steel-grey/60 md:block" aria-hidden="true" />

      {/* Main Hero Container */}
      <div className="container-x relative flex flex-1 flex-col justify-center py-12 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* LEFT: Business Positioning & Strong Editorial Typography */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="intro flex flex-wrap items-center gap-3" style={{ '--d': '100ms' }}>
              <span className="eyebrow">AVIATION SOURCING &amp; PROCUREMENT CONSULTANCY</span>
            </div>

            <h1
              id="hero-title"
              className="h1 intro mt-6 text-white md:mt-8 tracking-tight"
              style={{ '--d': '220ms' }}
            >
              Connecting<br />
              Critical Aviation<br />
              Requirements<br />
              With <span className="text-[color:var(--c-gold-soft)]">Trusted</span><br />
              Global Supply
            </h1>

            {/* Client Authorized Supporting Copy */}
            <p
              className="lede intro mt-6 max-w-[36rem] text-[color:var(--text-muted-dark)]"
              style={{ '--d': '380ms' }}
            >
              Wingr Wun connects international defence markets with trusted Western aerospace suppliers through
              strategic sourcing, vendor vetting, legacy component procurement, and supply chain advisory.
            </p>

            {/* Clear Primary & Secondary Actions */}
            <div
              className="intro mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4 md:mt-11"
              style={{ '--d': '520ms' }}
            >
              <button
                type="button"
                onClick={onOpenRFQ}
                className="btn btn-primary"
              >
                Discuss Your Requirement
                <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>

              <a href="#services" className="btn btn-outline">
                Explore Our Services
              </a>
            </div>

            {/* Subtle Telemetry Coordinates */}
            <div className="intro mt-8 flex items-center gap-6 mono text-[0.7rem] text-steel-grey" style={{ '--d': '650ms' }}>
              <span>INTERNATIONAL DEFENCE &amp; WESTERN SOURCING</span>
              <span className="text-gold">DEFENSE AVIATION EXPERTS</span>
            </div>
          </div>

          {/* RIGHT: Professional 3/4 Perspective Aircraft Visual with Layered Motion */}
          <div className="relative lg:col-span-6 xl:col-span-6">
            <HeroAircraftVisual mousePos={mousePos} />
          </div>
        </div>
      </div>

      {/* Bottom Hero Trust / Discipline Strip */}
      <div className="border-y border-[color:var(--line-dark)] bg-navy-900/70 backdrop-blur-sm">
        <div className="container-x py-3.5 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-y-3 text-[0.72rem] sm:text-[0.78rem] tracking-wider mono text-steel-grey">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-white font-medium">STRATEGIC SOURCING</span>
            </div>
            <span className="hidden md:inline text-[color:var(--line-dark)]">/</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-white font-medium">VENDOR VETTING</span>
            </div>
            <span className="hidden md:inline text-[color:var(--line-dark)]">/</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-white font-medium">LEGACY ROTABLES</span>
            </div>
            <span className="hidden md:inline text-[color:var(--line-dark)]">/</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-white font-medium">EXPORT COMPLIANCE</span>
            </div>
            <span className="hidden md:inline text-[color:var(--line-dark)]">/</span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-amber" />
              <span className="text-gold font-medium">TRANSIT LOGISTICS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

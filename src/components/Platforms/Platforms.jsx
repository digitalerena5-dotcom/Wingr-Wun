import { useState, useEffect } from 'react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { platformCategories } from '../../data/platforms.js';
import { CheckCircle2, ChevronRight, RotateCw, Box, Play, Pause } from 'lucide-react';

export default function Platforms({ onOpenRFQ }) {
  const [selectedId, setSelectedId] = useState('commercial');
  const [rotationMode, setRotationMode] = useState('spin'); // 'spin' (360 axial) | 'turntable' (3D gimbal)
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState('slow'); // 'slow' | 'ultra'
  const [telemetryAngle, setTelemetryAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeCategory = platformCategories.find((c) => c.id === selectedId) || platformCategories[0];
  const desktopDuration = speed === 'ultra' ? 38 : 24;
  // Slower, smooth and controlled rotation on mobile (64s / 88s vs desktop 24s / 38s)
  const duration = isMobile ? (speed === 'ultra' ? 88 : 64) : desktopDuration;

  // Real-time telemetry angle computation for the HUD display
  useEffect(() => {
    if (isPaused) return;
    let rafId;
    const start = performance.now();
    const loop = (now) => {
      const elapsed = (now - start) / 1000;
      if (rotationMode === 'spin') {
        const angle = ((elapsed / duration) * 360) % 360;
        setTelemetryAngle(angle);
      } else {
        const yaw = Math.sin((elapsed / duration) * Math.PI * 2) * 18;
        setTelemetryAngle(yaw);
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, rotationMode, speed, duration]);

  return (
    <section id="platforms" aria-labelledby="platforms-title" className="relative bg-[#081B28] text-white overflow-hidden border-t border-[color:var(--line-dark)]">
      <div className="grid lg:min-h-[52rem] lg:grid-cols-12">
        {/* LEFT COLUMN: Technical Exploded Assembly Visual (Dark Aerospace Panel) */}
        <div className="relative order-2 overflow-hidden bg-navy-950 p-4 sm:p-10 lg:order-1 lg:col-span-6 lg:p-12">
          <div className="grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <span className="crosshair left-6 top-6 text-steel-grey/70" aria-hidden="true" />
          <span className="crosshair bottom-6 right-6 text-steel-grey/70" aria-hidden="true" />

          <div className="relative flex flex-col justify-between h-full">
            {/* Header with Mode Selectors & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--line-dark)] pb-3 mono text-[0.7rem] text-steel-grey">
              <div className="flex items-center gap-2">
                <span className="text-gold font-medium uppercase">COMPONENT BREAKDOWN</span>
                <span className="hidden sm:inline text-steel-grey/40">|</span>
                <span className="hidden sm:inline text-white/70">ROTATION TELEMETRY</span>
              </div>

              {/* Slow Motion Controls */}
              <div className="flex items-center gap-1 bg-navy-900/90 border border-[color:var(--line-dark)] rounded-md p-1 shadow-sm">
                <button
                  type="button"
                  onClick={() => setRotationMode('spin')}
                  title="Slow Motion 360° Continuous Axial Spin"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[0.62rem] mono transition-all ${
                    rotationMode === 'spin'
                      ? 'bg-gold text-navy-950 font-bold shadow-sm'
                      : 'text-steel-grey hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <RotateCw size={11} className={!isPaused && rotationMode === 'spin' ? 'animate-spin' : ''} style={{ animationDuration: '6s' }} />
                  <span>360° SPIN</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRotationMode('turntable')}
                  title="Slow Motion 3D CAD Hologram Turntable"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[0.62rem] mono transition-all ${
                    rotationMode === 'turntable'
                      ? 'bg-gold text-navy-950 font-bold shadow-sm'
                      : 'text-steel-grey hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Box size={11} />
                  <span>3D TURNTABLE</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  title={isPaused ? 'Resume Slow Motion Rotation' : 'Pause Rotation'}
                  className="p-1 rounded text-steel-grey hover:text-gold hover:bg-navy-800 transition-colors ml-0.5"
                  aria-label={isPaused ? 'Resume slow motion rotation' : 'Pause rotation'}
                >
                  {isPaused ? <Play size={11} className="text-gold fill-gold" /> : <Pause size={11} />}
                </button>

                <button
                  type="button"
                  onClick={() => setSpeed(speed === 'slow' ? 'ultra' : 'slow')}
                  title={`Rotation Speed: ${speed === 'slow' ? (isMobile ? 'Slow (64s / rev)' : 'Slow (24s / rev)') : (isMobile ? 'Ultra-Slow (88s / rev)' : 'Ultra-Slow (38s / rev)')}`}
                  className="px-1.5 py-0.5 rounded text-[0.58rem] mono text-steel-grey hover:text-white hover:bg-navy-800 border-l border-white/10"
                >
                  {speed === 'slow' ? (isMobile ? '64s' : '24s') : (isMobile ? '88s' : '38s')}
                </button>
              </div>
            </div>

            {/* High-Fidelity 3D Exploded Component Schematic with Slow-Motion Rotation */}
            <div className="my-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--line-dark-strong)] bg-[#040C14] shadow-[0_20px_50px_rgba(7,25,37,0.9)] relative group [perspective:1200px] [isolation:isolate]">
              {/* Dynamic Live Telemetry Badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 max-w-[calc(100%-1.25rem)] flex items-center gap-1.5 sm:gap-2 rounded border border-gold/30 bg-navy-950/90 px-2 sm:px-2.5 py-1 backdrop-blur-md mono text-[0.58rem] sm:text-[0.62rem] text-gold shadow-md truncate">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-gold animate-pulse-amber'}`} />
                <span className="truncate">
                  {rotationMode === 'spin'
                    ? `AXIAL ROTATION // ${telemetryAngle.toFixed(1)}° (${isPaused ? 'PAUSED' : 'SLOW MOTION'})`
                    : `3D CAD YAW // ${telemetryAngle > 0 ? '+' : ''}${telemetryAngle.toFixed(1)}° (${isPaused ? 'PAUSED' : 'SLOW MOTION'})`}
                </span>
              </div>

              {/* Telemetry HUD Top-Right: Speed/RPM Indicator */}
              <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1.5 rounded border border-white/10 bg-navy-950/80 px-2 py-0.5 backdrop-blur-md mono text-[0.6rem] text-steel-grey">
                <span className="text-cyan-400">TELEMETRY</span>
                <span>•</span>
                <span>{speed === 'slow' ? (isMobile ? '0.28 RPM' : '0.75 RPM') : (isMobile ? '0.19 RPM' : '0.45 RPM')}</span>
              </div>

              {/* The Rotating Schematic Layer (Hardware Accelerated Slow Motion) */}
              <div
                style={{
                  animationPlayState: isPaused ? 'paused' : 'running',
                  '--rot-duration': `${duration}s`,
                }}
                className={`h-full w-full flex items-center justify-center ${
                  rotationMode === 'spin' ? 'animate-spin-slow-360' : 'animate-cad-rotate'
                } transition-all duration-700 ease-out`}
              >
                <img
                  src="/images/exploded_component_schematic.jpg"
                  alt="High-precision technical exploded view schematic of aerospace component assembly and rotables"
                  className={`h-full w-full object-cover object-center filter brightness-105 contrast-[1.02] ${
                    rotationMode === 'spin' ? 'scale-[1.12] sm:scale-[1.32]' : 'scale-[1.02] sm:scale-[1.03]'
                  } transition-transform duration-700 ease-out`}
                  loading="lazy"
                />
              </div>

              {/* Slow-motion Laser Scan Beam Overlay */}
              <div className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent animate-laser-scan border-b border-cyan-400/40 z-10" />

              {/* Atmospheric Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-950/30 pointer-events-none z-10" />
              <div className="grid-bg absolute inset-0 opacity-15 pointer-events-none z-10" />
            </div>

            {/* Active Platform Callout Cards */}
            <div className="rounded border border-[color:var(--line-dark)] bg-navy-900/80 p-4 sm:p-5 backdrop-blur-sm">
              <p className="mono text-[0.68rem] uppercase text-gold">SOURCING CAPABILITY SCOPE</p>
              <p className="font-display mt-1 text-base font-bold text-white">{activeCategory.label}</p>
              <p className="mt-1 text-xs text-[color:var(--text-muted-dark)]">{activeCategory.aircraft}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Content & Category Scope */}
        <div className="order-1 flex items-center p-5 sm:p-12 lg:order-2 lg:col-span-6 lg:p-16 xl:p-20">
          <div className="w-full max-w-xl">
            <Reveal>
              <span className="eyebrow">COMPONENT &amp; SUBSYSTEM SCOPE</span>
              <h2 id="platforms-title" className="h2 mt-4 text-white tracking-tight">
                Keeping Legacy<br />
                Platforms Operational.
              </h2>
              <p className="lede mt-6 text-[color:var(--text-muted-dark)]">
                Our sourcing work spans aircraft components, subsystems, and legacy technologies. We locate scarce components and obsolete spares to extend the operational service life and readiness of mature aircraft fleets.
              </p>
            </Reveal>

            {/* Category Selector Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 border-b border-[color:var(--line-dark)] pb-4">
              {platformCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedId(cat.id)}
                  className={`px-3.5 py-1.5 rounded mono text-xs font-semibold tracking-wide transition-all ${
                    selectedId === cat.id
                      ? 'bg-gold text-navy-950 font-bold shadow-sm'
                      : 'bg-navy-900 text-steel-grey hover:bg-navy-800 hover:text-white border border-[color:var(--line-dark)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Selected Platform Detail Card */}
            <div className="mt-6 space-y-4">
              <p className="text-sm leading-relaxed text-[color:var(--text-muted-dark)]">
                {activeCategory.description}
              </p>

              <div className="border-t border-[color:var(--line-dark)] pt-4">
                <span className="mono text-[0.7rem] uppercase text-gold font-bold">
                  ILLUSTRATIVE COMPONENT CATEGORIES SOURCED
                </span>
                <ul className="mt-3 space-y-2.5">
                  {activeCategory.components.map((comp) => (
                    <li key={comp.name} className="flex items-start gap-2.5 text-xs text-white">
                      <CheckCircle2 size={15} className="text-[#C99B47] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white">{comp.name}:</span>{' '}
                        <span className="text-[color:var(--text-muted-dark)]">{comp.spec}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenRFQ}
                  className="btn btn-primary"
                >
                  Discuss Component Sourcing
                  <ChevronRight size={16} />
                </button>
              </div>

              <p className="mt-4 mono text-[0.65rem] text-steel-grey">
                * Platform mentions represent component sourcing and legacy rotable capability. Wingr Wun is an independent sourcing consultancy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

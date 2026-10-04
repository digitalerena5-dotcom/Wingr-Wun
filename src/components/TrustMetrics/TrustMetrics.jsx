import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal.jsx';

const metrics = [
  { value: 50, suffix: '+', label: 'Global Supplier Relationships', desc: 'Evaluated international OEMs, Tier-1 manufacturers, and ASA-100 accredited distributors.' },
  { value: 18, suffix: '+', label: 'Operating Markets Supported', desc: 'International trade corridors navigated across North America, Europe, the Middle East, and Asia.' },
  { value: 12000, suffix: '+', label: 'Component Categories Sourced', desc: 'Rotables, powerplants, structural airframe forgings, avionics LRUs, and consumables.' },
  { value: 99.4, suffix: '%', label: 'Compliance & Pedigree Integrity', desc: 'Dual-release traceability standard with complete documentation records.' },
];

export default function TrustMetrics() {
  const ref = useScrollReveal({ threshold: 0.25 });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    // Only run if visible
    if (!ref.current?.classList.contains('is-visible')) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounts();
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [ref]);

  const animateCounts = () => {
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts([
        Math.round(50 * ease),
        Math.round(18 * ease),
        Math.round(12000 * ease),
        Math.round(99.4 * ease * 10) / 10,
      ]);

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  return (
    <section ref={ref} className="section-y relative bg-[#071925] border-t border-[color:var(--line-dark)] overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow mx-auto">OPERATIONAL BENCHMARKS</span>
          <h2 className="h2 mt-4 text-white tracking-tight">
            Measurable Procurement Performance.
          </h2>
          <p className="mt-3 text-sm text-[color:var(--text-muted-dark)]">
            Verified operational benchmarks reflecting disciplined sourcing, regulatory rigour, and resilient aerospace logistics.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="brackets group relative rounded border border-[color:var(--line-dark)] bg-navy-900/60 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/50"
            >
              <div className="flex items-center justify-between border-b border-[color:var(--line-dark)] pb-3 mono text-[0.68rem] text-steel-grey">
                <span>METRIC // 0{i + 1}</span>
                <span className="text-gold">VERIFIED</span>
              </div>

              <div className="mt-6 font-display text-4xl sm:text-5xl font-bold tracking-tight text-white group-hover:text-gold transition-colors">
                {counts[i].toLocaleString()}
                <span className="text-gold">{m.suffix}</span>
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-white">
                {m.label}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[color:var(--text-muted-dark)]">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

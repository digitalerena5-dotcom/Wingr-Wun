import { useEffect, useState } from 'react';

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only run if user hasn't reduced motion
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 150);
          return 100;
        }
        return prev + 15;
      });
    }, 85);

    return () => clearInterval(interval);
  }, []);

  if (complete) return null;

  return (
    <div
      role="status"
      aria-label="Loading aerospace systems"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-700 ease-precise"
      style={{ opacity: progress === 100 ? 0 : 1, pointerEvents: progress === 100 ? 'none' : 'auto' }}
    >
      <div className="flex flex-col items-center px-6">
        {/* Transparent logo emblem */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 animate-ping-slow rounded-full bg-gold/10" />
          <img
            src="/images/wingr_wun_logo.png"
            alt="Wingr Wun Seal"
            width="64"
            height="64"
            className="relative h-16 w-16 object-contain drop-shadow-[0_0_20px_rgba(201,155,71,0.4)]"
          />
        </div>

        {/* Telemetry mark */}
        <div className="mono mb-4 text-center text-[0.72rem] tracking-[0.25em] text-gold uppercase">
          SYS.ONLINE // FLIGHT LEVEL SOURCING
        </div>

        {/* Thin progress line */}
        <div className="relative h-[2px] w-48 overflow-hidden rounded bg-[color:var(--line-dark-strong)] sm:w-64">
          <div
            className="absolute inset-y-0 left-0 bg-gold transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mono mt-3 flex w-48 justify-between text-[0.65rem] text-steel-grey sm:w-64">
          <span>CALIBRATING 24.86°N</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}

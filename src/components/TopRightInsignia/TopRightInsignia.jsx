import { useState } from 'react';

export default function TopRightInsignia({ onOpenRFQ }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed right-3 top-2.5 z-50 sm:right-6 sm:top-3.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex items-center gap-3">
        {/* Aerospace Telemetry Label (expands on hover) */}
        <div
          className={`pointer-events-none hidden items-center gap-2 rounded border border-[color:var(--line-gold)] bg-navy-950/90 px-3 py-1.5 backdrop-blur-md transition-all duration-300 md:flex ${
            hovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className="mono text-[0.68rem] tracking-wider text-white">
            WINGR WUN <span className="text-gold">PRECISION SEAL</span>
          </span>
        </div>

        {/* Refined Circular Emblem Button */}
        <button
          type="button"
          onClick={() => {
            if (onOpenRFQ) onOpenRFQ();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Wingr Wun Official Crest — Click to discuss your requirement"
          aria-label="Wingr Wun Official Crest"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-navy-950/80 shadow-[0_4px_20px_rgba(7,25,37,0.7)] backdrop-blur-md transition-all duration-500 hover:border-gold hover:shadow-[0_0_24px_rgba(201,155,71,0.35)] sm:h-12 sm:w-12"
        >
          {/* Subtle rotating orbit border on hover */}
          <span
            className="absolute -inset-[3px] rounded-full border border-dashed border-gold/25 opacity-0 transition-opacity duration-500 group-hover:animate-radar group-hover:opacity-100"
            aria-hidden="true"
          />

          {/* Transparent Background Logo */}
          <img
            src="/images/wingr_wun_logo.png"
            alt="Wingr Wun Official Seal"
            width="38"
            height="38"
            className="h-8 w-8 object-contain transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9"
          />
        </button>
      </div>
    </div>
  );
}

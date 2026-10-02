// "Requirement → Supply" route figure for the closing call to action.
// A top-view airliner travels once along a route over a navigation ring,
// lighting the path behind it. Purely illustrative: no real coordinates,
// routes or aircraft type are implied.
import { useEffect, useRef } from 'react';

const P0 = [118, 482];
const P1 = [330, 540];
const P2 = [540, 120];
const P3 = [790, 168];
const ROUTE = `M ${P0} C ${P1} ${P2} ${P3}`;
const STOP = 0.64; // where the aircraft comes to rest along the route
const CX = 470;
const CY = 320;

function bezier(t) {
  const u = 1 - t;
  const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
  const x = a * P0[0] + b * P1[0] + c * P2[0] + d * P3[0];
  const y = a * P0[1] + b * P1[1] + c * P2[1] + d * P3[1];
  const dx = 3 * u * u * (P1[0] - P0[0]) + 6 * u * t * (P2[0] - P1[0]) + 3 * t * t * (P3[0] - P2[0]);
  const dy = 3 * u * u * (P1[1] - P0[1]) + 6 * u * t * (P2[1] - P1[1]) + 3 * t * t * (P3[1] - P2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const planeTransform = (t) => {
  const { x, y, angle } = bezier(t);
  return `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(1.55)`;
};

const ticks = Array.from({ length: 120 }, (_, i) => {
  const a = (i / 120) * Math.PI * 2;
  const r1 = 268;
  const r2 = i % 10 === 0 ? 284 : i % 5 === 0 ? 278 : 274;
  return [CX + r1 * Math.cos(a), CY + r1 * Math.sin(a), CX + r2 * Math.cos(a), CY + r2 * Math.sin(a)];
});

// Detailed top view, nose pointing +x, centred on the wing.
function Airliner() {
  const half = (s) => (
    <g transform={`scale(1 ${s})`}>
      {/* wing with winglet */}
      <path d="M 16 -7 L -22 -62 L -24 -69 L -29 -69.5 L -29 -63 L -8 -24 L -15 -7 Z" />
      {/* flap hinge line */}
      <path d="M -11 -14 L -24 -56" strokeDasharray="2 3" opacity="0.6" />
      {/* engine nacelle + pylon */}
      <rect x="-9" y="-31.5" width="22" height="8" rx="3" />
      <line x1="13" y1="-27.5" x2="15.5" y2="-27.5" />
      {/* horizontal stabiliser */}
      <path d="M -52 -5.5 L -69 -25 L -75 -25 L -67 -5.5 Z" />
    </g>
  );
  return (
    <g fill="#0B1D2A" stroke="#E9EEF1" strokeWidth="0.75" strokeLinejoin="round">
      {half(1)}
      {half(-1)}
      {/* fuselage */}
      <path d="M 80 0 C 80 -5 74 -7.5 63 -7.5 L -50 -7.5 C -61 -7 -70 -3.5 -78 0 C -70 3.5 -61 7 -50 7.5 L 63 7.5 C 74 7.5 80 5 80 0 Z" />
      {/* fin (edge-on) and cockpit */}
      <line x1="-58" y1="0" x2="-79" y2="0" stroke="#D6BD87" strokeWidth="1.4" />
      <path d="M 70 -3.6 L 75 -2 L 75 2 L 70 3.6" fill="none" stroke="#D6BD87" />
      {/* cabin centreline */}
      <line x1="-46" y1="0" x2="62" y2="0" strokeDasharray="1.5 3" opacity="0.45" />
    </g>
  );
}

export default function RouteFigure({ className = '' }) {
  const wrapRef = useRef(null);
  const planeRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    if (!wrap || !plane || !trail) return undefined;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return undefined;

    let raf = 0;
    const set = (t) => {
      plane.setAttribute('transform', planeTransform(t));
      trail.style.strokeDashoffset = String(1 - t);
    };
    set(0.02);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 2600;
        const step = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          set(0.02 + (STOP - 0.02) * eased);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 }
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      <svg viewBox="40 20 880 600" className="block h-auto w-full" role="img" aria-label="An aircraft following a route from requirement to supply, drawn over a navigation ring">
        <defs>
          <radialGradient id="rf-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#31566D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#31566D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* navigation ring */}
        <circle cx={CX} cy={CY} r="300" fill="url(#rf-glow)" />
        <g fill="none" stroke="#31566D">
          <circle cx={CX} cy={CY} r="268" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="190" strokeWidth="1" strokeDasharray="2 6" opacity="0.8" />
          <circle cx={CX} cy={CY} r="110" strokeWidth="1" opacity="0.6" />
          <line x1={CX - 290} y1={CY} x2={CX + 290} y2={CY} strokeDasharray="14 6 3 6" opacity="0.7" />
          <line x1={CX} y1={CY - 290} x2={CX} y2={CY + 290} strokeDasharray="14 6 3 6" opacity="0.7" />
        </g>
        <g stroke="#6E8798" strokeWidth="1" opacity="0.7">
          {ticks.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        <g fontFamily="IBM Plex Mono, monospace" fontSize="14" fill="#6E8798" textAnchor="middle" letterSpacing="2">
          <text x={CX} y={CY - 296}>N</text>
          <text x={CX + 304} y={CY + 5}>E</text>
          <text x={CX} y={CY + 309}>S</text>
          <text x={CX - 304} y={CY + 5}>W</text>
        </g>

        {/* route: full path dashed, travelled portion solid gold */}
        <path d={ROUTE} fill="none" stroke="#6E8798" strokeWidth="1.2" strokeDasharray="5 7" opacity="0.8" />
        <path
          ref={trailRef}
          d={ROUTE}
          pathLength="1"
          fill="none"
          stroke="#C8A96B"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 - STOP }}
        />

        {/* waypoints */}
        {[0.3, 0.82].map((t) => {
          const { x, y } = bezier(t);
          return <rect key={t} x={x - 4} y={y - 4} width="8" height="8" transform={`rotate(45 ${x} ${y})`} fill="#071421" stroke="#9FB1BD" />;
        })}

        {/* origin + destination */}
        <g>
          <rect x={P0[0] - 7} y={P0[1] - 7} width="14" height="14" fill="#071421" stroke="#C8A96B" strokeWidth="1.4" />
          <rect x={P0[0] - 2.5} y={P0[1] - 2.5} width="5" height="5" fill="#C8A96B" />
          <circle cx={P3[0]} cy={P3[1]} r="16" fill="none" stroke="#C8A96B" strokeWidth="1" opacity="0.6" />
          <rect x={P3[0] - 7} y={P3[1] - 7} width="14" height="14" fill="#071421" stroke="#C8A96B" strokeWidth="1.4" />
          <rect x={P3[0] - 2.5} y={P3[1] - 2.5} width="5" height="5" fill="#C8A96B" />
        </g>
        <g fontFamily="IBM Plex Mono, monospace" letterSpacing="2.4">
          <text x={P0[0] - 6} y={P0[1] + 36} fontSize="14" fill="#E9EEF1">REQUIREMENT</text>
          <text x={P0[0] - 6} y={P0[1] + 56} fontSize="12" fill="#6E8798">ORIGIN</text>
          <text x={P3[0] + 8} y={P3[1] - 34} fontSize="14" fill="#E9EEF1" textAnchor="middle">SUPPLY</text>
          <text x={P3[0] + 8} y={P3[1] - 54} fontSize="12" fill="#6E8798" textAnchor="middle">DESTINATION</text>
        </g>

        {/* aircraft */}
        <g ref={planeRef} transform={planeTransform(STOP)}>
          <Airliner />
        </g>
      </svg>
    </div>
  );
}

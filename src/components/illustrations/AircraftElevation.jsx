// Side elevation of a generic twin-engine transport aircraft, drawn as an
// engineering figure. With `detail`, a callout links the engine inlet to an
// enlarged fan-stage view ("Detail A"). No real type, registration or
// dimensions are implied.
import { useId, useState } from 'react';
import FanDrawing from './FanDrawing.jsx';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Timeline (seconds after load): drawing 0.25–1.6 · scan 1.7–3.9 · callout 3.9 · fan spool 4.3–8.3
const SCAN_BEGIN = 1.7;
const SCAN_DUR = 2.8;
const CALLOUT_BEGIN = SCAN_BEGIN + SCAN_DUR;

const windows = Array.from({ length: 30 }, (_, i) => 330 + i * 22).filter((x) => x < 990 && (x < 556 || x > 590));

function Aircraft({ scan = false }) {
  // scan=true renders the same aircraft as a gold 'lit' copy used by the inspection sweep
  const main = scan ? '#F0DCAA' : '#9FB1BD';
  const detail = scan ? '#D6BD87' : '#6E8798';
  const anim = (cls) => (scan ? undefined : cls);
  return (
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      {/* datum line */}
      {!scan && <line x1="0" y1="262" x2="1200" y2="262" stroke="#31566D" strokeWidth="1" strokeDasharray="16 6 3 6" opacity="0.7" />}

      <g className={anim('draw-on')} stroke={main} strokeWidth={scan ? 2.4 : 1.5} style={{ '--len': 2600 }}>
        {/* fuselage */}
        <path
          style={{ '--d': '250ms' }}
          d="M 60 236 L 150 216 L 1000 214 C 1060 214 1105 228 1132 252 C 1142 262 1140 276 1126 284 C 1100 300 1070 306 1030 306 L 360 306 C 300 306 200 290 90 252 Z"
        />
        {/* vertical stabiliser */}
        <path style={{ '--d': '600ms', '--len': 700 }} d="M 252 215 L 130 66 L 80 66 L 104 222" />
        {/* horizontal stabiliser */}
        <path style={{ '--d': '750ms', '--len': 500 }} d="M 210 262 L 84 238 L 66 246 L 178 270 Z" />
        {/* wing (near side, in perspective) */}
        <path style={{ '--d': '700ms', '--len': 900 }} d="M 790 298 L 600 304 L 410 362 L 452 366 L 640 322 L 800 312" />
        {/* engine nacelle + pylon */}
        <path style={{ '--d': '900ms', '--len': 700 }} d="M 598 330 L 728 326 C 748 326 752 382 728 382 L 598 378 C 586 370 586 338 598 330 Z" />
        <path style={{ '--d': '950ms', '--len': 200 }} d="M 640 329 L 670 308 L 712 307 L 704 327" />
      </g>

      <g stroke={detail} strokeWidth={scan ? 1.6 : 1} className={anim('intro-fade')} style={{ '--d': '1300ms' }}>
        {/* inlet + exhaust */}
        <ellipse cx="735" cy="354" rx="8" ry="26" />
        <path d="M 598 336 C 576 340 576 368 598 372" />
        {/* cockpit glazing */}
        <path d="M 1048 232 L 1088 232 L 1106 246 L 1052 246 Z" />
        <line x1="1072" y1="232" x2="1074" y2="246" />
        {/* doors */}
        <rect x="992" y="224" width="20" height="62" rx="3" />
        <rect x="300" y="226" width="18" height="56" rx="3" />
        {/* panel joints */}
        <line x1="520" y1="216" x2="520" y2="304" strokeDasharray="4 5" opacity="0.6" />
        <line x1="800" y1="215" x2="800" y2="305" strokeDasharray="4 5" opacity="0.6" />
        {/* rudder hinge */}
        <line x1="94" y1="72" x2="112" y2="218" strokeDasharray="4 5" opacity="0.6" />
      </g>
      <g fill={detail} className={anim('intro-fade')} style={{ '--d': '1400ms' }}>
        {windows.map((x) => (
          <rect key={x} x={x} y="236" width="9" height="12" rx="4" opacity="0.75" />
        ))}
      </g>

      {/* station ticks along a reference line */}
      {!scan && (
      <g stroke="#31566D" strokeWidth="1" className="intro-fade" style={{ '--d': '1500ms' }}>
        <line x1="60" y1="440" x2="1140" y2="440" />
        {Array.from({ length: 28 }, (_, i) => 60 + i * 40).map((x, i) => (
          <line key={x} x1={x} y1="440" x2={x} y2={i % 5 === 0 ? 452 : 446} />
        ))}
        <line x1="1140" y1="434" x2="1140" y2="452" />
      </g>
      )}
    </g>
  );
}

// One gold beam sweeps tail → nose; parts light up as it passes, then settle back.
function ScanSweep({ uid }) {
  const begin = `${SCAN_BEGIN}s`;
  const dur = `${SCAN_DUR}s`;
  const spline = { calcMode: 'spline', keyTimes: '0;1', keySplines: '0.4 0 0.55 1' };
  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-trail`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient id={`${uid}-glow`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#C8A96B" stopOpacity="0" />
          <stop offset="1" stopColor="#C8A96B" stopOpacity="0.24" />
        </linearGradient>
        <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="520">
          <rect x="-360" y="0" width="360" height="520" fill={`url(#${uid}-trail)`}>
            <animate attributeName="x" from="-360" to="840" begin={begin} dur={dur} fill="freeze" {...spline} />
          </rect>
        </mask>
      </defs>

      {/* lit copy of the aircraft, visible only inside the moving beam */}
      <g mask={`url(#${uid}-mask)`}>
        <Aircraft scan />
      </g>

      {/* the beam itself */}
      <g opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" begin={begin} dur={dur} fill="freeze" />
        <animateTransform attributeName="transform" type="translate" from="0 0" to="1200 0" begin={begin} dur={dur} fill="freeze" {...spline} />
        <rect x="-90" y="40" width="90" height="420" fill={`url(#${uid}-glow)`} />
        <line x1="0" y1="40" x2="0" y2="460" stroke="#D6BD87" strokeWidth="1.4" />
        <path d="M -7 40 H 7 M -7 460 H 7" stroke="#D6BD87" strokeWidth="1.4" />
      </g>
    </g>
  );
}

export default function AircraftElevation({ detail = true, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const [animated] = useState(() => !prefersReducedMotion());

  if (!detail) {
    return (
      <svg viewBox="30 40 1140 430" className={className} role="img" aria-label="Line drawing of a transport aircraft in side elevation">
        <Aircraft />
        {animated && <ScanSweep uid={uid} />}
      </svg>
    );
  }

  const after = (delay) => `${(CALLOUT_BEGIN + delay).toFixed(2)}s`;
  return (
    <svg viewBox="0 0 1200 1060" className={className} role="img" aria-label="Line drawing of a transport aircraft in side elevation, with an enlarged detail of the engine fan">
      <Aircraft />
      {animated && <ScanSweep uid={uid} />}

      {/* callout A on the engine inlet: pulses once when the beam reaches it */}
      <g fill="none" stroke="#C8A96B" strokeWidth="1.2" className="intro-fade" style={{ '--d': '1600ms' }}>
        <circle cx="735" cy="354" r="46" strokeDasharray="3 5" />
        {animated && (
          <circle cx="735" cy="354" r="46" opacity="0" strokeWidth="1.6">
            <animate attributeName="r" from="46" to="104" begin={after(0)} dur="1.1s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0.6 0.3 1" />
            <animate attributeName="opacity" values="0;0.95;0" keyTimes="0;0.15;1" begin={after(0)} dur="1.1s" fill="freeze" />
          </circle>
        )}
      </g>

      {/* leader line + detail view appear after the pulse */}
      <g opacity={animated ? 0 : 1}>
        {animated && <animate attributeName="opacity" from="0" to="1" begin={after(0.2)} dur="0.6s" fill="freeze" />}
        <path d="M 764 390 L 840 560" fill="none" stroke="#C8A96B" strokeWidth="1.2" strokeDasharray="190" strokeDashoffset={animated ? 190 : 0}>
          {animated && <animate attributeName="stroke-dashoffset" from="190" to="0" begin={after(0.2)} dur="0.7s" fill="freeze" />}
        </path>
        <circle cx="880" cy="805" r="232" fill="none" stroke="#C8A96B" strokeWidth="1.2" opacity="0.9" />
        <svg x="660" y="585" width="440" height="440" viewBox="0 0 1000 1000" overflow="hidden">
          <defs>
            <clipPath id={`${uid}-detail`}>
              <circle cx="500" cy="500" r="490" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-detail)`}>
            <g>
              {/* fan spools up, then coasts to a stop */}
              {animated && (
                <animateTransform attributeName="transform" type="rotate" from="0 500 500" to="540 500 500"
                  begin={after(0.6)} dur="4.2s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.55 0 0.15 1" />
              )}
              <FanDrawing bare />
            </g>
          </g>
        </svg>
        <g fontFamily="IBM Plex Mono, monospace" letterSpacing="2.5">
          <text x="560" y="1000" fill="#C8A96B" fontSize="18">DETAIL A</text>
          <text x="560" y="1026" fill="#6E8798" fontSize="15">FAN STAGE</text>
        </g>
      </g>
      <text x="790" y="340" fill="#C8A96B" fontSize="20" fontFamily="IBM Plex Mono, monospace" className="intro-fade" style={{ '--d': '1700ms' }}>A</text>
    </svg>
  );
}

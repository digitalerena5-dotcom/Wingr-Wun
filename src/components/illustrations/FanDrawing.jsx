// Front elevation of a turbofan fan stage, drawn as an engineering figure.
// Purely illustrative — no real dimensions, part numbers or platform implied.
const CX = 500;
const CY = 500;
const BLADES = 26;

function bladePath(i) {
  const a = (i / BLADES) * Math.PI * 2;
  const rHub = 96;
  const rTip = 352;
  const sweep = 0.42;
  const chord = 0.13;
  const p = (r, t) => [CX + r * Math.cos(t), CY + r * Math.sin(t)];
  const [x1, y1] = p(rHub, a);
  const [cx1, cy1] = p((rHub + rTip) / 2, a + sweep * 0.25);
  const [x2, y2] = p(rTip, a + sweep);
  const [x3, y3] = p(rTip, a + sweep + chord);
  const [cx2, cy2] = p((rHub + rTip) / 2, a + sweep * 0.25 + chord * 1.6);
  const [x4, y4] = p(rHub, a + chord * 1.7);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx1.toFixed(1)} ${cy1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} Q${cx2.toFixed(1)} ${cy2.toFixed(1)} ${x4.toFixed(1)} ${y4.toFixed(1)}`;
}

const ticks = Array.from({ length: 72 }, (_, i) => {
  const a = (i / 72) * Math.PI * 2;
  const r1 = 432;
  const r2 = i % 6 === 0 ? 448 : 440;
  return [CX + r1 * Math.cos(a), CY + r1 * Math.sin(a), CX + r2 * Math.cos(a), CY + r2 * Math.sin(a)];
});

export default function FanDrawing({ className = '', bare = false }) {
  const body = (
    <>
      <g fill="none" strokeLinecap="round">
        {/* centre lines */}
        <g stroke="#31566D" strokeWidth="1" strokeDasharray="14 6 3 6" opacity="0.7">
          <line x1="20" y1={CY} x2="980" y2={CY} />
          <line x1={CX} y1="20" x2={CX} y2="980" />
        </g>
        {/* outer nacelle + case */}
        <g className="draw-on" stroke="#6E8798" style={{ '--len': 3000 }}>
          <circle cx={CX} cy={CY} r="470" strokeWidth="1" opacity="0.5" style={{ '--d': '200ms' }} />
          <circle cx={CX} cy={CY} r="420" strokeWidth="1.4" style={{ '--d': '350ms' }} />
          <circle cx={CX} cy={CY} r="364" strokeWidth="1" opacity="0.8" style={{ '--d': '500ms' }} />
        </g>
        {/* graduation ring */}
        <g stroke="#6E8798" strokeWidth="1" opacity="0.55" className="intro-fade" style={{ '--d': '900ms' }}>
          {ticks.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        {/* blades */}
        <g stroke="#9FB1BD" strokeWidth="1.1" className="intro-fade" style={{ '--d': '700ms' }}>
          {Array.from({ length: BLADES }, (_, i) => (
            <path key={i} d={bladePath(i)} opacity="0.85" />
          ))}
        </g>
        {/* hub + spinner */}
        <g className="draw-on" stroke="#D6BD87" style={{ '--len': 1200 }}>
          <circle cx={CX} cy={CY} r="96" strokeWidth="1.2" style={{ '--d': '600ms' }} />
          <circle cx={CX} cy={CY} r="58" strokeWidth="1" opacity="0.7" style={{ '--d': '750ms' }} />
          <circle cx={CX} cy={CY} r="6" strokeWidth="1" style={{ '--d': '900ms' }} />
        </g>
        {!bare && (
        <>
        {/* section cut indicator */}
        <g stroke="#C8A96B" strokeWidth="1.2" className="intro-fade" style={{ '--d': '1300ms' }}>
          <path d="M 64 150 L 64 120 L 104 120" />
          <path d="M 936 850 L 936 880 L 896 880" />
          <line x1="64" y1="150" x2="936" y2="850" strokeDasharray="2 10" opacity="0.6" />
        </g>
        </>
        )}
      </g>
      {!bare && (
      <g className="intro-fade" style={{ '--d': '1400ms' }} fill="#6E8798" fontFamily="IBM Plex Mono, monospace" fontSize="15" letterSpacing="2">
        <text x="112" y="125">A</text>
        <text x="878" y="885">A</text>
      </g>
      )}
    </>
  );
  if (bare) return <g>{body}</g>;
  return (
    <svg viewBox="0 0 1000 1000" className={className} aria-hidden="true" focusable="false">
      {body}
    </svg>
  );
}

// Exploded assembly view along a common axis, styled as a technical drawing.
// Item balloons are generic (1–5) and do not reference real part numbers.
import { useScrollReveal } from '../../hooks/useScrollReveal.jsx';

const parts = [
  { x: 150, rx: 26, ry: 150, teeth: false, inner: 60 },
  { x: 270, rx: 34, ry: 196, teeth: true, inner: 92 },
  { x: 390, rx: 22, ry: 130, teeth: false, inner: 74 },
  { x: 490, rx: 30, ry: 172, teeth: false, inner: 40, bolts: true },
  { x: 600, rx: 16, ry: 92, teeth: false, inner: 34 },
];

function Teeth({ x, rx, ry }) {
  const n = 40;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const t = (i / n) * Math.PI * 2;
        const x1 = x + rx * Math.cos(t);
        const y1 = 400 + ry * Math.sin(t);
        const x2 = x + (rx + 5) * Math.cos(t);
        const y2 = 400 + (ry + 14) * Math.sin(t);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </g>
  );
}

function Bolts({ x, rx, ry }) {
  return Array.from({ length: 8 }, (_, i) => {
    const t = (i / 8) * Math.PI * 2;
    return <ellipse key={i} cx={x + rx * 0.62 * Math.cos(t)} cy={400 + ry * 0.62 * Math.sin(t)} rx="3" ry="9" />;
  });
}

export default function ExplodedDrawing() {
  const ref = useScrollReveal({ threshold: 0.25 });
  return (
    <div ref={ref} className="h-full w-full">
      <svg viewBox="0 0 760 800" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="exp-title">
        <title id="exp-title">Exploded technical drawing of a mechanical component assembly</title>
        {/* axis */}
        <line x1="40" y1="400" x2="720" y2="400" stroke="#31566D" strokeDasharray="16 6 3 6" />
        <g fill="none" className="trace">
          {parts.map((p, i) => (
            <g key={i} stroke="#9FB1BD" strokeWidth="1.2">
              <ellipse cx={p.x} cy="400" rx={p.rx} ry={p.ry} style={{ '--len': 1400, '--d': `${i * 140}ms` }} />
              <ellipse cx={p.x + 10} cy="400" rx={p.rx} ry={p.ry} opacity="0.4" style={{ '--len': 1400, '--d': `${i * 140 + 80}ms` }} />
              <ellipse cx={p.x} cy="400" rx={p.rx * (p.inner / p.ry)} ry={p.inner} opacity="0.7" style={{ '--len': 700, '--d': `${i * 140 + 160}ms` }} />
            </g>
          ))}
        </g>
        <g fill="none" stroke="#6E8798" strokeWidth="1" opacity="0.8">
          <Teeth x={270} rx={34} ry={196} />
        </g>
        <g fill="none" stroke="#D6BD87" strokeWidth="1">
          <Bolts x={490} rx={30} ry={172} />
        </g>
        {/* leader lines + balloons */}
        <g stroke="#C8A96B" strokeWidth="1" fill="none">
          {parts.map((p, i) => {
            const top = i % 2 === 0;
            const y0 = top ? 400 - p.ry : 400 + p.ry;
            const y1 = top ? 120 - (i % 3) * 18 : 690 + (i % 3) * 14;
            return (
              <g key={i}>
                <line x1={p.x} y1={y0} x2={p.x} y2={y1 + (top ? 14 : -14)} />
                <circle cx={p.x} cy={y1} r="14" />
                <circle cx={p.x} cy={y0} r="2.5" fill="#C8A96B" />
              </g>
            );
          })}
        </g>
        <g fontFamily="IBM Plex Mono, monospace" fontSize="13" fill="#C8A96B" textAnchor="middle">
          {parts.map((p, i) => {
            const top = i % 2 === 0;
            const y1 = top ? 120 - (i % 3) * 18 : 690 + (i % 3) * 14;
            return (
              <text key={i} x={p.x} y={y1 + 4.5}>
                {i + 1}
              </text>
            );
          })}
        </g>
        {/* technical label — clean without highlight box */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#6E8798" opacity="0.65">
          <text x="532" y="755">EXPLODED VIEW // SCHEMATIC</text>
        </g>
      </svg>
    </div>
  );
}

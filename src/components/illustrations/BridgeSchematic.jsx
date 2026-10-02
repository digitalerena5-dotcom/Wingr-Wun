// Abstract "bridge" schematic: requirement side ↔ consultancy ↔ supply side.
// No geography, locations or named organisations are implied.
import { useScrollReveal } from '../../hooks/useScrollReveal.jsx';

const left = [160, 230, 300];
const right = [150, 210, 270, 330];

export default function BridgeSchematic() {
  const ref = useScrollReveal({ threshold: 0.3 });
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 1200 460" className="block h-auto w-full" role="img" aria-labelledby="bridge-title bridge-desc">
        <title id="bridge-title">Procurement bridge schematic</title>
        <desc id="bridge-desc">
          A schematic showing operational requirements on one side connected through Wingr Wun to aerospace supply on the other.
        </desc>
        <g fill="none" className="trace">
          {/* requirement-side links */}
          {left.map((y, i) => (
            <path key={`l${i}`} d={`M 214 ${y} C 360 ${y}, 420 230, 540 230`} stroke="#31566D" strokeWidth="1.2" style={{ '--len': 420, '--d': `${i * 120}ms` }} />
          ))}
          {/* supply-side links */}
          {right.map((y, i) => (
            <path key={`r${i}`} d={`M 660 230 C 780 230, 840 ${y}, 986 ${y}`} stroke="#31566D" strokeWidth="1.2" style={{ '--len': 420, '--d': `${400 + i * 120}ms` }} />
          ))}
          <rect x="540" y="170" width="120" height="120" stroke="#C8A96B" strokeWidth="1.2" style={{ '--len': 480, '--d': '300ms' }} />
          <rect x="556" y="186" width="88" height="88" stroke="#C8A96B" strokeWidth="0.8" opacity="0.5" style={{ '--len': 360, '--d': '500ms' }} />
        </g>
        {/* nodes */}
        <g>
          {left.map((y, i) => (
            <rect key={`ln${i}`} x="204" y={y - 5} width="10" height="10" fill="#0B1D2A" stroke="#9FB1BD" strokeWidth="1" />
          ))}
          {right.map((y, i) => (
            <rect key={`rn${i}`} x="986" y={y - 5} width="10" height="10" fill="#0B1D2A" stroke="#9FB1BD" strokeWidth="1" />
          ))}
          <rect x="595" y="225" width="10" height="10" fill="#C8A96B" />
        </g>
        {/* labels */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="2.2" fill="#9FB1BD">
          <text x="40" y="60">REQUIREMENT</text>
          <text x="40" y="82" fill="#6E8798" fontSize="12">OPERATIONAL NEED</text>
          <text x="1160" y="60" textAnchor="end">AEROSPACE SUPPLY</text>
          <text x="1160" y="82" textAnchor="end" fill="#6E8798" fontSize="12">OEMS · DISTRIBUTORS</text>
          <text x="600" y="330" textAnchor="middle" fill="#C8A96B">WINGR WUN</text>
          <text x="600" y="352" textAnchor="middle" fill="#6E8798" fontSize="12">ADVISORY · VETTING · INTELLIGENCE</text>
        </g>
        <g stroke="#31566D" strokeWidth="1">
          <line x1="40" y1="100" x2="214" y2="100" />
          <line x1="986" y1="100" x2="1160" y2="100" />
        </g>
        {['Components', 'Subsystems', 'Legacy technology'].map((t, i) => (
          <text key={t} x="190" y={left[i] + 4} textAnchor="end" fontFamily="Inter, sans-serif" fontSize="15" fill="#E9EEF1">
            {t}
          </text>
        ))}
        {['Vetted OEMs', 'Certified distributors', 'Market intelligence', 'Compliant transit'].map((t, i) => (
          <text key={t} x="1012" y={right[i] + 5} fontFamily="Inter, sans-serif" fontSize="15" fill="#E9EEF1">
            {t}
          </text>
        ))}
      </svg>
    </div>
  );
}

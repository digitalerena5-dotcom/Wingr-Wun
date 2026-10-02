// Oversized shield outline with blueprint construction lines and route overlays.
export default function ShieldDrawing({ className = '' }) {
  const shield = 'M 400 60 L 690 150 L 690 400 C 690 580 560 700 400 760 C 240 700 110 580 110 400 L 110 150 Z';
  const inner = 'M 400 110 L 640 186 L 640 400 C 640 552 534 652 400 706 C 266 652 160 552 160 400 L 160 186 Z';
  return (
    <svg viewBox="0 0 800 820" className={className} aria-hidden="true" focusable="false">
      <g fill="none" className="trace">
        <path d={shield} stroke="#31566D" strokeWidth="1.4" style={{ '--len': 2400 }} />
        <path d={inner} stroke="#31566D" strokeWidth="1" opacity="0.6" style={{ '--len': 2200, '--d': '200ms' }} />
        {/* construction lines */}
        <line x1="400" y1="20" x2="400" y2="800" stroke="#31566D" strokeDasharray="12 6 3 6" style={{ '--len': 800 }} />
        <line x1="60" y1="400" x2="740" y2="400" stroke="#31566D" strokeDasharray="12 6 3 6" style={{ '--len': 700 }} />
        <circle cx="400" cy="400" r="150" stroke="#31566D" opacity="0.7" style={{ '--len': 960, '--d': '300ms' }} />
        {/* routed path through the shield */}
        <polyline
          points="110,560 180,560 260,480 400,480 470,410 620,410 690,340 760,340"
          stroke="#C8A96B"
          strokeWidth="1.2"
          style={{ '--len': 1000, '--d': '700ms' }}
        />
      </g>
      <g fill="#C8A96B">
        {[[180, 560], [400, 480], [620, 410]].map(([x, y]) => (
          <rect key={x} x={x - 4} y={y - 4} width="8" height="8" />
        ))}
      </g>
      {/* document glyphs */}
      <g fill="none" stroke="#6E8798" strokeWidth="1" opacity="0.8">
        {[[232, 250], [520, 250]].map(([x, y]) => (
          <g key={x}>
            <path d={`M ${x} ${y} h 34 l 14 14 v 46 h -48 Z`} />
            <path d={`M ${x + 34} ${y} v 14 h 14`} />
            <line x1={x + 8} y1={y + 26} x2={x + 38} y2={y + 26} />
            <line x1={x + 8} y1={y + 36} x2={x + 38} y2={y + 36} />
            <line x1={x + 8} y1={y + 46} x2={x + 28} y2={y + 46} />
          </g>
        ))}
      </g>
    </svg>
  );
}

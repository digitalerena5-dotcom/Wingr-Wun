import { useState, useEffect, useRef } from 'react';

// 6-Waypoint Global Procurement & Sourcing Flight Trajectory
// Seamless continuous multi-leg circuit covering all 6 strategic corridors
const PATH_D =
  'M 100 420 ' +
  'C 140 340, 180 270, 250 250 ' + // Leg 1: Path 01 -> Path 02
  'C 320 230, 360 110, 440 100 ' + // Leg 2: Path 02 -> Path 03
  'C 510 90, 520 260, 580 280 ' +  // Leg 3: Path 03 -> Path 04
  'C 630 300, 680 150, 750 120 ' + // Leg 4: Path 04 -> Path 05
  'C 810 100, 830 340, 850 420 ' + // Leg 5: Path 05 -> Path 06
  'C 800 500, 450 510, 100 420';   // Leg 6: Path 06 -> Path 01 (Seamless Return Loop)

const WAYPOINTS = [
  {
    id: '01',
    code: 'PATH 01',
    title: 'WESTERN OEM HUB',
    subtitle: 'SOURCE PEDIGREE',
    x: 100,
    y: 420,
    labelPos: { x: 100, y: 462, textAnchor: 'middle' },
    tStart: 0.0,
    tEnd: 0.16,
  },
  {
    id: '02',
    code: 'PATH 02',
    title: 'STOCKIST DEPOT',
    subtitle: 'ROTABLE CONSIGNMENT',
    x: 250,
    y: 250,
    labelPos: { x: 250, y: 215, textAnchor: 'middle' },
    tStart: 0.16,
    tEnd: 0.33,
  },
  {
    id: '03',
    code: 'PATH 03',
    title: 'EXPORT PRE-CLEARANCE',
    subtitle: 'ITAR & EAR ADVISORY',
    x: 440,
    y: 100,
    labelPos: { x: 440, y: 65, textAnchor: 'middle' },
    tStart: 0.33,
    tEnd: 0.50,
  },
  {
    id: '04',
    code: 'PATH 04',
    title: 'BONDED TRANSIT',
    subtitle: 'AIR FREIGHT CORRIDOR',
    x: 580,
    y: 280,
    labelPos: { x: 580, y: 325, textAnchor: 'middle' },
    tStart: 0.50,
    tEnd: 0.67,
  },
  {
    id: '05',
    code: 'PATH 05',
    title: 'AIRWORTHINESS AUDIT',
    subtitle: 'DUAL RELEASE 8130-3',
    x: 750,
    y: 120,
    labelPos: { x: 750, y: 85, textAnchor: 'middle' },
    tStart: 0.67,
    tEnd: 0.83,
  },
  {
    id: '06',
    code: 'PATH 06',
    title: 'FLEET INTEGRATION',
    subtitle: 'DEFENCE FLIGHT LINE',
    x: 850,
    y: 420,
    labelPos: { x: 850, y: 462, textAnchor: 'middle' },
    tStart: 0.83,
    tEnd: 1.0,
  },
];

export default function HeroAircraftVisual({ mousePos = { x: 0, y: 0 } }) {
  const pathRef = useRef(null);
  const aircraftRef = useRef(null);
  const trailLeftRef = useRef(null);
  const trailRightRef = useRef(null);
  const [activeWpIndex, setActiveWpIndex] = useState(0);
  const [telemetry, setTelemetry] = useState({
    progress: 0,
    speed: 'MACH 0.84',
    altitude: 'FL380',
    heading: '068°',
    stage: 'TRANSIT // PATH 01 → PATH 02',
  });

  useEffect(() => {
    let animId;
    let startTime = null;
    let lastT = 0;
    const duration = 18000; // 18 seconds for the full 6-path global circuit
    const trailPoints = [];
    const maxTrail = 26;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const t = (elapsed % duration) / duration; // 0 to 1

      // Reset trail points on loop wrap to prevent diagonal screen streaks
      if (t < lastT) {
        trailPoints.length = 0;
      }
      lastT = t;

      if (pathRef.current && aircraftRef.current) {
        const totalLen = pathRef.current.getTotalLength();
        const curDist = t * totalLen;
        const pt = pathRef.current.getPointAtLength(curDist);
        const ptAhead = pathRef.current.getPointAtLength((curDist + 4) % totalLen);
        const angle = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI);

        // Position the aircraft with dynamic angle and generous scale
        aircraftRef.current.setAttribute(
          'transform',
          `translate(${pt.x}, ${pt.y}) rotate(${angle}) scale(0.74)`
        );

        // Record contrail trail history from twin engine nozzles
        const rad = (angle * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        // Offset for twin engine exhausts
        const ex1X = pt.x - cos * 30 + sin * 15;
        const ex1Y = pt.y - sin * 30 - cos * 15;
        const ex2X = pt.x - cos * 30 - sin * 15;
        const ex2Y = pt.y - sin * 30 + cos * 15;

        trailPoints.unshift({ p1: { x: ex1X, y: ex1Y }, p2: { x: ex2X, y: ex2Y } });
        if (trailPoints.length > maxTrail) trailPoints.pop();

        // Build contrail path strings
        if (trailPoints.length > 2) {
          let d1 = `M ${trailPoints[0].p1.x.toFixed(1)} ${trailPoints[0].p1.y.toFixed(1)}`;
          let d2 = `M ${trailPoints[0].p2.x.toFixed(1)} ${trailPoints[0].p2.y.toFixed(1)}`;
          for (let i = 1; i < trailPoints.length; i++) {
            d1 += ` L ${trailPoints[i].p1.x.toFixed(1)} ${trailPoints[i].p1.y.toFixed(1)}`;
            d2 += ` L ${trailPoints[i].p2.x.toFixed(1)} ${trailPoints[i].p2.y.toFixed(1)}`;
          }
          if (trailLeftRef.current) trailLeftRef.current.setAttribute('d', d1);
          if (trailRightRef.current) trailRightRef.current.setAttribute('d', d2);
        } else {
          if (trailLeftRef.current) trailLeftRef.current.setAttribute('d', '');
          if (trailRightRef.current) trailRightRef.current.setAttribute('d', '');
        }

        // Determine active waypoint and update telemetry
        const wpIdx = WAYPOINTS.findIndex((wp) => t >= wp.tStart && t < wp.tEnd);
        const activeIdx = wpIdx >= 0 ? wpIdx : 0;
        setActiveWpIndex(activeIdx);

        // Throttle React state telemetry updates
        if (Math.floor(elapsed / 160) % 2 === 0) {
          const pct = Math.round(t * 100);
          const headingVal = Math.round((angle + 360) % 360);
          const currentWp = WAYPOINTS[activeIdx];
          const nextWp = WAYPOINTS[(activeIdx + 1) % WAYPOINTS.length];

          setTelemetry({
            progress: pct,
            speed: `MACH ${(0.82 + Math.sin(t * Math.PI * 4) * 0.05).toFixed(2)}`,
            altitude: `FL${Math.round(350 + Math.sin(t * Math.PI * 2) * 40)}`,
            heading: `${headingVal.toString().padStart(3, '0')}°`,
            stage: `${currentWp.code} → ${nextWp.code} // ${currentWp.title}`,
          });
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[720px] select-none">
      {/* Outer Tactical Radar Perimeter Box with Parallax */}
      <div
        className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-3xl border border-steel-grey/15 bg-gradient-to-b from-navy-900/60 to-navy-950/80 backdrop-blur-sm shadow-2xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -6}px)`,
        }}
        aria-hidden="true"
      />

      {/* Main High-Tech Aerospace Vector Stage */}
      <div className="relative p-2 sm:p-4">
        <svg
          viewBox="0 0 940 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_15px_45px_rgba(7,25,37,0.95)]"
          aria-label="Dynamic aerospace transport traversing continuous 6-path global sourcing network"
          role="img"
        >
          <defs>
            {/* Metallic Titanium Fuselage Gradients */}
            <linearGradient id="fuselageMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#E2E8F0" />
              <stop offset="55%" stopColor="#64748B" />
              <stop offset="85%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>

            <linearGradient id="wingSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="45%" stopColor="#94A3B8" />
              <stop offset="90%" stopColor="#1E293B" />
            </linearGradient>

            <linearGradient id="canopyGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#C99B47" />
              <stop offset="100%" stopColor="#785317" />
            </linearGradient>

            {/* Glowing Ion Jet Engine Thrust */}
            <linearGradient id="thrustFlame" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.95)" />
              <stop offset="40%" stopColor="rgba(201, 155, 71, 0.9)" />
              <stop offset="100%" stopColor="rgba(201, 155, 71, 0)" />
            </linearGradient>

            {/* Trailing Vapor Contrail Gradient */}
            <linearGradient id="contrailVapour" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
              <stop offset="45%" stopColor="rgba(56, 189, 248, 0.4)" />
              <stop offset="100%" stopColor="rgba(201, 155, 71, 0)" />
            </linearGradient>

            {/* Multi-Leg Flight Trajectory Gradient */}
            <linearGradient id="multiCorridorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C99B47" />
              <stop offset="25%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#C99B47" />
              <stop offset="75%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#C99B47" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coordinate Technical Grid Lines */}
          <g stroke="rgba(110,135,152,0.12)" strokeWidth="0.8" strokeDasharray="4 8">
            <line x1="50" y1="120" x2="890" y2="120" />
            <line x1="50" y1="270" x2="890" y2="270" />
            <line x1="50" y1="420" x2="890" y2="420" />
            <line x1="180" y1="40" x2="180" y2="500" />
            <line x1="470" y1="40" x2="470" y2="500" />
            <line x1="760" y1="40" x2="760" y2="500" />
          </g>

          {/* Secondary Cross-Corridor Interconnected Airspace Grid Lines */}
          <g stroke="rgba(56,189,248,0.15)" strokeWidth="1" strokeDasharray="2 6">
            <line x1="100" y1="420" x2="440" y2="100" />
            <line x1="250" y1="250" x2="580" y2="280" />
            <line x1="440" y1="100" x2="750" y2="120" />
            <line x1="580" y1="280" x2="850" y2="420" />
          </g>

          {/* Hidden Master Path Reference for Mathematical Tracking */}
          <path ref={pathRef} d={PATH_D} fill="none" stroke="transparent" />

          {/* Rendered Visible Flight Trajectory Route */}
          {/* Base Corridor Path */}
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(110,135,152,0.25)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glowing Active Trajectory Line */}
          <path
            d={PATH_D}
            fill="none"
            stroke="url(#multiCorridorGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            className="animate-flow"
            filter="url(#glowEffect)"
          />

          {/* Dynamic Contrail Streams (trailing behind twin engine nozzles) */}
          <path
            ref={trailLeftRef}
            fill="none"
            stroke="url(#contrailVapour)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            ref={trailRightRef}
            fill="none"
            stroke="url(#contrailVapour)"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* 6 STRATEGIC WAYPOINTS (PATH 01 TO PATH 06) */}
          {WAYPOINTS.map((wp, idx) => {
            const isActive = activeWpIndex === idx;
            return (
              <g key={wp.id} className="transition-all duration-300">
                {/* Outer Radar Range Ring */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isActive ? 32 : 22}
                  stroke={isActive ? '#C99B47' : '#38BDF8'}
                  strokeWidth={isActive ? 1.4 : 0.8}
                  strokeDasharray="3 4"
                  opacity={isActive ? 0.8 : 0.35}
                  className={isActive ? 'animate-spin' : ''}
                  style={{ animationDuration: '8s' }}
                />
                {/* Secondary Ripple Ring */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isActive ? 18 : 12}
                  stroke={isActive ? '#FFE082' : '#64748B'}
                  strokeWidth="1"
                  opacity={isActive ? 0.9 : 0.4}
                />
                {/* Central Beacon Node */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isActive ? 5.5 : 4}
                  fill={isActive ? '#C99B47' : '#38BDF8'}
                  className={isActive ? 'animate-pulse' : ''}
                />

                {/* Waypoint Text Badges */}
                <text
                  x={wp.labelPos.x}
                  y={wp.labelPos.y}
                  textAnchor={wp.labelPos.textAnchor}
                  fill={isActive ? '#FFE082' : '#C99B47'}
                  fontSize="11.5"
                  fontFamily="'IBM Plex Mono', monospace"
                  fontWeight="600"
                  letterSpacing="1"
                >
                  [ {wp.code} ]
                </text>
                <text
                  x={wp.labelPos.x}
                  y={wp.labelPos.y + 14}
                  textAnchor={wp.labelPos.textAnchor}
                  fill={isActive ? '#FFFFFF' : '#9FB1BD'}
                  fontSize="9.5"
                  fontFamily="'Inter', sans-serif"
                  fontWeight={isActive ? '600' : '400'}
                  letterSpacing="0.5"
                >
                  {wp.title}
                </text>
              </g>
            );
          })}

          {/* ======================================================== */}
          {/* DYNAMIC AIRCRAFT (Navigates continuously through all 6 paths) */}
          {/* ======================================================== */}
          <g ref={aircraftRef} className="cursor-pointer transition-transform ease-out">
            {/* Glowing Engine Thrust Exhaust Flames */}
            <polygon points="-30,-14 -75,-16 -75,-12" fill="url(#thrustFlame)" opacity="0.9" />
            <polygon points="-30,-14 -50,-15 -50,-13" fill="#FFFFFF" opacity="0.95" />
            <polygon points="-30,14 -75,12 -75,16" fill="url(#thrustFlame)" opacity="0.9" />
            <polygon points="-30,14 -50,13 -50,15" fill="#FFFFFF" opacity="0.95" />

            {/* Aircraft Shadow / Under-glow */}
            <ellipse cx="-5" cy="0" rx="65" ry="24" fill="rgba(7,25,37,0.8)" filter="url(#glowEffect)" />

            {/* Main Swept Wings (Advanced Anhedral Composite) */}
            {/* Port Wing */}
            <polygon points="10,-6 -25,-85 -42,-84 -15,-6" fill="url(#wingSpecular)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Port Winglet */}
            <polygon points="-25,-85 -20,-96 -34,-87" fill="#C99B47" stroke="#FFE082" strokeWidth="0.8" />
            {/* Port Red Navigation Light */}
            <circle cx="-25" cy="-86" r="3" fill="#EF4444" className="animate-ping" />

            {/* Starboard Wing */}
            <polygon points="10,6 -25,85 -42,84 -15,6" fill="url(#wingSpecular)" stroke="#CBD5E1" strokeWidth="1.2" />
            {/* Starboard Winglet */}
            <polygon points="-25,85 -20,96 -34,87" fill="#C99B47" stroke="#FFE082" strokeWidth="0.8" />
            {/* Starboard Green Navigation Light */}
            <circle cx="-25" cy="86" r="3" fill="#22C55E" className="animate-ping" />

            {/* Twin High-Bypass Turbofan Engine Pods */}
            <g transform="translate(-18, -14)">
              <rect x="-14" y="-7" width="28" height="14" rx="7" fill="url(#fuselageMetallic)" stroke="#94A3B8" strokeWidth="1" />
              <ellipse cx="14" cy="0" rx="3.5" ry="6.5" fill="#071925" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx="14" cy="0" r="2" fill="#C99B47" />
              <ellipse cx="-14" cy="0" rx="2" ry="5.5" fill="#38BDF8" opacity="0.8" />
            </g>

            <g transform="translate(-18, 14)">
              <rect x="-14" y="-7" width="28" height="14" rx="7" fill="url(#fuselageMetallic)" stroke="#94A3B8" strokeWidth="1" />
              <ellipse cx="14" cy="0" rx="3.5" ry="6.5" fill="#071925" stroke="#CBD5E1" strokeWidth="1" />
              <circle cx="14" cy="0" r="2" fill="#C99B47" />
              <ellipse cx="-14" cy="0" rx="2" ry="5.5" fill="#38BDF8" opacity="0.8" />
            </g>

            {/* Tailplane / Horizontal Stabilizers */}
            <polygon points="-65,-4 -85,-38 -95,-37 -75,-3" fill="#475569" stroke="#64748B" strokeWidth="1" />
            <polygon points="-65,4 -85,38 -95,37 -75,3" fill="#475569" stroke="#64748B" strokeWidth="1" />

            {/* Vertical Stabilizer / Rudder */}
            <polygon points="-55,-1 -85,-1 -92,-28 -72,-24" fill="url(#fuselageMetallic)" stroke="#94A3B8" strokeWidth="1" />
            <path d="M -77,-14 L -81,-6 L -75,-10 L -72,-6 L -76,-14" stroke="#C99B47" strokeWidth="1.5" fill="none" />
            <circle cx="-88" cy="-22" r="2.5" fill="#FFFFFF" className="animate-pulse" />

            {/* Main Aerodynamic Fuselage */}
            <path
              d="M 68 0
                 C 55 -6, 20 -10, -50 -9
                 C -75 -8, -90 -4, -94 0
                 C -90 4, -75 8, -50 9
                 C 20 10, 55 6, 68 0
                 Z"
              fill="url(#fuselageMetallic)"
              stroke="#F1F5F9"
              strokeWidth="1.4"
            />

            {/* Cockpit Canopy Glass with Specular Gold Tint */}
            <path
              d="M 46 -3
                 C 58 -2, 64 0, 58 2
                 C 48 3, 38 3, 34 0
                 C 38 -3, 44 -3, 46 -3
                 Z"
              fill="url(#canopyGold)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />

            <line x1="-60" y1="0" x2="32" y2="0" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 4" opacity="0.75" />
            <line x1="68" y1="0" x2="78" y2="0" stroke="#C99B47" strokeWidth="1.5" />
          </g>
        </svg>

        {/* 6-STAGE SOURCING PIPELINE STEPPER BAR */}
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-1.5 mono text-[0.62rem] sm:text-[0.66rem]">
          {WAYPOINTS.map((wp, idx) => {
            const isActive = activeWpIndex === idx;
            return (
              <div
                key={wp.id}
                className={`rounded border px-2 py-1.5 text-center transition-all duration-300 ${
                  isActive
                    ? 'border-gold bg-navy-900 text-white shadow-[0_0_12px_rgba(201,155,71,0.25)] font-semibold'
                    : 'border-[color:var(--line-dark)] bg-navy-950/70 text-steel-grey'
                }`}
              >
                <span className={`block text-[0.58rem] ${isActive ? 'text-gold' : 'text-steel-grey'}`}>
                  {wp.code}
                </span>
                <span className="truncate block mt-0.5">{wp.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Live Aerospace HUD Telemetry Dashboard */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[color:var(--line-dark)] bg-navy-950/90 p-3 sm:p-4 backdrop-blur-md mono text-[0.7rem] sm:text-[0.75rem] text-steel-grey">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <div>
              <span className="text-white font-medium block">
                {telemetry.stage}
              </span>
              <span className="text-gold text-[0.68rem]">
                GLOBAL CORRIDOR TRANSIT: {telemetry.progress}% COMPLETE // ACTIVE LEG: {WAYPOINTS[activeWpIndex].code}
              </span>
            </div>
          </div>

          {/* Transit Coordinates & Flight Telemetry */}
          <div className="flex items-center gap-4 text-[0.68rem] sm:text-[0.72rem]">
            <div className="hidden sm:block">
              <span className="text-steel-grey block">VELOCITY</span>
              <span className="text-white font-semibold">{telemetry.speed}</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-steel-grey block">ALTITUDE</span>
              <span className="text-white font-semibold">{telemetry.altitude}</span>
            </div>
            <div>
              <span className="text-steel-grey block">BEARING</span>
              <span className="text-gold font-semibold">{telemetry.heading}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry Corridor Progress Bar */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-navy-900 border border-[color:var(--line-dark)]">
          <div
            className="h-full bg-gradient-to-r from-gold via-sky-400 to-gold transition-all duration-200"
            style={{ width: `${telemetry.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

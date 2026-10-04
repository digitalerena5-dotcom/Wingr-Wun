/**
 * Supported Aviation Platforms and Categories
 * Sourcing capabilities across commercial, regional, cargo, and legacy aircraft.
 */
export const platformCategories = [
  {
    id: 'commercial',
    label: 'Commercial Transport',
    aircraft: 'Airbus A320/A330 · Boeing 737/777/787',
    description: 'High-cycle airframe rotables, CFM56 / LEAP / GE90 engine hardware, avionics line-replaceable units (LRUs), and landing gear overhauls.',
    components: [
      { name: 'Flight Management Computers', spec: 'Honeywell / Collins LRUs with certified trace' },
      { name: 'Turbofan Nacelles & Cowlings', spec: 'Direct OEM & Tier-1 accredited inventory' },
      { name: 'Main Landing Gear Actuators', spec: 'Dual-release FAA 8130-3 / EASA Form 1' },
      { name: 'Hydraulic Power Transfer Units', spec: 'Bench-tested with full release pedigree' },
    ],
  },
  {
    id: 'regional',
    label: 'Regional & Commuter',
    aircraft: 'ATR 42/72 · Embraer E-Jets · De Havilland Dash-8',
    description: 'Specialised rotable inventories, PW100 / CF34 engine accessories, propellers, environmental control systems, and structural spares.',
    components: [
      { name: 'Propeller Electronic Controls (PEC)', spec: 'Overhauled with factory warranty' },
      { name: 'Auxiliary Power Units (APUs)', spec: 'Honeywell GTCP series with logbook trace' },
      { name: 'Brake Assemblies & Carbon Discs', spec: 'PMA & OEM certified zero-time stock' },
      { name: 'Flap & Slat Drive Actuation', spec: 'Rigid mechanical inspection standards' },
    ],
  },
  {
    id: 'cargo',
    label: 'Freighters & Cargo Transports',
    aircraft: 'Boeing 747-400F/8F · 767-300F · 777F',
    description: 'Heavy payload cargo loading system components, high-stress landing gear, long-range fuel pumps, and structural floor beam spares.',
    components: [
      { name: 'Cargo Door Actuation Mechanisms', spec: 'High-cycle reinforced spares' },
      { name: 'Main Deck Power Drive Units (PDUs)', spec: 'Tested under simulated freight loads' },
      { name: 'High-Pressure Bleed Valves', spec: 'Certified for high-altitude endurance' },
      { name: 'Flight Deck Primary Displays', spec: 'LCD retrofits and CRT legacy units' },
    ],
  },
  {
    id: 'legacy',
    label: 'Legacy & Mission Aircraft',
    aircraft: 'C-130 Hercules · F-16 Falcon · P-3 Orion · Bell 212/412',
    description: 'Out-of-production structural parts, classic avionics repair channels, scarce hydraulic pumps, and obsolete component sourcing solutions.',
    components: [
      { name: 'T56 / 501-D22 Engine Hardware', spec: 'Vetted military surplus & overhauled spares' },
      { name: 'Mechanical Flight Control Cables', spec: 'Mil-spec certified tensile testing' },
      { name: 'Analogue Flight Instruments & Gyros', spec: 'Calibrated with certification records' },
      { name: 'Emergency Escape Hatch Actuators', spec: 'ITAR and export compliance approved' },
    ],
  },
];

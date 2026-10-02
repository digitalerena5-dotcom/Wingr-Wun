import { Globe2, PackageSearch, ShieldCheck, Waypoints } from 'lucide-react';

export const services = [
  {
    id: 'global-sourcing',
    number: '01',
    title: 'Strategic Global Sourcing',
    short: 'Global Sourcing',
    icon: Globe2,
    body: 'Identifying and vetting premier Western OEMs and certified aerospace distributors to secure high-calibre aircraft parts and assemblies.',
    purpose: 'Guarantees reliable access to flight-critical rotables, propulsion hardware, and airframe structures through pre-audited supplier networks.',
    actionLabel: 'Discuss Sourcing Requirement',
  },
  {
    id: 'legacy-procurement',
    number: '02',
    title: 'Legacy Component Procurement',
    short: 'Legacy Procurement',
    icon: PackageSearch,
    body: 'Locating hard-to-find components and obsolete spares to extend the lifecycle and readiness of older aircraft fleets.',
    purpose: 'Overcomes manufacturer discontinuations and fragmented secondary markets to maintain mission readiness for proven platforms.',
    actionLabel: 'Source Legacy Components',
  },
  {
    id: 'export-compliance',
    number: '03',
    title: 'Regulatory & Export Compliance',
    short: 'Export Compliance',
    icon: ShieldCheck,
    body: 'Guiding clients through the complexities of international trade laws, export licensing, and ITAR compliance for cross-border transactions.',
    purpose: 'Provides advisory pre-clearance to ensure cross-border aerospace transfers navigate ITAR, EAR, and dual-use regulations without customs delays.',
    actionLabel: 'Consult Compliance Advisory',
  },
  {
    id: 'logistics',
    number: '04',
    title: 'Logistics & Pipeline Facilitation',
    short: 'Logistics Facilitation',
    icon: Waypoints,
    body: 'Advising on secure, resilient transit corridors and shipping methodologies to minimize operational downtime and delays.',
    purpose: 'Architects dedicated, secure shipping pathways that protect component integrity, expedite customs handling, and prevent AOG delays.',
    actionLabel: 'Plan Transit Corridors',
  },
];

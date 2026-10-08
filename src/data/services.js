import { Globe2, PackageSearch, ShieldCheck, Waypoints } from 'lucide-react';

export const services = [
  {
    id: 'global-sourcing',
    number: '01',
    title: 'Strategic global sourcing',
    short: 'Global Sourcing',
    icon: Globe2,
    body: 'Identifying and vetting established international OEMs and certified aerospace distributors across global markets to secure high-quality aircraft components and assemblies.',
    purpose: 'Provides reliable access to critical rotables, propulsion hardware, and airframe structures through verified supplier networks.',
    actionLabel: 'Discuss Sourcing Requirement',
  },
  {
    id: 'legacy-procurement',
    number: '02',
    title: 'Legacy component procurement',
    short: 'Legacy Procurement',
    icon: PackageSearch,
    body: 'Locating scarce aircraft components and obsolete spares to extend the service life and operational readiness of mature aircraft fleets.',
    purpose: 'Overcomes manufacturer discontinuations and fragmented secondary markets to maintain mission readiness for proven platforms.',
    actionLabel: 'Source Legacy Components',
  },
  {
    id: 'export-compliance',
    number: '03',
    title: 'Regulatory & export compliance',
    short: 'Export Compliance',
    icon: ShieldCheck,
    body: 'Guiding clients through the complexities of international trade regulations, export licensing, and ITAR compliance for international aviation procurement.',
    purpose: 'Provides structured compliance guidance to ensure international aerospace shipments navigate ITAR, EAR, and dual-use regulations without customs delays.',
    actionLabel: 'Consult Compliance Advisory',
  },
  {
    id: 'logistics',
    number: '04',
    title: 'Logistics & pipeline facilitation',
    short: 'Logistics Facilitation',
    icon: Waypoints,
    body: 'Advising on secure transit corridors and freight methodologies to minimise operational downtime and delays.',
    purpose: 'Establishes dependable routing and handling arrangements that protect component integrity, expedite customs clearance, and prevent AOG delays.',
    actionLabel: 'Plan Transit Corridors',
  },
];

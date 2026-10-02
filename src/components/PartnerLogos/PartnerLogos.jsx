export default function PartnerLogos() {
  const standards = [
    { code: 'FAA 8130-3', label: 'Airworthiness Approval Standards' },
    { code: 'EASA FORM 1', label: 'Part-145 Dual Release Compliance' },
    { code: 'ASA-100', label: 'Aviation Suppliers Association Standard' },
    { code: 'AS9120B / ISO 9001', label: 'Aerospace Distributor Quality System' },
    { code: 'ITAR / EAR', label: 'Export Administration Regulations Protocol' },
    { code: 'IATA CARGO', label: 'Secure Corridors & Dangerous Goods Ready' },
  ];

  return (
    <section aria-label="Aerospace Quality Standards" className="border-y border-[color:var(--line-dark)] bg-navy-900/80 py-8">
      <div className="container-x">
        <p className="mono text-center text-[0.68rem] uppercase tracking-[0.2em] text-steel-grey mb-6">
          ALIGNED WITH INTERNATIONAL AEROSPACE &amp; REGULATORY STANDARDS
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {standards.map((s) => (
            <div
              key={s.code}
              className="group flex flex-col items-center justify-center p-3 rounded border border-transparent transition-all duration-300 hover:border-[color:var(--line-dark)] hover:bg-navy-950/60"
            >
              <span className="mono text-xs font-bold tracking-wider text-steel-grey transition-colors group-hover:text-gold">
                {s.code}
              </span>
              <span className="mono mt-1 text-center text-[0.62rem] text-steel-grey/70 transition-colors group-hover:text-white">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

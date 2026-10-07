import { useEffect, useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, Printer } from 'lucide-react';
import { legalPolicies } from '../../data/legal.js';

export default function LegalModal({ isOpen, initialTab = 'privacy', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab && legalPolicies[initialTab]) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPolicy = legalPolicies[activeTab] || legalPolicies.privacy;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071925]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded border border-[color:var(--line-gold)] bg-navy-900 text-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--line-dark)] bg-navy-950/80 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/wingr_wun_logo.png"
              alt="Wingr Wun"
              className="h-7 w-7 object-contain"
            />
            <div>
              <p className="mono text-[0.68rem] tracking-wider uppercase text-gold">Official Governance &amp; Compliance</p>
              <h2 id="legal-modal-title" className="font-display text-base sm:text-lg font-bold tracking-tight text-white">
                Wingr Wun Statutory &amp; Commercial Policies
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              aria-label="Print policy document"
              className="hidden sm:inline-flex items-center gap-1.5 rounded border border-[color:var(--line-dark)] px-2.5 py-1.5 mono text-xs text-steel-grey transition-colors hover:border-gold hover:text-white"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 items-center justify-center rounded border border-[color:var(--line-dark)] text-steel-grey transition-colors hover:border-gold hover:text-white"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-[color:var(--line-dark)] bg-navy-950/50 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 mono text-xs font-semibold uppercase tracking-wider transition-colors sm:px-5 ${
              activeTab === 'privacy'
                ? 'border-gold text-gold'
                : 'border-transparent text-steel-grey hover:text-white'
            }`}
          >
            <ShieldCheck size={15} />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 mono text-xs font-semibold uppercase tracking-wider transition-colors sm:px-5 ${
              activeTab === 'terms'
                ? 'border-gold text-gold'
                : 'border-transparent text-steel-grey hover:text-white'
            }`}
          >
            <FileText size={15} />
            <span>Terms of Supply</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cookies')}
            className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 mono text-xs font-semibold uppercase tracking-wider transition-colors sm:px-5 ${
              activeTab === 'cookies'
                ? 'border-gold text-gold'
                : 'border-transparent text-steel-grey hover:text-white'
            }`}
          >
            <Cookie size={15} />
            <span>Cookie Policy</span>
          </button>
        </div>

        {/* Policy Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Header Summary Card */}
          <div className="rounded border border-[color:var(--line-dark)] bg-navy-950/60 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--line-dark)] pb-2.5">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                {currentPolicy.title}
              </h3>
              <span className="mono text-xs text-steel-grey">
                Effective: {currentPolicy.lastUpdated}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted-dark)]">
              {currentPolicy.summary}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-6">
            {currentPolicy.sections.map((sec) => (
              <div key={sec.heading} className="rounded border border-[color:var(--line-dark)]/80 bg-navy-950/30 p-4 sm:p-6">
                <h4 className="font-display text-base font-semibold text-white">
                  {sec.heading}
                </h4>
                <div className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted-dark)] whitespace-pre-line space-y-2">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Notice */}
          <div className="border-t border-[color:var(--line-dark)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-steel-grey mono">
            <span>Wingr Wun // Registered in the United Kingdom</span>
            <span>Direct Enquiries: contact@wingrwun.co.uk</span>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="flex items-center justify-end border-t border-[color:var(--line-dark)] bg-navy-950 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-sm"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}

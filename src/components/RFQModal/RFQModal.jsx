import { useEffect } from 'react';
import { X } from 'lucide-react';
import AviationRFQForm from '../Shared/AviationRFQForm.jsx';

export default function RFQModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rfq-modal-title"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#071925]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded border border-[color:var(--line-gold)] bg-navy-900 text-white shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[color:var(--line-dark)] px-4 py-3 sm:px-8 sm:py-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/wingr_wun_logo.png"
              alt="Wingr Wun"
              className="h-7 w-auto object-contain"
            />
            <div>
              <p className="mono text-[0.68rem] tracking-wider uppercase text-gold">Official RFQ Intake Desk</p>
              <h2 id="rfq-modal-title" className="font-display text-lg font-semibold tracking-tight text-white">
                Submit aviation requirement
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded border border-[color:var(--line-dark)] text-steel-grey transition-colors hover:border-gold hover:text-white"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Body */}
        <AviationRFQForm inModal={true} onClose={onClose} />
      </div>
    </div>
  );
}

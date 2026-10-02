import { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function RFQModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    requirementType: 'AOG Emergency',
    aircraftPlatform: '',
    partNumber: '',
    quantity: '1',
    requiredBy: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate aerospace RFQ dispatch
    setTimeout(() => {
      const generatedRef = `WW-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

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
        <div className="flex items-center justify-between border-b border-[color:var(--line-dark)] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/wingr_wun_logo.png"
              alt="Wingr Wun"
              className="h-7 w-7 object-contain"
            />
            <div>
              <p className="mono text-[0.68rem] tracking-wider uppercase text-gold">Official RFQ Intake Desk</p>
              <h2 id="rfq-modal-title" className="font-display text-lg font-semibold tracking-tight text-white">
                Submit Aviation Requirement
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

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                <CheckCircle size={36} strokeWidth={1.5} />
              </div>
              <p className="mono text-xs uppercase text-gold">Requirement Logged in Queue</p>
              <h3 className="h3 mt-2 text-white">RFQ Transmitted Successfully</h3>
              <p className="mx-auto mt-4 max-w-md text-sm text-[color:var(--text-muted-dark)]">
                Our aviation procurement and technical advisory desk will review your specifications against active OEM inventories and certified distributor channels.
              </p>

              <div className="mx-auto my-6 max-w-sm rounded border border-[color:var(--line-dark)] bg-navy-950 p-4">
                <p className="mono text-[0.7rem] uppercase text-steel-grey">Procurement Tracking Reference</p>
                <p className="mono mt-1 text-lg font-bold tracking-wider text-gold">{referenceId}</p>
                <p className="mono mt-1 text-[0.68rem] text-steel-grey">Priority: HIGH // Target Response: &lt; 4 Hours</p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="btn btn-primary"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rfq-name" className="mono block text-xs uppercase text-steel-grey">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="rfq-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Captain James Mitchell"
                    className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-company" className="mono block text-xs uppercase text-steel-grey">
                    Organization / Airline / MRO <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="rfq-company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Pacific Aerospace MRO"
                    className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label htmlFor="rfq-email" className="mono block text-xs uppercase text-steel-grey">
                    Work Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="rfq-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-phone" className="mono block text-xs uppercase text-steel-grey">
                    Phone / Operations Line
                  </label>
                  <input
                    type="tel"
                    id="rfq-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2834"
                    className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="rfq-country" className="mono block text-xs uppercase text-steel-grey">
                    Operating Jurisdiction <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="rfq-country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. United Kingdom"
                    className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Requirement Details Grid */}
              <div className="rounded border border-[color:var(--line-dark)] bg-navy-950/60 p-4 sm:p-5">
                <p className="mono mb-4 text-[0.72rem] tracking-wider uppercase text-gold">
                  Technical Sourcing Parameters
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rfq-type" className="mono block text-xs uppercase text-steel-grey">
                      Urgency / Requirement Type
                    </label>
                    <select
                      id="rfq-type"
                      name="requirementType"
                      value={formData.requirementType}
                      onChange={handleChange}
                      className="select mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
                    >
                      <option>AOG Emergency (Immediate Dispatch)</option>
                      <option>Scheduled Maintenance / C-Check</option>
                      <option>Legacy / Obsolete Component Sourcing</option>
                      <option>Rotable Exchange / Core Return</option>
                      <option>Export Compliance & Pre-Clearance</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rfq-aircraft" className="mono block text-xs uppercase text-steel-grey">
                      Aircraft Type / Platform
                    </label>
                    <input
                      type="text"
                      id="rfq-aircraft"
                      name="aircraftPlatform"
                      value={formData.aircraftPlatform}
                      onChange={handleChange}
                      placeholder="e.g. Boeing 777-300ER / CFM56-7B"
                      className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="rfq-part" className="mono block text-xs uppercase text-steel-grey">
                      Part Number (P/N)
                    </label>
                    <input
                      type="text"
                      id="rfq-part"
                      name="partNumber"
                      value={formData.partNumber}
                      onChange={handleChange}
                      placeholder="e.g. 331-200ER / OEM P/N"
                      className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-qty" className="mono block text-xs uppercase text-steel-grey">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="rfq-qty"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-date" className="mono block text-xs uppercase text-steel-grey">
                      Required On-Site By
                    </label>
                    <input
                      type="date"
                      id="rfq-date"
                      name="requiredBy"
                      value={formData.requiredBy}
                      onChange={handleChange}
                      className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 px-3.5 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="rfq-message" className="mono block text-xs uppercase text-steel-grey">
                  Specification Details / Notes
                </label>
                <textarea
                  id="rfq-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Include required condition (Factory New, New Surplus, Overhauled), target certification (FAA 8130-3 / EASA Form 1), and delivery airport code..."
                  className="mt-2 w-full rounded border border-[color:var(--line-dark)] bg-navy-950 p-3.5 text-sm text-white placeholder-steel-grey/60 focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-[color:var(--line-dark)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-steel-grey">
                  <ShieldCheck size={16} className="text-gold" />
                  <span>Encrypted transmission. Non-disclosure protected.</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary min-w-[200px]"
                >
                  {isSubmitting ? 'Transmitting RFQ...' : 'Submit Requirement'}
                  <ArrowRight size={18} strokeWidth={1.5} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '../Logo.jsx';
import TopRightInsignia from '../TopRightInsignia/TopRightInsignia.jsx';
import { navigation, navHref, contactHref, homeHref } from '../../data/navigation.js';
import { useActiveSection } from '../../hooks/useActiveSection.js';

const ids = navigation.filter((n) => !n.page).map((n) => n.id);
const NO_IDS = [];

export default function Header({ page = 'home', onOpenRFQ }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledSection = useActiveSection(page === 'home' ? ids : NO_IDS);
  const active = page === 'contact' ? 'contact' : scrolledSection;
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const focusTimer = setTimeout(() => panelRef.current?.querySelector('a')?.focus(), 80);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.classList.remove('menu-open');
    };
  }, [open]);

  const solid = scrolled || open;

  const handleCtaClick = (e) => {
    if (onOpenRFQ) {
      e.preventDefault();
      onOpenRFQ();
      setOpen(false);
      return;
    }
    if (page === 'contact') {
      e.preventDefault();
      const form = document.getElementById('enquiry-form');
      if (form) form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Right Corner Insignia */}
      <TopRightInsignia onOpenRFQ={onOpenRFQ} />

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,height] duration-300 ease-precise ${
          solid
            ? 'border-[color:var(--line-dark)] bg-[#071925]/92 backdrop-blur-md shadow-lg'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4 sm:gap-6 pr-14 sm:pr-20">
          {/* Brand Anchor (Logo) with guaranteed isolation from navigation */}
          <div className="flex items-center shrink-0">
            <a
              href={homeHref('top')}
              className="group inline-flex min-h-[44px] items-center text-white shrink-0 transition-opacity hover:opacity-95"
              aria-label="Wingr Wun — back to top"
              onClick={() => setOpen(false)}
            >
              <Logo />
            </a>

            {/* Precision Aerospace Vertical Divider */}
            <div
              className="hidden lg:block h-6 w-px bg-white/15 ml-6 xl:ml-8 mr-2 shrink-0"
              aria-hidden="true"
            />
          </div>

          {/* Desktop Navigation Links with generous breathing room */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-7 2xl:gap-8">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={navHref(item)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`nav-link relative py-1 text-[0.85rem] xl:text-[0.88rem] font-medium tracking-wide transition-colors duration-200 ${
                      active === item.id ? 'text-white font-semibold' : 'text-[color:var(--text-muted-dark)] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn btn-outline btn-sm hidden sm:inline-flex"
            >
              Discuss Your Requirement
              <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-[color:var(--line-dark-strong)] text-white transition-colors hover:border-gold lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overscroll-contain overflow-y-auto bg-navy-950 transition-[opacity,visibility] duration-300 ease-precise lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
        <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-[color:var(--line-dark)]">
            {navigation.map((item, i) => (
              <li
                key={item.id}
                className={`border-b border-[color:var(--line-dark)] transition-[opacity,transform] duration-500 ease-precise ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
              >
                <a
                  href={navHref(item)}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[58px] items-center justify-between py-3 font-display text-[1.45rem] font-semibold tracking-tight text-white"
                >
                  {item.label}
                  <span className="mono text-xs text-gold">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn btn-primary w-full"
            >
              Discuss Your Requirement
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-auto pt-8 border-t border-[color:var(--line-dark)] flex items-center justify-between">
            <p className="mono text-[0.72rem] uppercase text-steel-grey">
              Wingr Wun // Global Aerospace Supply
            </p>
            <img src="/images/wingr_wun_logo.png" alt="Wingr Wun" className="h-6 w-6 object-contain" />
          </div>
        </nav>
      </div>
    </>
  );
}

import { ArrowUp } from 'lucide-react';
import Logo from '../Logo.jsx';
import { homeHref } from '../../data/navigation.js';
import { socialLinks } from '../../data/social.js';
import { contact } from '../../data/contact.js';

export default function Footer({ onOpenRFQ }) {
  const colHead = 'mono text-[0.72rem] font-bold uppercase tracking-wider text-gold';
  const linkClass = 'inline-flex items-center text-sm text-[color:var(--text-muted-dark)] transition-colors duration-200 hover:text-gold';

  return (
    <footer className="relative border-t border-[color:var(--line-dark)] bg-[#071925] text-white">
      <div className="container-x py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* COLUMN 1: Logo & Company Statement */}
          <div className="sm:col-span-2 lg:col-span-4">
            <a href={homeHref('top')} className="inline-flex items-center text-white" aria-label="Wingr Wun — Back to top">
              <Logo />
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--text-muted-dark)]">
              Global aviation procurement and component sourcing support connecting operational requirements with trusted supply. Dedicated to airworthiness integrity, regulatory compliance, and mission readiness.
            </p>

            <div className="mt-6 flex items-center gap-3 mono text-xs text-steel-grey">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse-amber" />
              <span>Aviation Sourcing &amp; Procurement Desk</span>
            </div>
          </div>

          {/* COLUMN 2: Company Navigation */}
          <nav aria-label="Company Links" className="lg:col-span-2 lg:col-start-6">
            <h2 className={colHead}>Company</h2>
            <ul className="mt-5 space-y-3">
              <li><a href="#about" className={linkClass}>About Us</a></li>
              <li><a href="#services" className={linkClass}>Capabilities</a></li>
              <li><a href="#compliance" className={linkClass}>Compliance</a></li>
              <li><a href="#platforms" className={linkClass}>Platforms</a></li>
              <li><a href="#testimonials" className={linkClass}>Perspectives</a></li>
              <li><a href="#insights" className={linkClass}>Insights</a></li>
              <li>
                <button
                  type="button"
                  onClick={onOpenRFQ}
                  className="text-sm text-gold hover:underline"
                >
                  Contact Desk
                </button>
              </li>
            </ul>
          </nav>

          {/* COLUMN 3: Sourcing Disciplines */}
          <div className="lg:col-span-3">
            <h2 className={colHead}>Services</h2>
            <ul className="mt-5 space-y-3">
              <li><a href="#services" className={linkClass}>Aircraft Components</a></li>
              <li><a href="#services" className={linkClass}>Global Sourcing</a></li>
              <li><a href="#services" className={linkClass}>Legacy Procurement</a></li>
              <li><a href="#compliance" className={linkClass}>Compliance Support</a></li>
              <li><a href="#services" className={linkClass}>Logistics Facilitation</a></li>
              <li><a href="#network" className={linkClass}>Supply Chain Corridors</a></li>
            </ul>
          </div>

          {/* COLUMN 4: Connect & Direct Contact */}
          <div className="lg:col-span-3">
            <h2 className={colHead}>Connect</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  YouTube
                </a>
              </li>
            </ul>

            <div className="mt-6 border-t border-[color:var(--line-dark)] pt-4 text-xs text-steel-grey space-y-1">
              <p className="text-[color:var(--text-muted-dark)]">Direct inquiries through the advisory desk.</p>
              <button
                type="button"
                onClick={onOpenRFQ}
                className="mt-1 text-gold hover:underline inline-flex items-center gap-1 font-medium"
              >
                Submit Requirement Details &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM HORIZONTAL DIVIDER BAR */}
        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--line-dark)] pt-8 text-xs text-steel-grey sm:flex-row sm:items-center sm:justify-between">
          {/* LEFT: Copyright */}
          <div>
            &copy; 2026 Wingr Wun. All rights reserved.
          </div>

          {/* CENTER: Legal Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Supply</a>
            <span>&middot;</span>
            <a href="#cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>

          {/* RIGHT: Powered by DigitalErena */}
          <div className="flex items-center gap-4">
            <span className="text-[color:var(--text-muted-dark)]">
              Powered by{' '}
              <a
                href="https://digitalerena.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white transition-colors hover:text-gold underline underline-offset-2"
              >
                DigitalErena
              </a>
            </span>

            <a
              href="#top"
              aria-label="Back to top"
              className="group flex h-8 w-8 items-center justify-center rounded border border-[color:var(--line-dark)] text-steel-grey transition-colors hover:border-gold hover:text-white"
            >
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

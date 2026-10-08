import { useEffect, useState } from 'react';
import Preloader from './components/Preloader/Preloader.jsx';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import SupplyNetwork from './components/SupplyNetwork/SupplyNetwork.jsx';
import Capabilities from './components/Capabilities/Capabilities.jsx';
import Compliance from './components/Compliance/Compliance.jsx';
import OperationalMethodology from './components/OperationalMethodology/OperationalMethodology.jsx';
import WhyWingrWun from './components/WhyWingrWun/WhyWingrWun.jsx';
import Insights from './components/Insights/Insights.jsx';
import FinalCTA from './components/FinalCTA/FinalCTA.jsx';
import Footer from './components/Footer/Footer.jsx';
import ContactPage from './components/ContactPage/ContactPage.jsx';
import RFQModal from './components/RFQModal/RFQModal.jsx';
import LegalModal from './components/LegalModal/LegalModal.jsx';
import { CONTACT_HASH } from './data/navigation.js';

const TITLES = {
  home: 'Aviation Procurement & Aircraft Component Sourcing | Wingr Wun',
  contact: 'Contact Our Team | Wingr Wun',
};

function initialPage() {
  if (document.body.dataset.page === 'contact') return 'contact';
  return window.location.hash === `#${CONTACT_HASH}` ? 'contact' : 'home';
}

export default function App() {
  const [page, setPage] = useState(initialPage);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState({ isOpen: false, tab: 'privacy' });
  const isFilePage = document.body.dataset.page === 'contact';

  const openLegal = (tab = 'privacy') => setLegalModalState({ isOpen: true, tab });
  const closeLegal = () => setLegalModalState((prev) => ({ ...prev, isOpen: false }));

  // Single-file preview: switch views on hash change (#contact-us ↔ any home anchor) and legal popups.
  useEffect(() => {
    const handleLegalHash = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') openLegal('privacy');
      else if (hash === '#terms') openLegal('terms');
      else if (hash === '#cookies') openLegal('cookies');
    };

    handleLegalHash();

    if (isFilePage) {
      window.addEventListener('hashchange', handleLegalHash);
      return () => window.removeEventListener('hashchange', handleLegalHash);
    }

    const onHash = () => {
      const hash = window.location.hash;
      handleLegalHash();
      if (hash === `#${CONTACT_HASH}`) {
        setPage('contact');
        window.scrollTo({ top: 0 });
      } else if (!['#privacy', '#terms', '#cookies'].includes(hash)) {
        setPage((prev) => {
          if (prev === 'contact') {
            requestAnimationFrame(() => {
              const el = hash && document.getElementById(hash.slice(1));
              if (el) el.scrollIntoView();
              else window.scrollTo({ top: 0 });
            });
          }
          return 'home';
        });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [isFilePage]);

  useEffect(() => {
    document.title = TITLES[page];
  }, [page]);

  const openRFQ = () => setIsRFQOpen(true);
  const closeRFQ = () => setIsRFQOpen(false);

  return (
    <>
      <Preloader />
      <RFQModal isOpen={isRFQOpen} onClose={closeRFQ} />
      <LegalModal
        isOpen={legalModalState.isOpen}
        initialTab={legalModalState.tab}
        onClose={closeLegal}
      />
      <a href="#main" className="skip-link">Skip to content</a>
      <Header page={page} onOpenRFQ={openRFQ} />

      <main id="main">
        {page === 'contact' ? (
          <ContactPage />
        ) : (
          <>
            {/* 1. Hero & Primary Enquiry Action */}
            <Hero onOpenRFQ={openRFQ} />

            {/* 2. Company Introduction & Defense Aviation Background (Warm Ivory #F2F2EF) */}
            <About />

            {/* 3. Four Core Services */}
            <Services onOpenRFQ={openRFQ} />

            {/* 4. Supplier Network, Vendor Vetting, and Market Intelligence */}
            <SupplyNetwork />

            {/* 5. Sourcing and Consultancy Process (6 Stages) */}
            <Capabilities />

            {/* 8. Export Compliance & Logistics Guidance (Consultancy Service) */}
            <Compliance />

            {/* 9. Operational & Organizational Consultancy (Aviation Methodologies) */}
            <OperationalMethodology />

            {/* 10. Aviation Thinking Applied to Complex Supply Challenges */}
            <WhyWingrWun />

            {/* 11. Useful Sourcing & Compliance Insights */}
            <Insights />

            {/* 12. Final Enquiry Section */}
            <FinalCTA onOpenRFQ={openRFQ} />
          </>
        )}
      </main>

      {/* Complete Footer & Powered by DigitalErena */}
      <Footer onOpenRFQ={openRFQ} onOpenLegal={openLegal} />
    </>
  );
}

import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { pillars } from '../../data/capabilities.js';

export default function WhyWingrWun() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative bg-navy-950">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        <Reveal className="max-w-[52rem]">
          <span className="eyebrow">PHILOSOPHY &amp; PEDIGREE</span>
          <h2 id="why-title" className="h2 mt-4 text-white tracking-tight">
            Aviation Thinking Applied to<br />
            Complex Supply Challenges.
          </h2>
        </Reveal>

        {/* 4 Editorial Columns */}
        <ul className="mt-16 grid border-t border-[color:var(--line-dark-strong)] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={i * 100}
              className={`border-b border-[color:var(--line-dark)] py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:py-12
                ${i % 2 === 1 ? 'sm:border-l' : 'sm:pl-0'} lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0`}
            >
              <div className="flex items-center justify-between">
                <span className="mono text-xs text-gold">0{i + 1} // PRINCIPLE</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
              </div>

              <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-white">
                {p.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted-dark)]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

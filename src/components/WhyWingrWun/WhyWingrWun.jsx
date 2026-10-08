import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { pillars } from '../../data/capabilities.js';

export default function WhyWingrWun() {
  return (
    <section id="why" aria-labelledby="why-title" className="section-y relative bg-navy-950">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        <Reveal className="max-w-[52rem]">
          <span className="eyebrow">PHILOSOPHY &amp; PEDIGREE</span>
          <h2 id="why-title" className="h2 mt-2.5 sm:mt-3 text-white tracking-tight">
            Aviation expertise applied to complex supply challenges
          </h2>
        </Reveal>

        {/* 4 Editorial Columns */}
        <div className="mt-8 grid border-t border-[color:var(--line-dark-strong)] sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal
              as="div"
              key={p.title}
              delay={i * 100}
              className={`border-b border-[color:var(--line-dark)] py-5 sm:px-6 sm:py-6 lg:border-b-0 lg:py-7
                ${i % 2 === 1 ? 'sm:border-l' : 'sm:pl-0'} lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0 flex flex-col justify-start`}
            >
              <div className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>

              <h3 className="font-display mt-3.5 sm:mt-4 text-xl font-bold tracking-tight text-white [text-wrap:balance]">
                {p.title}
              </h3>

              <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-[color:var(--text-muted-dark)] [text-wrap:pretty]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

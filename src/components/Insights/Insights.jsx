import { useState } from 'react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { insightsArticles } from '../../data/insights.js';
import { ArrowUpRight, Clock, X, ChevronRight } from 'lucide-react';

export default function Insights() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section id="insights" aria-labelledby="insights-title" className="section-y relative bg-navy-950">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="eyebrow">INTELLIGENCE &amp; ADVISORY</span>
            <h2 id="insights-title" className="h2 mt-4 text-white tracking-tight">
              Operational briefs
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-sm text-[color:var(--text-muted-dark)] leading-relaxed">
              Technical briefs on aerospace procurement risks, dual-release airworthiness frameworks, and legacy fleet rotable sourcing.
            </p>
          </Reveal>
        </div>

        {/* 3 Editorial Article Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {insightsArticles.map((article, i) => (
            <Reveal
              as="article"
              key={article.id}
              delay={i * 120}
              className="brackets group relative flex flex-col overflow-hidden rounded border border-[color:var(--line-dark)] bg-navy-900/60 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-gold/60"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-950">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded bg-navy-950/85 px-2.5 py-1 mono text-[0.65rem] text-gold border border-gold/30">
                  {article.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center gap-3 mono text-[0.68rem] text-steel-grey">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-display mt-3 text-lg font-bold leading-snug text-white group-hover:text-gold transition-colors">
                  {article.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[color:var(--text-muted-dark)] line-clamp-3">
                  {article.summary}
                </p>

                <div className="mt-auto pt-6 border-t border-[color:var(--line-dark)] flex items-center justify-between">
                  <span className="mono text-[0.68rem] text-steel-grey">{article.author}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1 mono text-xs font-semibold text-white group-hover:text-gold transition-colors"
                  >
                    Read Analysis
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="fixed inset-0 bg-navy-950/90 backdrop-blur-md"
            onClick={() => setSelectedArticle(null)}
          />

          <div className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded border border-gold/40 bg-navy-900 p-6 text-white shadow-2xl sm:p-8">
            <div className="flex items-center justify-between border-b border-[color:var(--line-dark)] pb-4">
              <span className="mono text-xs uppercase text-gold">{selectedArticle.tag}</span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="flex h-8 w-8 items-center justify-center rounded border border-[color:var(--line-dark)] text-steel-grey hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="my-6">
              <h2 className="font-display text-2xl font-bold text-white">{selectedArticle.title}</h2>
              <div className="mt-2 flex items-center gap-3 mono text-xs text-steel-grey">
                <span>{selectedArticle.author}</span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
                <span>·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
            </div>

            <div className="aspect-[16/9] overflow-hidden rounded mb-6">
              <img src={selectedArticle.image} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="space-y-4 text-sm text-[color:var(--text-muted-dark)] leading-relaxed">
              <p>{selectedArticle.summary}</p>
              <h3 className="mono text-xs uppercase text-gold font-bold pt-2">Key operational standards</h3>
              <ul className="space-y-2">
                {selectedArticle.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-white">
                    <ChevronRight size={14} className="text-gold shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-xs text-steel-grey">
                To consult with our technical advisory team regarding specific part numbers, platform airworthiness requirements, or export corridors, submit your enquiry through the RFQ desk.
              </p>
            </div>

            <div className="mt-8 border-t border-[color:var(--line-dark)] pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="btn btn-outline btn-sm"
              >
                Close Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

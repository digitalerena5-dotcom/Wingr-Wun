import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { reviewStats, verifiedReviews } from '../../data/reviews.js';
import { Star, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';

export default function ReviewWall({ onOpenRFQ }) {
  return (
    <section className="section-y relative bg-navy-950 border-t border-[color:var(--line-dark)] overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* LEFT: Satisfaction Score Index */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">QUALITY VERIFICATION</span>
              <h2 className="h2 mt-4 text-white tracking-tight">
                Client reviews &amp; audit pedigree
              </h2>

              <div className="mt-8 rounded border border-[color:var(--line-dark)] bg-navy-900/80 p-6 backdrop-blur-sm">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold text-white">{reviewStats.averageRating}</span>
                  <span className="mono text-base text-steel-grey">/ {reviewStats.scale}</span>
                </div>

                <div className="mt-3 flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#C99B47" strokeWidth={0} />
                  ))}
                  <span className="mono ml-2 text-xs text-white">Satisfaction Score</span>
                </div>

                <div className="mt-6 space-y-3 border-t border-[color:var(--line-dark)] pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-steel-grey">Pedigree Trace Accuracy</span>
                    <span className="mono text-gold font-bold">{reviewStats.pedigreeAccuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel-grey">Repeat Client Rate</span>
                    <span className="mono text-white font-bold">{reviewStats.repeatClientRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel-grey">Verified Engagements</span>
                    <span className="mono text-white font-bold">{reviewStats.totalEngagements}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenRFQ}
                  className="btn btn-outline btn-sm mt-6 w-full"
                >
                  Submit Sourcing Evaluation
                  <ArrowRight size={14} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Verified Reviews Cards */}
          <div className="space-y-4 lg:col-span-8">
            {verifiedReviews.map((r, i) => (
              <Reveal
                key={r.id}
                delay={i * 100}
                className="group rounded border border-[color:var(--line-dark)] bg-navy-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-navy-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[color:var(--line-dark)] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex text-gold">
                      {[...Array(r.rating)].map((_, idx) => (
                        <Star key={idx} size={14} fill="#C99B47" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="mono text-xs text-white font-semibold">{r.title}</span>
                  </div>
                  <div className="flex items-center gap-2 mono text-[0.68rem] text-steel-grey">
                    <span className="flex items-center gap-1 text-gold">
                      <CheckCircle size={12} />
                      {r.source}
                    </span>
                    <span>·</span>
                    <span>{r.date}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[color:var(--text-muted-dark)]">
                  "{r.comment}"
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

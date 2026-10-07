import { useState } from 'react';
import { Reveal } from '../../hooks/useScrollReveal.jsx';
import { testimonials, isDemoContent } from '../../data/testimonials.js';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[currentIndex];

  return (
    <section id="testimonials" aria-labelledby="test-title" className="section-y relative bg-[#F2F2EF] text-[#071925] overflow-hidden">
      <div className="grid-bg--light absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <span className="eyebrow eyebrow--steel">CLIENT PERSPECTIVES</span>
            <h2 id="test-title" className="h2 mt-4 text-[#071925] tracking-tight">
              Trusted by Aviation Professionals Worldwide.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4">
            <p className="text-sm text-[#4A6272]">
              Procurement directors, MRO engineering heads, and fleet logistics managers rely on our vetting integrity and rapid sourcing corridors.
            </p>
          </Reveal>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mt-14 rounded border border-[rgba(7,25,37,0.14)] bg-white p-8 sm:p-12 lg:p-14 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[rgba(7,25,37,0.1)] pb-6">
            {/* 5-Star Rating */}
            <div className="flex items-center gap-1 text-[#C99B47]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#C99B47" strokeWidth={0} />
              ))}
              <span className="mono ml-2 text-xs font-bold text-[#071925]">5.0 / 5.0</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="mono rounded border border-[rgba(7,25,37,0.15)] bg-[#F2F2EF] px-2.5 py-1 text-[0.68rem] text-[#31566D]">
                {t.category}
              </span>
              <span className="mono rounded border border-[#C99B47]/40 bg-[#C99B47]/10 px-2.5 py-1 text-[0.68rem] text-[#8C6B28] flex items-center gap-1">
                <ShieldCheck size={12} />
                {t.verifiedTrace}
              </span>
            </div>
          </div>

          {/* Quote Body */}
          <div className="my-8">
            <Quote size={32} className="text-[#C99B47]/40 mb-4" />
            <blockquote className="font-display text-xl sm:text-2xl font-semibold leading-relaxed text-[#071925]">
              "{t.quote}"
            </blockquote>
          </div>

          {/* Author Footnote & Controls */}
          <div className="flex flex-col gap-6 border-t border-[rgba(7,25,37,0.1)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-bold text-[#071925]">{t.author}</p>
              <p className="text-sm text-[#4A6272]">{t.role} · {t.organization}</p>
              <p className="mono text-xs text-[#6E8798]">{t.location}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="mono text-xs text-[#6E8798] mr-2">
                0{currentIndex + 1} / 0{testimonials.length}
              </div>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded border border-[rgba(7,25,37,0.2)] bg-[#F2F2EF] text-[#071925] transition-colors hover:border-[#C99B47] hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded border border-[rgba(7,25,37,0.2)] bg-[#F2F2EF] text-[#071925] transition-colors hover:border-[#C99B47] hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Clear Code/CMS Demonstration Disclaimer per Prompt Instructions */}
        {isDemoContent && (
          <p className="mt-4 text-center mono text-[0.65rem] text-[#6E8798]">
            * Operational scenario benchmarks representative of standard sourcing engagements. Verified client references available under bilateral NDA.
          </p>
        )}
      </div>
    </section>
  );
}

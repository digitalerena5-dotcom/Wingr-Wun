import { trustItems } from '../../data/services.js';

export default function TrustStrip() {
  return (
    <section id="positioning" aria-label="Areas of focus" className="relative border-y border-[color:var(--line-dark)] bg-navy-900">
      <div className="container-x">
        <ul className="grid grid-cols-2 md:grid-cols-5">
          {trustItems.map((item, i) => (
            <li
              key={item}
              className={`flex items-center gap-3.5 border-[color:var(--line-dark)] py-6 md:justify-center md:border-l md:px-4 md:py-8 md:first:border-l-0 lg:py-9
                ${i % 2 === 1 ? 'border-l pl-5 md:pl-4' : ''} ${i < 4 ? 'border-b md:border-b-0' : ''} ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <span className="block h-[7px] w-[7px] shrink-0 rotate-45 border border-gold" aria-hidden="true" />
              <span className="mono text-[0.75rem] font-medium uppercase text-[color:var(--text-on-dark)]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

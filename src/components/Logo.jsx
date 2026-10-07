export default function Logo({ className = '' }) {
  return (
    <div className={`inline-flex shrink-0 items-center gap-3 sm:gap-3.5 whitespace-nowrap select-none ${className}`}>
      <img
        src="/images/wingr_wun_logo.png"
        alt="Wingr Wun Official Seal"
        width="80"
        height="80"
        className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 shrink-0 object-contain drop-shadow-[0_4px_16px_rgba(201,155,71,0.4)] transition-transform duration-300 group-hover:scale-105"
      />
      <span className="font-display text-[1.25rem] sm:text-[1.45rem] lg:text-[1.65rem] font-black uppercase tracking-[0.16em] sm:tracking-[0.18em] text-white leading-none">
        WINGR <span className="text-gold">WUN</span>
      </span>
    </div>
  );
}

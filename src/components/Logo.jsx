export default function Logo({ className = '', subtitle = true }) {
  return (
    <div className={`inline-flex shrink-0 items-center gap-3.5 whitespace-nowrap select-none ${className}`}>
      <img
        src="/images/wingr_wun_logo.png"
        alt="Wingr Wun Official Seal"
        width="64"
        height="64"
        className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(201,155,71,0.35)] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center text-left">
        <span className="font-display text-[1.05rem] sm:text-[1.12rem] font-bold uppercase tracking-[0.16em] text-white leading-none">
          WINGR <span className="text-gold">WUN</span>
        </span>
        {subtitle && (
          <span className="font-sans text-[0.56rem] sm:text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#9FB1BD] leading-none mt-1.5">
            Aerospace Procurement
          </span>
        )}
      </div>
    </div>
  );
}

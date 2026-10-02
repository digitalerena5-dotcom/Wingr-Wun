export default function Logo({ className = '', subtitle = true }) {
  return (
    <div className={`inline-flex shrink-0 items-center gap-3 whitespace-nowrap select-none ${className}`}>
      <img
        src="/images/wingr_wun_logo.png"
        alt="Wingr Wun Official Seal"
        width="38"
        height="38"
        className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain drop-shadow-[0_2px_8px_rgba(201,155,71,0.25)] transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center text-left">
        <span className="font-display text-[0.95rem] sm:text-[1.02rem] font-bold uppercase tracking-[0.16em] text-white leading-none">
          WINGR <span className="text-gold">WUN</span>
        </span>
        {subtitle && (
          <span className="font-sans text-[0.54rem] sm:text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#9FB1BD] leading-none mt-1">
            Aerospace Procurement
          </span>
        )}
      </div>
    </div>
  );
}

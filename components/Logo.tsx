import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-space-sm group" aria-label="Vantage Motors home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.svg"
        alt=""
        className="h-7 lg:h-8 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span
          className={`font-headline-sm uppercase text-on-surface font-semibold group-hover:text-primary transition-colors ${
            compact ? "text-[16px] leading-tight tracking-tight" : "text-[16px] leading-tight lg:text-headline-sm tracking-tight lg:tracking-widest"
          }`}
        >
          VANTAGE
        </span>
        <span className="font-label-badge text-[9px] tracking-[0.25em] text-primary lg:text-outline uppercase">DUBAI</span>
      </div>
    </Link>
  );
}

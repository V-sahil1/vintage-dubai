import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

/** Cinematic banner for inner pages, in the style of the home hero. */
export default function PageHeader({
  kicker,
  title,
  text,
  image,
  crumb,
}: {
  kicker: string;
  title: string;
  text?: string;
  image: string;
  crumb: string;
}) {
  return (
    <section className="relative w-full -mt-16 lg:-mt-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface/70 to-surface/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/80 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin pt-32 lg:pt-44 pb-space-xl lg:pb-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-label-spec text-[12px] text-outline uppercase mb-space-md">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Icon name="chevron_right" className="text-[16px]" />
          <span className="text-on-surface">{crumb}</span>
        </nav>
        <div className="inline-flex items-center gap-space-xs px-space-sm md:px-space-md py-1 md:py-1.5 rounded-full bg-surface-container-highest/60 backdrop-blur-xl mb-space-md">
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-badge text-label-badge uppercase tracking-widest md:tracking-[0.25em] text-primary">{kicker}</span>
        </div>
        <h1 className="font-display-xl text-headline-lg-mobile md:text-display-xl-mobile lg:text-display-xl max-w-4xl tracking-tight text-on-surface uppercase mb-space-sm drop-shadow-lg">
          {title}
        </h1>
        {text && (
          <p className="font-body-lg text-body-sm md:text-body-lg max-w-2xl text-on-surface-variant font-light leading-relaxed">{text}</p>
        )}
      </div>
    </section>
  );
}

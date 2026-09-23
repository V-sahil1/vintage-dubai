import Link from "next/link";
import Icon from "../Icon";
import { categories } from "@/lib/vehicles";

export default function Categories({ bg = "bg-surface-container" }: { bg?: string }) {
  return (
    <section className={`w-full py-space-xl lg:py-24 ${bg}`}>
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="max-w-2xl mb-space-md md:mb-space-xl">
          <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block mb-2">
            <span className="md:hidden">Curated Segments</span>
            <span className="hidden md:inline">Curated Architectures</span>
          </span>
          <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
            <span className="md:hidden">Browse by Category</span>
            <span className="hidden md:inline">Find Your Perfect Drive</span>
          </h2>
          <div className="hidden md:block w-16 h-0.5 bg-primary mt-3 mb-2" />
          <p className="hidden md:block font-body-md text-body-md text-secondary">
            Tailored precisely to every dimension of distinguished Gulf motoring.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-space-sm md:gap-gutter lg:gap-space-md">
          {categories.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative h-32 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md bg-surface-container flex flex-col justify-end p-space-sm md:p-space-lg"
            >
              <picture>
                <source media="(min-width: 768px)" srcSet={c.image} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.mobileImage ?? c.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 md:via-surface-container-lowest/60 to-transparent" />
              {/* Mobile compact label */}
              <div className="relative z-10 md:hidden flex flex-col">
                <span className="font-headline-sm text-[15px] font-bold uppercase text-on-surface">{c.mobileTitle}</span>
                <span className="font-label-spec text-[10px] text-primary">{c.count} Vehicles →</span>
              </div>
              {/* Desktop label */}
              <div className="relative z-10 hidden md:block">
                <span className="font-label-badge text-label-badge text-primary uppercase tracking-widest block mb-1">
                  {c.index}
                </span>
                <h3 className="font-headline-md text-headline-md-mobile lg:text-headline-md text-on-surface uppercase mb-1">
                  {c.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light mb-3">{c.text}</p>
                <span className="inline-flex items-center gap-1 font-label-spec text-label-spec text-primary font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <Icon name="east" className="text-[16px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

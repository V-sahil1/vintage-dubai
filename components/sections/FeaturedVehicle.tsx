import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import { Price } from "../Currency";
import { whatsappLink } from "@/lib/site";
import type { Vehicle } from "@/lib/vehicles";

/** Editorial split showcase (Vantage Spotlight) — also used as the vehicle detail layout. */
export default function FeaturedVehicle({
  v,
  kicker = "Vantage Spotlight • GCC Specification",
  as = "h2",
  showDetailsLink = true,
  badgeTitle = "Porsche Approved",
  badgeText = "Warranty coverage valid until 2028 across GCC",
}: {
  v: Vehicle;
  kicker?: string;
  as?: "h1" | "h2";
  showDetailsLink?: boolean;
  badgeTitle?: string;
  badgeText?: string;
}) {
  const Title = as;
  const monthly = v.monthly ?? Math.round((v.price * 0.8 * (1 + 0.0299 * 4)) / 48);
  return (
    <section className="w-full py-space-xl lg:py-28 bg-surface-container-lowest relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
          <div className="lg:col-span-7 relative group">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative bg-surface-container">
              <Image
                src={v.image}
                alt={`${v.name} – ${v.summary}`}
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 via-transparent to-transparent" />
              <div className="sm:hidden absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-1 rounded font-label-badge text-[10px] uppercase font-bold tracking-wider">
                Curator&apos;s Spotlight
              </div>
            </div>
            <div className="hidden sm:flex absolute -bottom-6 -right-2 lg:-right-6 p-space-md rounded-xl bg-surface-container-high/90 backdrop-blur-xl shadow-xl items-center gap-space-md max-w-xs">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Icon name="workspace_premium" className="text-[24px]" />
              </div>
              <div>
                <p className="font-headline-sm text-body-sm uppercase text-on-surface font-bold">{badgeTitle}</p>
                <p className="font-label-spec text-[11px] text-secondary">{badgeText}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary">{kicker}</span>
            </div>
            <Title className="font-display-xl text-headline-md-mobile sm:text-headline-lg-mobile lg:text-[44px] lg:leading-[52px] font-semibold uppercase text-on-surface tracking-tight mb-2">
              {v.name}
            </Title>
            <p className="font-label-spec text-label-spec text-secondary uppercase tracking-widest mb-4">{v.summary}</p>

            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-lg flex items-center justify-between gap-space-md">
              <div>
                <span className="font-label-badge text-[10px] text-outline uppercase block">{v.priceLabel}</span>
                <Price aed={v.price} className="font-headline-sm text-[20px] sm:text-headline-sm text-primary font-bold" />
              </div>
              <div className="text-right">
                <span className="font-label-badge text-[10px] text-outline uppercase block">Finance Option</span>
                <span className="font-label-spec text-label-spec text-on-surface font-semibold">
                  AED {monthly.toLocaleString("en-US")} <span className="text-secondary font-normal">/ mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-space-lg">
              {v.details.map((d) => (
                <div key={d.label} className="p-3 rounded bg-surface-container">
                  <span className="font-label-badge text-[10px] uppercase text-outline block">{d.label}</span>
                  <span
                    className={`font-label-spec text-label-spec ${d.highlight ? "text-primary font-bold" : "text-on-surface font-semibold"}`}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-space-lg">
              {v.features.map((f) => (
                <span key={f} className="px-2.5 py-1 rounded bg-surface-container font-label-badge text-[11px] text-secondary uppercase">
                  {f}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-space-sm">
              {showDetailsLink && (
                <Link
                  className="px-space-lg py-3 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary transition-all"
                  href={`/inventory/${v.slug}`}
                >
                  View Details
                </Link>
              )}
              <Link
                className={`px-space-lg py-3 rounded-sm font-headline-sm text-body-sm uppercase tracking-wider transition-colors ${
                  showDetailsLink
                    ? "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    : "bg-primary text-on-primary font-bold hover:bg-tertiary"
                }`}
                href={`/book-a-test-drive?vehicle=${v.slug}`}
              >
                Book Test Drive
              </Link>
              <a
                className="p-3 rounded-sm bg-surface-container hover:bg-surface-container-high text-primary hover:text-tertiary transition-colors"
                href={whatsappLink(`Inquiry ${v.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                title="Instant Broker WhatsApp"
                aria-label={`WhatsApp a broker about ${v.name}`}
              >
                <Icon name="chat" className="text-[20px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

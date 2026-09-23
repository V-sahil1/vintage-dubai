import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { Price, PriceAlt } from "./Currency";
import Vehicle3DTrigger from "./viewer3d/Vehicle3DTrigger";
import { whatsappLink } from "@/lib/site";
import type { Vehicle } from "@/lib/vehicles";

/** Vehicles with a 3D model open the interactive viewer on card click instead of navigating. */
function withViewer(v: Vehicle, card: React.ReactElement) {
  if (!v.viewer3d) return card;
  return (
    <Vehicle3DTrigger config={v.viewer3d} detailsHref={`/inventory/${v.slug}`}>
      {card}
    </Vehicle3DTrigger>
  );
}

/** Desktop / tablet inventory card (grid layout). */
export function VehicleCard({ v }: { v: Vehicle }) {
  return withViewer(
    v,
    <article className="group flex flex-col rounded-xl overflow-hidden bg-surface-container-low shadow-md hover:shadow-xl transition-all duration-500">
      <Link href={`/inventory/${v.slug}`} className="relative block w-full aspect-[16/10] overflow-hidden bg-surface-container">
        <Image
          src={v.image}
          alt={`${v.name} – ${v.summary}`}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md font-label-badge text-label-badge text-primary uppercase tracking-widest font-bold">
            {v.badges[0]}
          </span>
          <span className="px-2.5 py-1 rounded bg-surface-container-lowest/80 backdrop-blur-md font-label-badge text-label-badge text-secondary uppercase tracking-widest">
            {v.badges[1]}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-spec text-[11px] text-tertiary font-bold tracking-wider">
            {v.cornerTag}
          </span>
        </div>
      </Link>
      <div className="p-space-md flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-outline text-body-sm font-label-spec mb-1 uppercase">
            <span>{v.make}</span>
            <span>{v.year}</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase group-hover:text-primary transition-colors">
            <Link href={`/inventory/${v.slug}`}>{v.name}</Link>
          </h3>
          <p className="font-body-sm text-body-sm text-secondary line-clamp-1 mt-1">{v.summary}</p>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 bg-surface-container-lowest/40 rounded p-2.5">
            {v.specs.map((s) => (
              <div key={s.label} className="flex flex-col text-center">
                <span className="font-label-badge text-[10px] uppercase text-outline">{s.label}</span>
                <span className="font-label-spec text-label-spec text-on-surface font-semibold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 flex items-center justify-between gap-2">
          <div>
            <span className="font-label-badge text-[10px] text-outline uppercase block">{v.priceLabel}</span>
            <Price aed={v.price} className="font-headline-sm text-[20px] leading-7 sm:text-headline-sm text-primary font-bold" />
            <PriceAlt aed={v.price} className="block font-label-spec text-[11px] text-secondary" />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              className="p-2.5 rounded bg-surface-container hover:bg-surface-container-high text-primary hover:text-tertiary transition-colors"
              href={whatsappLink(`Inquiry ${v.name}`)}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Concierge"
              aria-label={`WhatsApp inquiry about ${v.name}`}
            >
              <Icon name="chat" className="text-[20px]" />
            </a>
            <Link
              className="px-4 py-2.5 rounded bg-surface-container hover:bg-primary hover:text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider transition-all"
              href={`/inventory/${v.slug}`}
            >
              Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Compact mobile carousel card from the mobile showroom design. */
export function MobileVehicleCard({ v }: { v: Vehicle }) {
  return withViewer(
    v,
    <article className="min-w-[290px] max-w-[300px] snap-center bg-surface-container rounded-xl overflow-hidden shadow-lg flex flex-col shrink-0">
      <Link href={`/inventory/${v.slug}`} className="relative block w-full h-44 bg-surface-container-high overflow-hidden">
        <Image src={v.altImage ?? v.image} alt={v.name} fill sizes="300px" className="object-cover" />
        <div className="absolute top-2.5 left-2.5 flex gap-1">
          <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-label-badge text-[9px] uppercase font-bold">
            {v.badges[1] === "GCC Spec" ? "GCC Spec" : v.badges[0]}
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-on-surface font-label-badge text-[9px] uppercase">
            {v.cornerTag}
          </span>
        </div>
      </Link>
      <div className="p-space-md flex flex-col gap-space-sm flex-1 justify-between">
        <div className="flex flex-col">
          <span className="font-label-badge text-[10px] uppercase text-primary tracking-widest">{v.year}</span>
          <h3 className="font-headline-sm text-[17px] font-semibold text-on-surface leading-snug">{v.name}</h3>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-space-xs rounded-lg text-center">
          {v.specs.map((s) => (
            <div key={s.label}>
              <span className="font-label-badge text-[9px] text-on-surface-variant block uppercase">{s.label}</span>
              <span className="font-label-spec text-[11px] font-bold text-on-surface">{s.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-space-xs">
          <div className="flex flex-col">
            <span className="font-label-badge text-[9px] text-on-surface-variant uppercase">{v.priceLabel}</span>
            <Price aed={v.price} className="font-label-spec text-[16px] font-bold text-primary" />
          </div>
          <Link
            className="px-space-sm py-2 rounded bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-headline-sm text-[12px] uppercase font-semibold transition-colors"
            href={`/inventory/${v.slug}`}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Tall cinematic card used by The Luxury Collection. */
export function LuxuryCard({ v, kicker }: { v: Vehicle; kicker: string }) {
  return withViewer(
    v,
    <article className="flex flex-col rounded-xl overflow-hidden bg-surface-container-low shadow-lg group">
      <Link href={`/inventory/${v.slug}`} className="relative block w-full aspect-[4/3] overflow-hidden bg-surface-container">
        <Image
          src={v.image}
          alt={`${v.name} – ${v.summary}`}
          fill
          sizes="(min-width:1024px) 33vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded bg-surface-container-lowest/85 backdrop-blur-md font-label-badge text-label-badge text-primary uppercase tracking-widest font-bold">
            {v.badges[0]}
          </span>
        </div>
      </Link>
      <div className="p-space-md md:p-space-lg flex-1 flex flex-col justify-between">
        <div>
          <span className="font-label-spec text-label-spec text-outline uppercase block mb-1">{kicker}</span>
          <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-2">{v.name}</h3>
          <p className="font-body-sm text-body-sm text-secondary font-light">{v.summary}</p>
        </div>
        <div className="mt-6 pt-4 flex items-center justify-between gap-2">
          <div>
            <span className="font-label-badge text-[10px] text-outline uppercase block">{v.priceLabel}</span>
            <Price aed={v.price} className="font-headline-sm text-[20px] leading-7 sm:text-headline-sm text-primary font-bold" />
          </div>
          <Link
            className="px-4 py-2.5 rounded bg-surface-container hover:bg-primary hover:text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider transition-all whitespace-nowrap"
            href={`/inventory/${v.slug}`}
          >
            Explore Vehicle →
          </Link>
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import FeaturedVehicle from "@/components/sections/FeaturedVehicle";
import Finance from "@/components/sections/Finance";
import ContactForm from "@/components/sections/ContactForm";
import { VehicleCard } from "@/components/VehicleCard";
import { getVehicle, vehicles } from "@/lib/vehicles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  return v ? { title: v.name, description: v.description } : { title: "Vehicle not found" };
}

export default async function VehiclePage({ params }: { params: Params }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();

  const related = vehicles
    .filter((o) => o.slug !== v.slug && o.types.some((t) => v.types.includes(t) && t !== "new" && t !== "preowned"))
    .slice(0, 3);

  return (
    <>
      <div className="w-full bg-surface-container-lowest">
        <nav
          aria-label="Breadcrumb"
          className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin pt-space-lg flex flex-wrap items-center gap-1 font-label-spec text-[12px] text-outline uppercase"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Icon name="chevron_right" className="text-[16px]" />
          <Link href="/inventory" className="hover:text-primary transition-colors">
            Inventory
          </Link>
          <Icon name="chevron_right" className="text-[16px]" />
          <span className="text-on-surface">{v.name}</span>
        </nav>
      </div>

      <FeaturedVehicle
        v={v}
        as="h1"
        showDetailsLink={false}
        kicker={`${v.make} • ${v.year}`}
        badgeTitle={v.cornerTag}
        badgeText={`${v.badges.join(" • ")} • ${v.mileage}`}
      />

      <section className="w-full pb-space-xl lg:pb-24 bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl">
          <div className="lg:col-span-7 space-y-space-md">
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block">Curator&apos;s Notes</span>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant font-light leading-relaxed">{v.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              {[
                { icon: "verified", t: "160-Point Inspection Passed" },
                { icon: "history_edu", t: "Verified Service History" },
                { icon: "account_balance", t: "Finance From 2.99% p.a." },
                { icon: "local_shipping", t: "VIP Doorstep Delivery" },
              ].map((i) => (
                <div key={i.t} className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <Icon name={i.icon} className="text-[22px]" />
                  </div>
                  <span className="font-headline-sm text-[15px] font-semibold text-on-surface">{i.t}</span>
                </div>
              ))}
            </div>
          </div>
          {v.altImage && (
            <div className="lg:col-span-5">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                <Image src={v.altImage} alt={`${v.name} alternate view`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      <Finance />

      {related.length > 0 && (
        <section className="w-full py-space-xl lg:py-24 bg-surface-container-lowest">
          <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
            <div className="flex items-end justify-between gap-space-md mb-space-lg">
              <div>
                <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block mb-2">You May Also Consider</span>
                <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile uppercase text-on-surface tracking-tight">
                  Similar Vehicles
                </h2>
              </div>
              <Link href="/inventory" className="font-label-spec text-label-spec text-primary flex items-center gap-0.5 hover:underline shrink-0">
                View All <Icon name="arrow_forward" className="text-[16px]" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
              {related.map((r) => (
                <VehicleCard key={r.slug} v={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactForm defaultInterest={v.slug} />
    </>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import FilterTabs from "./FilterTabs";
import Icon from "./Icon";
import { CurrencySwitcher } from "./Currency";
import { MobileVehicleCard, VehicleCard } from "./VehicleCard";
import { filterVehicles, homeInventory, vehicles } from "@/lib/vehicles";

/** Home page "Explore Our Collection" section with working category tabs. */
export default function InventoryShowcase() {
  const [type, setType] = useState("all");
  const list = type === "all" ? homeInventory : filterVehicles(vehicles, { type }).slice(0, 6);

  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-lowest" id="inventory">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg md:mb-space-xl gap-space-md">
          <div className="flex items-end justify-between gap-space-md">
            <div>
              <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block mb-2">
                <span className="md:hidden">Dubai Showroom Floor</span>
                <span className="hidden md:inline">Curated Showroom Inventory</span>
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
                <span className="md:hidden">Current Stock</span>
                <span className="hidden md:inline">Explore Our Collection</span>
              </h2>
              <p className="hidden md:block font-body-md text-body-md text-secondary mt-1">
                From relentless track-bred performance to regal grand touring refinement.
              </p>
            </div>
            <Link
              className="md:hidden font-label-spec text-label-spec text-primary flex items-center gap-0.5 hover:underline shrink-0"
              href="/inventory"
            >
              All (84) <Icon name="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
          <div className="hidden md:block">
            <CurrencySwitcher />
          </div>
        </div>

        <FilterTabs value={type} onChange={setType} />

        {list.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Mobile: horizontal snap carousel */}
            <div className="md:hidden -mx-gutter-mobile px-gutter-mobile flex gap-space-md pt-space-xs pb-space-md overflow-x-auto snap-x snap-mandatory scrollbar-none">
              {list.map((v) => (
                <MobileVehicleCard key={v.slug} v={v} />
              ))}
            </div>
            {/* Tablet / desktop grid */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
              {list.map((v) => (
                <VehicleCard key={v.slug} v={v} />
              ))}
            </div>
          </>
        )}

        <div className="mt-space-lg md:mt-space-xl flex flex-col sm:flex-row items-center justify-center gap-space-md">
          <Link
            className="w-full sm:w-auto text-center px-space-xl py-4 rounded-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-body-sm uppercase tracking-widest font-semibold transition-all"
            href={type === "all" ? "/inventory" : `/inventory?type=${type}`}
          >
            View Complete Inventory (84 Vehicles)
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="rounded-xl bg-surface-container-low p-space-xl text-center flex flex-col items-center gap-space-sm">
      <Icon name="search_off" className="text-[40px] text-primary" />
      <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface">No vehicles on the floor right now</h3>
      <p className="font-body-sm text-body-sm text-secondary max-w-md">
        Our acquisitions desk can source this specification for you, often within 72 hours.
      </p>
      <div className="flex flex-wrap justify-center gap-space-sm pt-space-xs">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-space-lg py-3 rounded-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-body-sm uppercase tracking-wider"
          >
            Reset Filters
          </button>
        )}
        <Link
          href="/contact"
          className="px-space-lg py-3 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary"
        >
          Request Sourcing
        </Link>
      </div>
    </div>
  );
}

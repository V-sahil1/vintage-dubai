import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import InventoryBrowser from "@/components/InventoryBrowser";
import Categories from "@/components/sections/Categories";
import TestDrive from "@/components/sections/TestDrive";
import { filtersKey, readFilters, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Inventory",
  description: "Browse verified new and certified pre-owned luxury vehicles in stock at Vantage Motors Dubai.",
};

export default async function InventoryPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await readFilters(searchParams);
  return (
    <>
      <PageHeader
        crumb="Inventory"
        kicker="Curated Showroom Inventory"
        title="Explore Our Collection"
        text="From relentless track-bred performance to regal grand touring refinement. Every vehicle is GCC-verified and ready for private viewing."
        image="/images/hero-showroom.png"
      />
      <section className="w-full pb-space-xl lg:pb-24 bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
          <InventoryBrowser key={filtersKey(filters)} initial={filters} />
        </div>
      </section>
      <Categories />
      <TestDrive />
    </>
  );
}

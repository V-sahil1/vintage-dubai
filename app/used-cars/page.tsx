import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PreOwned from "@/components/sections/PreOwned";
import InventoryBrowser from "@/components/InventoryBrowser";
import Finance from "@/components/sections/Finance";
import Testimonials from "@/components/sections/Testimonials";
import SectionHeading from "@/components/SectionHeading";
import { filtersKey, readFilters, type SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Used Cars",
  description: "Certified pre-owned luxury vehicles in Dubai with 160-point inspection, verified history and transparent pricing.",
};

export default async function UsedCarsPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await readFilters(searchParams, { type: "preowned" });
  return (
    <>
      <PageHeader
        crumb="Used Cars"
        kicker="Assured Provenance Standards"
        title="Premium Pre-Owned. Carefully Selected."
        text="Every pre-owned motorcar undergoes forensic assessment by master marque technicians, guaranteeing uncompromised pedigree."
        image="/images/cat-used.jpg"
      />
      <section className="w-full pb-space-xl lg:pb-24 bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
          <SectionHeading
            className="max-w-2xl mb-space-lg"
            kicker="Certified Pre-Owned"
            title="56 Vehicles Available"
            text="Filter our certified stock by marque, budget and body architecture."
          />
          <InventoryBrowser key={filtersKey(filters)} initial={filters} basePath="/used-cars" />
        </div>
      </section>
      <PreOwned showCta={false} />
      <Finance />
      <Testimonials />
    </>
  );
}

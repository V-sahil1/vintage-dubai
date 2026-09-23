import Link from "next/link";
import SectionHeading from "../SectionHeading";
import { LuxuryCard } from "../VehicleCard";
import { luxuryCollection, luxuryMarques } from "@/lib/vehicles";

const kickers: Record<string, string> = {
  "rolls-royce-spectre-ev": "All-Electric Ultra-Luxury",
  "lamborghini-revuelto": "Flagship Hypercar",
  "aston-martin-dbs-770-ultimate": "Collector Specification",
};

export default function LuxuryCollection() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-lowest relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin relative z-10">
        <SectionHeading
          align="center"
          className="max-w-3xl mb-space-lg md:mb-space-xl"
          kicker="Tier-One Collector Suite"
          title="The Luxury Collection"
          text="An exclusive repertoire of the world's most coveted hypercars and grand tourers curated for discerning private vaults."
        />
        <div className="flex flex-wrap items-center justify-center gap-space-xs mb-space-lg md:mb-space-xl">
          {luxuryMarques.map((m, i) => (
            <Link
              key={m.label}
              href={`/inventory?make=${m.make}`}
              className={`px-space-md py-2 rounded-full font-label-badge text-label-badge uppercase tracking-widest transition-colors ${
                i === 0
                  ? "bg-surface-container-high text-primary font-bold shadow-sm"
                  : "bg-surface-container text-secondary hover:text-on-surface"
              }`}
            >
              {m.label}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
          {luxuryCollection.map((v) => (
            <LuxuryCard key={v.slug} v={v} kicker={kickers[v.slug] ?? v.badges[1]} />
          ))}
        </div>
      </div>
    </section>
  );
}

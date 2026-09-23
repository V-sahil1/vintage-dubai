import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LuxuryCollection from "@/components/sections/LuxuryCollection";
import FeaturedVehicle from "@/components/sections/FeaturedVehicle";
import TestDrive from "@/components/sections/TestDrive";
import ContactForm from "@/components/sections/ContactForm";
import { VehicleCard } from "@/components/VehicleCard";
import SectionHeading from "@/components/SectionHeading";
import { spotlightVehicle, vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Luxury Cars",
  description: "The Luxury Collection: Rolls-Royce, Lamborghini, Aston Martin, Ferrari and more, curated for private vaults in Dubai.",
};

export default function LuxuryCarsPage() {
  const luxury = vehicles.filter((v) => v.types.includes("luxury") || v.types.includes("hypercar"));
  return (
    <>
      <PageHeader
        crumb="Luxury Cars"
        kicker="Tier-One Collector Suite"
        title="The Luxury Collection"
        text="An exclusive repertoire of the world's most coveted hypercars and grand tourers curated for discerning private vaults."
        image="/images/cat-luxury.jpg"
      />
      <LuxuryCollection />
      <FeaturedVehicle
        v={spotlightVehicle}
        kicker="Curator's Spotlight • 2024 Performance Marque"
        badgeTitle="Weissach Package"
        badgeText="Full Dubai dealer warranty through 2028"
      />
      <section className="w-full py-space-xl lg:py-24 bg-surface-container">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
          <SectionHeading
            className="max-w-2xl mb-space-lg md:mb-space-xl"
            kicker="Hypercars & Grand Tourers"
            title="In the Vault Now"
            text="Every hypercar and ultra-luxury marque currently on our Sheikh Zayed Road floor."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
            {luxury.map((v) => (
              <VehicleCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>
      <TestDrive />
      <ContactForm defaultInterest="sourcing" />
    </>
  );
}

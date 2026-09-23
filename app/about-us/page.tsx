import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Showroom from "@/components/sections/Showroom";
import Testimonials from "@/components/sections/Testimonials";
import PreOwned from "@/components/sections/PreOwned";

export const metadata: Metadata = {
  title: "About Us",
  description: "Vantage Motors: Dubai's multi-brand luxury automotive sanctuary on Sheikh Zayed Road.",
};

const stats = [
  { value: "84+", label: "Prime Vehicles in Stock" },
  { value: "160", label: "Point Inspection" },
  { value: "2.99%", label: "Finance From p.a." },
  { value: "< 30", label: "Minute Response" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumb="About Us"
        kicker="Dubai Flagship Destination"
        title="Drive What Defines You."
        text="The zenith of bespoke luxury and hypercar curation in the United Arab Emirates, orchestrating exceptional acquisitions for the world's most discerning collectors."
        image="/images/showroom-lounge.png"
      />
      <section className="w-full pb-space-xl lg:pb-24 bg-surface-container-lowest">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin grid grid-cols-2 lg:grid-cols-4 gap-space-sm md:gap-gutter">
          {stats.map((s) => (
            <div key={s.label} className="p-space-md md:p-space-lg rounded-xl bg-surface-container-low text-center">
              <p className="font-display-xl text-[32px] leading-10 md:text-headline-lg text-primary font-bold">{s.value}</p>
              <p className="font-label-badge text-label-badge uppercase tracking-widest text-outline mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
      <WhyChooseUs />
      <Showroom />
      <PreOwned showCta={false} />
      <Testimonials />
    </>
  );
}

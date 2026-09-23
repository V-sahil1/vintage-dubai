import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import TestDrive from "@/components/sections/TestDrive";
import Showroom from "@/components/sections/Showroom";
import Icon from "@/components/Icon";
import type { SearchParams } from "@/lib/params";
import { getVehicle } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Book a Test Drive",
  description: "Schedule a private test drive at our Sheikh Zayed Road lounge or at your doorstep anywhere in Dubai.",
};

const perks = [
  "Zero Obligation Curated Drive Route",
  "Emirates ID & Driving License Verification in 3 Mins",
  "Complimentary Espresso & Refreshments",
];

export default async function BookTestDrivePage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const slug = typeof sp.vehicle === "string" && getVehicle(sp.vehicle) ? sp.vehicle : "general";
  return (
    <>
      <PageHeader
        crumb="Book a Test Drive"
        kicker="Unrestricted Evaluation"
        title="Experience It Before You Own It"
        text="Schedule a private, unaccompanied test drive on Dubai's open asphalt or request our VIP enclosed trailer to deliver the vehicle to your doorstep."
        image="/images/test-drive-road.jpg"
      />
      <section className="w-full bg-surface-container-lowest pb-space-md">
        <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin flex flex-col md:flex-row flex-wrap gap-space-sm md:gap-space-lg">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface">
              <Icon name="check_circle" className="text-primary text-[20px]" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </section>
      <ContactForm key={slug} mode="test-drive" defaultInterest={slug} bg="bg-surface-container-lowest" />
      <TestDrive ctaHref="#booking" />
      <Showroom bg="bg-surface-container" />
    </>
  );
}

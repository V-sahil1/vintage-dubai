import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SellYourCar from "@/components/sections/SellYourCar";
import Finance from "@/components/sections/Finance";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description: "Get a transparent market valuation and same-day settlement offer for your luxury car in Dubai.",
};

export default function SellYourCarPage() {
  return (
    <>
      <PageHeader
        crumb="Sell Your Car"
        kicker="Instant Marque Appraisal"
        title="Sell or Consign Your Marque"
        text="Direct buyout or luxury consignment at true Dubai market liquidity value, with RTA paperwork and loan settlement handled on-site."
        image="/images/cat-sports.jpg"
      />
      <SellYourCar />
      <WhyChooseUs />
      <Finance />
      <Testimonials />
    </>
  );
}

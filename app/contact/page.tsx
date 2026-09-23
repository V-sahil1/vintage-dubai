import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import Showroom from "@/components/sections/Showroom";
import type { SearchParams } from "@/lib/params";

export const metadata: Metadata = {
  title: "Contact",
  description: "Speak with a Vantage Motors private broker by phone, WhatsApp or the VIP inquiry desk.",
};

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const interest = typeof sp.interest === "string" ? sp.interest : "general";
  return (
    <>
      <PageHeader
        crumb="Contact"
        kicker="Private Consultation Desk"
        title="Speak With a Broker"
        text="Have a bespoke specification or looking for an off-market hypercar allocation? Our acquisitions director will assist you."
        image="/images/showroom-lounge.png"
      />
      <ContactForm key={interest} defaultInterest={interest} bg="bg-surface-container-lowest" />
      <Showroom bg="bg-surface-container" />
    </>
  );
}

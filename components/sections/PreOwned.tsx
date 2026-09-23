import Link from "next/link";
import Icon from "../Icon";
import SectionHeading from "../SectionHeading";

const items = [
  {
    icon: "verified",
    title: "160-Point Quality Inspection",
    text: "Complete structural, mechanical, hydraulic, and electronic diagnostic validation with authenticated digital report.",
  },
  {
    icon: "history_edu",
    title: "Verified Vehicle History",
    text: "Authenticated mileage, zero undisclosed repair history, official agency service documentation, and clean title.",
  },
  {
    icon: "price_check",
    title: "Transparent Pricing",
    text: "Clear, all-inclusive drive-away pricing with zero hidden administrative levies, document fees, or unexpected markups.",
  },
  {
    icon: "account_balance",
    title: "UAE Bank Financing From 2.99%",
    text: "Expedited approvals through Emirates NBD, ADCB, FAB, and Dubai Islamic Bank with bespoke tailored terms.",
  },
  {
    icon: "sync_alt",
    title: "Instant Trade-In Valuation",
    text: "Same-day fair market appraisal with instant equity transfer or immediate credit towards your next upgrade.",
  },
  {
    icon: "home_pin",
    title: "VIP Doorstep Test Drive",
    text: "We deliver your vehicle of interest directly to your residence, office, or private hangar in Dubai or Abu Dhabi.",
  },
];

export default function PreOwned({ showCta = true }: { showCta?: boolean }) {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-high">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <SectionHeading
          className="max-w-3xl mb-space-lg md:mb-space-xl"
          kicker="Assured Provenance Standards"
          title="Premium Pre-Owned. Carefully Selected."
          text="Every pre-owned motorcar in our collection undergoes forensic assessment by master marque technicians, guaranteeing uncompromised pedigree and complete peace of mind."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xs md:gap-space-md mb-space-xl">
          {items.map((it) => (
            <div
              key={it.title}
              className="p-space-md md:p-space-lg rounded-xl bg-surface-container-lowest/80 backdrop-blur-md shadow-md flex items-center md:items-start gap-space-md"
            >
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center shrink-0">
                <Icon name={it.icon} className="text-primary text-[24px] md:text-[28px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-[15px] leading-5 md:text-headline-sm text-on-surface md:uppercase mb-1 font-semibold md:font-medium">
                  {it.title}
                </h3>
                <p className="font-body-sm text-[12px] leading-[18px] md:text-body-sm text-secondary">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
        {showCta && (
          <div className="flex justify-center">
            <Link
              className="inline-flex items-center justify-center text-center gap-space-xs px-space-lg md:px-space-xl py-4 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary transition-all shadow-md"
              href="/used-cars"
            >
              <span>Explore Certified Pre-Owned Collection (56 Available)</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

import Icon from "../Icon";
import SectionHeading from "../SectionHeading";

const reasons = [
  {
    icon: "verified_user",
    title: "Verified Inventory",
    text: "Every single motorcar passes a 160-point chassis, structural integrity, and telemetry diagnosis before it is welcomed into our Sheikh Zayed showroom.",
    foot: "100% Provenance Guaranteed",
  },
  {
    icon: "receipt_long",
    title: "Transparent Pricing",
    text: "Clear, drive-away rates. We believe the luxury experience demands absolute integrity with zero unexpected documentation surcharges.",
    foot: "No Hidden Fees",
  },
  {
    icon: "auto_stories",
    title: "Multi-Brand Selection",
    text: "One unified destination uniting Stuttgart, Goodwood, Maranello, and Sant'Agata under one architecturally stunning roof.",
    foot: "84+ Prime Vehicles in Stock",
  },
  {
    icon: "diamond",
    title: "VIP Concierge Care",
    text: "From private consultation lounges to enclosed white-glove transport directly to your driveway, our team orchestrates every detail.",
    foot: "Doorstep Handover Across GCC",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <SectionHeading
          className="max-w-2xl mb-space-lg md:mb-space-xl"
          kicker="The Vantage Advantage"
          title="A Better Way to Buy Your Next Car"
          text="Conducted with discrete transparency and unmatched private aviation-grade client care."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md md:gap-gutter">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="p-space-lg rounded-xl bg-surface-container-lowest/70 backdrop-blur-md shadow-md flex flex-col justify-between group hover:bg-surface-container-lowest transition-colors"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-space-md group-hover:scale-110 transition-transform">
                  <Icon name={r.icon} className="text-[32px]" />
                </div>
                <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-2">{r.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{r.text}</p>
              </div>
              <div className="mt-6 pt-4">
                <span className="font-label-spec text-label-spec text-primary font-bold">{r.foot}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

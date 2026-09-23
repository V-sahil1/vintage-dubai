import Icon from "../Icon";
import SectionHeading from "../SectionHeading";

const reviews = [
  {
    quote:
      "Flawless concierge service from start to finish. The Porsche 911 Turbo S arrived in concourse condition, exactly as presented. Registration and number plates were delivered to my villa within 24 hours.",
    name: "Tariq Al-Mansoor",
    meta: "Dubai Marina • Porsche 911 Turbo S",
  },
  {
    quote:
      "Absolute transparency. In Dubai, buying pre-owned exotics can be hit or miss, but the Vantage 160-point technical binder gave me complete confidence. Their team handled our trade-in seamlessly.",
    name: "Victoria Sterling",
    meta: "Palm Jumeirah • Range Rover Autobiography",
  },
  {
    quote:
      "Without question the best valuation in the UAE. Upgraded my G63 AMG to a Ferrari Roma in a single afternoon. True automotive connoisseurs who treat you like family.",
    name: "Dr. Rashid Khalid",
    meta: "Emirates Hills • Ferrari Roma",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-high">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <SectionHeading
          align="center"
          className="max-w-2xl mb-space-lg md:mb-space-xl"
          kicker="Reputation & Testimonials"
          title="Trusted by Drivers"
          text="Real experiences from Dubai's most distinguished collectors, executives, and motoring enthusiasts."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm md:gap-gutter lg:gap-space-lg">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="p-space-md md:p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-primary mb-space-sm md:mb-space-md" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" filled className="text-[16px] md:text-[20px]" />
                  ))}
                </div>
                <blockquote className="font-body-md text-body-sm md:text-body-md text-on-surface font-light italic leading-relaxed mb-space-md md:mb-space-lg">
                  “{r.quote}”
                </blockquote>
              </div>
              <figcaption>
                <p className="font-headline-sm text-body-md uppercase text-on-surface font-bold">{r.name}</p>
                <p className="font-label-spec text-label-spec text-primary">{r.meta}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

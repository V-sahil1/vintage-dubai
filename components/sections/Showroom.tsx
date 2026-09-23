import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import { site, whatsappLink } from "@/lib/site";

export default function Showroom({ bg = "bg-surface-container-lowest" }: { bg?: string }) {
  return (
    <section className={`w-full py-space-xl lg:py-24 ${bg}`} id="showroom">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
          <div className="lg:col-span-7">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl relative bg-surface-container">
              <Image
                src="/images/showroom-lounge.png"
                alt="VIP consultation lounge with leather chairs and marble table overlooking curated supercars inside the Sheikh Zayed Road showroom"
                fill
                sizes="(min-width:1024px) 58vw, 100vw"
                className="object-cover"
              />
              <div className="lg:hidden absolute bottom-3 left-3 bg-surface-container-lowest/80 backdrop-blur-md px-3 py-1 rounded-full text-on-surface font-label-badge text-[10px] uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> Showroom Open Today Until 10:00 PM
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-space-md">
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block">Dubai Flagship Destination</span>
            <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
              Visit Our Showroom
            </h2>
            <p className="font-body-md text-body-sm md:text-body-md text-secondary leading-relaxed">
              An architectural automotive sanctuary on Sheikh Zayed Road. Enjoy bespoke barista espresso, dedicated private
              consultation suites, and uninterrupted access to the Middle East&apos;s finest stable of motorcars.
            </p>
            <div className="space-y-space-sm pt-space-xs">
              {[
                {
                  icon: "location_on",
                  title: "Location",
                  text: "Sheikh Zayed Road, Al Quoz 1, Exit 43, Dubai, United Arab Emirates (Complimentary Valet Parking Available)",
                },
                { icon: "schedule", title: "Showroom Hours", text: "Monday through Sunday • 9:00 AM – 10:00 PM GST" },
                { icon: "call", title: "Direct Concierge", text: `${site.phoneDisplay} • ${site.email}` },
              ].map((row) => (
                <div key={row.title} className="flex items-start gap-space-sm">
                  <Icon name={row.icon} className="text-primary text-[22px] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-headline-sm text-body-sm text-on-surface font-bold uppercase">{row.title}</p>
                    <p className="font-body-sm text-body-sm text-secondary">{row.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map card (mobile design) */}
            <div className="lg:hidden w-full h-36 bg-surface-container-high rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
              <Image src="/images/m-map.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" />
              <a
                className="relative z-10 px-space-md py-2 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-badge text-label-badge uppercase flex items-center gap-1.5 hover:text-primary transition-colors shadow"
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="near_me" className="text-[16px] text-primary" />
                Open in Google Maps
              </a>
            </div>

            <div className="pt-space-sm grid grid-cols-2 sm:flex sm:flex-wrap gap-space-sm">
              <a
                className="text-center px-space-md sm:px-space-lg py-3 rounded-sm bg-primary text-on-primary font-headline-sm text-[12px] sm:text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary transition-all"
                href={site.maps}
                rel="noopener noreferrer"
                target="_blank"
              >
                Get GPS Directions
              </a>
              <Link
                className="text-center px-space-md sm:px-space-lg py-3 rounded-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-[12px] sm:text-body-sm uppercase tracking-wider transition-colors"
                href="/contact"
              >
                Contact Showroom Team
              </Link>
              <a
                className="sm:hidden col-span-2 h-11 bg-surface-container-high text-on-surface rounded-lg flex items-center justify-center gap-1.5 font-headline-sm text-[12px] uppercase font-semibold"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="chat" className="text-[18px] text-primary" />
                WhatsApp Lounge
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import Icon from "./Icon";
import { navLinks, site, whatsappLink } from "@/lib/site";

const socials = [
  { label: "Instagram", icon: "camera" },
  { label: "Facebook", icon: "public" },
  { label: "TikTok", icon: "play_circle" },
  { label: "YouTube", icon: "smart_display" },
];

const marques = ["Rolls-Royce", "Bugatti", "Ferrari", "Pagani", "Lamborghini", "Bentley"];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-variant/30 text-secondary pb-20 md:pb-0">
      <div className="w-full max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter lg:gap-space-xl mb-space-xl">
          <div className="lg:col-span-4 space-y-space-md">
            <div className="flex items-center gap-space-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="h-8 w-auto object-contain" src="/logo-mark.svg" />
              <span className="font-headline-md text-headline-md-mobile lg:text-headline-md tracking-wider uppercase text-on-surface">
                VANTAGE
              </span>
            </div>
            <p className="font-headline-sm text-body-lg text-primary tracking-wide">{site.tagline}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              The zenith of bespoke luxury and hypercar curation in the United Arab Emirates. Orchestrating exceptional
              acquisitions for the world&apos;s most discerning collectors.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs">
              {socials.map((s) => (
                <a
                  key={s.label}
                  aria-label={s.label}
                  href="#"
                  className="w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all"
                >
                  <Icon name={s.icon} className="text-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Dubai Flagship</h3>
            <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p className="text-on-surface font-medium">Sheikh Zayed Road, Exit 43</p>
              <p>Al Quoz Industrial Area 3</p>
              <p>PO Box 48291, Dubai, UAE</p>
            </div>
            <div className="pt-space-xs">
              <p className="font-label-badge text-label-badge uppercase text-primary tracking-widest mb-1">Showroom Hours</p>
              <p className="font-label-spec text-label-spec text-secondary">Monday – Sunday</p>
              <p className="font-label-spec text-label-spec text-on-surface font-bold">9:00 AM – 10:00 PM GST</p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Private Desk</h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm">
              <li className="text-on-surface-variant">
                Tel:{" "}
                <a className="hover:text-primary transition-colors text-on-surface font-label-spec" href={site.phoneHref}>
                  {site.phoneFull}
                </a>
              </li>
              <li className="text-on-surface-variant">
                Concierge:{" "}
                <a className="hover:text-primary transition-colors text-on-surface" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </li>
              <li className="text-on-surface-variant">
                WhatsApp:{" "}
                <a
                  className="hover:text-primary transition-colors text-primary font-medium"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instant Broker Desk
                </a>
              </li>
              {navLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-on-surface-variant hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wider">Marque Verification</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Authorized inspection and global provenance validation across elite performance marques.
            </p>
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              {marques.map((m) => (
                <span
                  key={m}
                  className="px-space-sm py-1 rounded-sm bg-surface-container border border-surface-variant/40 font-label-badge text-[10px] text-secondary tracking-widest uppercase"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-surface-variant/20 pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-spec text-[12px] text-outline text-center md:text-left">
          <p>© 2025 VANTAGE MOTORS FZ-LLC. All rights reserved. Registered under Dubai Economy and Tourism.</p>
          <div className="flex items-center gap-space-md">
            <Link className="hover:text-on-surface transition-colors" href="/about-us">
              Privacy Policy
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="/about-us">
              Terms of Brokerage
            </Link>
            <Link className="hover:text-on-surface transition-colors" href="/used-cars">
              Provenance Audit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

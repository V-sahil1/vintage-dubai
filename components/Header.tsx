"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { navLinks, site, whatsappLink } from "@/lib/site";

export function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(path + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-variant/30 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="h-16 lg:h-20 w-full max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-11 h-11 -ml-2 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          >
            <Icon name={open ? "close" : "menu"} className="text-[24px]" />
          </button>
          <Logo />
        </div>

        <nav className="hidden xl:flex items-center gap-space-lg" aria-label="Main">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`font-body-sm text-body-sm tracking-wider uppercase transition-colors py-2 ${
                  active ? "text-primary font-semibold" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-space-xs lg:gap-space-md">
          <a
            className="hidden 2xl:flex items-center gap-space-xs px-space-sm py-2 rounded-sm bg-surface-container/60 hover:bg-surface-container-high transition-colors text-secondary"
            href={site.phoneHref}
          >
            <Icon name="call" className="text-[16px] text-primary" />
            <span className="font-label-spec text-label-spec text-secondary tracking-widest">{site.phoneDisplay}</span>
          </a>
          <a
            aria-label="WhatsApp Concierge"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden w-11 h-11 flex items-center justify-center text-primary hover:text-primary-fixed transition-colors"
          >
            <Icon name="chat" className="text-[22px]" />
          </a>
          <a
            aria-label="Call Concierge"
            href={site.phoneHref}
            className="sm:hidden w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
          >
            <Icon name="call" className="text-[22px]" />
          </a>
          <Link
            href="/book-a-test-drive"
            className="hidden sm:inline-flex items-center justify-center px-space-md py-2.5 rounded-sm bg-primary-container text-on-primary-container font-headline-sm text-body-sm font-semibold tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:bg-primary transition-all duration-300"
          >
            Book a Test Drive
          </Link>
          <Link
            href="/contact"
            aria-label="Private client desk"
            className="w-8 h-8 ml-space-xs lg:ml-0 rounded-full bg-primary flex items-center justify-center hover:bg-tertiary transition-colors"
          >
            <Icon name="person" className="text-on-primary text-[18px]" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="hidden md:inline-flex xl:hidden p-2 rounded-sm bg-surface-container text-on-surface hover:text-primary transition-colors"
          >
            <Icon name={open ? "close" : "menu"} className="text-[24px]" />
          </button>
        </div>
      </div>

      {/* Mobile / tablet navigation drawer */}
      {open && (
        <div className="xl:hidden fixed inset-x-0 top-16 lg:top-20 bottom-0 bg-surface-container-lowest/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
          <nav className="max-w-[1600px] mx-auto px-margin-mobile lg:px-margin py-space-lg flex flex-col" aria-label="Mobile">
            {navLinks.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-4 border-b border-surface-variant/40 font-headline-sm text-[20px] uppercase tracking-wide transition-colors ${
                    active ? "text-primary" : "text-on-surface hover:text-primary"
                  }`}
                >
                  {l.label}
                  <Icon name="east" className="text-[18px] text-primary" />
                </Link>
              );
            })}
            <Link
              href="/book-a-test-drive"
              className="mt-space-lg h-12 flex items-center justify-center gap-space-xs rounded-lg bg-primary text-on-primary font-headline-sm text-[14px] font-bold uppercase tracking-wider"
            >
              <Icon name="key" className="text-[18px]" />
              Book a Test Drive
            </Link>
            <div className="mt-space-md grid grid-cols-2 gap-space-sm">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-lg bg-surface-container-high flex items-center justify-center gap-1.5 font-headline-sm text-[12px] uppercase font-semibold"
              >
                <Icon name="chat" className="text-[18px] text-primary" /> WhatsApp
              </a>
              <a
                href={site.phoneHref}
                className="h-11 rounded-lg bg-surface-container-high flex items-center justify-center gap-1.5 font-headline-sm text-[12px] uppercase font-semibold"
              >
                <Icon name="phone_in_talk" className="text-[18px] text-primary" /> Private Line
              </a>
            </div>
            <p className="mt-space-lg font-label-spec text-label-spec text-outline">{site.phoneDisplay} • {site.email}</p>
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { tabLinks } from "@/lib/site";

export default function MobileTabBar() {
  const pathname = usePathname();
  // "Stock" and "Filter" share /inventory; highlight Stock only.
  const activeHref =
    tabLinks.find((t) => !t.href.includes("#") && (pathname === t.href || pathname.startsWith(t.href + "/")))?.href ?? "";

  return (
    <nav
      aria-label="Quick navigation"
      className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.5)]"
    >
      <div className="flex justify-between items-center h-16 px-gutter-mobile">
        {tabLinks.map((t) => {
          const active = t.href === activeHref;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] h-11 transition-colors ${
                active ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <Icon name={t.icon} className="text-[22px]" />
              <span className="font-label-badge text-[10px] tracking-wide uppercase mt-space-xs">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

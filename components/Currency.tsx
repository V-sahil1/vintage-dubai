"use client";

import { createContext, useContext, useState } from "react";

export type Currency = "AED" | "USD" | "EUR";

const RATES: Record<Currency, number> = { AED: 1, USD: 0.2723, EUR: 0.2335 };
const SYMBOL: Record<Currency, string> = { AED: "AED ", USD: "$", EUR: "€" };

const CurrencyContext = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({
  currency: "AED",
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("AED");
  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);

export function formatPrice(aed: number, currency: Currency) {
  if (currency === "AED") return `AED ${aed.toLocaleString("en-US")}`;
  const converted = Math.round((aed * RATES[currency]) / 100) * 100;
  return `${SYMBOL[currency]}${converted.toLocaleString("en-US")}`;
}

/** Primary price in the selected currency. */
export function Price({ aed, className }: { aed: number; className?: string }) {
  const { currency } = useCurrency();
  return <span className={className}>{formatPrice(aed, currency)}</span>;
}

/** Secondary "approximately" line shown under prices. */
export function PriceAlt({ aed, className }: { aed: number; className?: string }) {
  const { currency } = useCurrency();
  const text = currency === "AED" ? `~ ${formatPrice(aed, "USD")} USD` : `~ ${formatPrice(aed, "AED")}`;
  return <span className={className}>{text}</span>;
}

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="flex items-center gap-space-sm">
      <span className="font-label-spec text-label-spec text-outline uppercase tracking-wider">Currency:</span>
      {(["AED", "USD", "EUR"] as Currency[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          className={`px-2.5 py-1 rounded-lg font-label-badge text-[12px] transition-colors ${
            currency === c
              ? "bg-surface-container-high text-primary font-bold"
              : "bg-surface-container text-outline hover:text-on-surface"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

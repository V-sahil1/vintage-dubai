"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";

const FLAT_RATE = 0.0299;
const aed = (n: number) => `AED ${Math.round(n).toLocaleString("en-US")}`;

export default function Finance() {
  const [price, setPrice] = useState(500000);
  const [downPct, setDownPct] = useState(20);
  const [tenure, setTenure] = useState(48);

  const down = (price * downPct) / 100;
  const principal = price - down;
  const emi = (principal + principal * FLAT_RATE * (tenure / 12)) / tenure;

  const range = "w-full accent-primary h-2 bg-surface-container-high rounded cursor-pointer";

  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container" id="finance">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">
          <div className="lg:col-span-6 space-y-space-md">
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block">
              Flexible Bespoke Leasing &amp; Finance
            </span>
            <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
              Make Your Next Drive More Accessible
            </h2>
            <p className="font-body-lg text-body-sm md:text-body-lg text-secondary font-light leading-relaxed">
              Acquire your dream vehicle with tailored structuring designed around your liquidity preferences. Our dedicated
              finance bureau coordinates directly with leading UAE tier-1 banking institutions.
            </p>
            <div className="pt-space-xs">
              <span className="font-label-badge text-label-badge uppercase tracking-widest text-outline block mb-3">
                Preferred Banking Partners
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                {["Emirates NBD", "ADCB", "First Abu Dhabi", "Dubai Islamic"].map((b) => (
                  <div
                    key={b}
                    className="p-3 rounded bg-surface-container-lowest text-center font-headline-sm text-body-sm text-secondary font-semibold"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-space-sm flex flex-wrap gap-space-sm md:gap-space-md">
              <Link
                className="px-space-lg py-3 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary transition-all"
                href="/contact?interest=finance"
              >
                Explore Finance Options
              </Link>
              <a
                className="px-space-lg py-3 rounded-sm bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-headline-sm text-body-sm uppercase tracking-wider transition-colors"
                href={site.phoneHref}
              >
                Speak With a Broker
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg lg:p-space-xl shadow-xl">
            <div className="flex items-center justify-between gap-space-sm mb-space-md">
              <h3 className="font-headline-sm text-[18px] sm:text-headline-sm uppercase text-on-surface">Monthly Payment Estimator</h3>
              <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-label-badge text-label-badge uppercase font-bold whitespace-nowrap">
                Rates from 2.99%
              </span>
            </div>
            <div className="space-y-space-md">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="calc-price" className="font-label-badge text-label-badge uppercase text-outline">
                    Vehicle Price (AED)
                  </label>
                  <span className="font-label-spec text-label-spec text-primary font-bold">{aed(price)}</span>
                </div>
                <input
                  id="calc-price"
                  className={range}
                  type="range"
                  min={150000}
                  max={2500000}
                  step={25000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="calc-down" className="font-label-badge text-label-badge uppercase text-outline">
                    Down Payment ({downPct}%)
                  </label>
                  <span className="font-label-spec text-label-spec text-on-surface font-semibold">
                    {aed(down)} ({downPct}%)
                  </span>
                </div>
                <input
                  id="calc-down"
                  className={range}
                  type="range"
                  min={0}
                  max={50}
                  step={5}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="calc-tenure" className="font-label-badge text-label-badge uppercase text-outline">
                    Tenure Duration
                  </label>
                  <span className="font-label-spec text-label-spec text-on-surface font-semibold">
                    {tenure} Months ({tenure / 12} {tenure === 12 ? "Year" : "Years"})
                  </span>
                </div>
                {/* Slider on larger screens, tap targets on mobile (per mobile design) */}
                <input
                  id="calc-tenure"
                  className={`${range} hidden sm:block`}
                  type="range"
                  min={12}
                  max={60}
                  step={12}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <div className="grid grid-cols-4 gap-space-xs pt-1 sm:hidden" role="group" aria-label="Tenure">
                  {[24, 36, 48, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenure(m)}
                      aria-pressed={tenure === m}
                      className={`py-1.5 rounded font-label-badge text-[11px] ${
                        tenure === m ? "bg-primary text-on-primary font-bold" : "bg-surface-container-high text-on-surface"
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-space-md rounded-lg bg-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm mt-4">
                <div>
                  <span className="font-label-badge text-[11px] text-outline uppercase block">Estimated Monthly Installment</span>
                  <span className="font-display-xl text-[30px] leading-[38px] sm:text-[36px] sm:leading-[44px] text-primary font-bold" aria-live="polite">
                    {aed(emi)}
                  </span>
                  <span className="font-body-sm text-[12px] text-secondary block mt-0.5">
                    *Indicative rate based on 2.99% flat p.a. terms
                  </span>
                </div>
                <Link
                  className="px-4 py-2.5 rounded bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary transition-all whitespace-nowrap"
                  href="/contact?interest=finance"
                >
                  Apply Pre-Approval
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

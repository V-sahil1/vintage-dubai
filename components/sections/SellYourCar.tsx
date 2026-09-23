"use client";

import { useState } from "react";
import Icon from "../Icon";
import { FormField, SuccessNote, inputCls } from "../forms";
import { site, whatsappLink } from "@/lib/site";

const marques = [
  "Porsche",
  "Land Rover / Range Rover",
  "Mercedes-Benz / AMG",
  "BMW / M Performance",
  "Ferrari",
  "Rolls-Royce",
  "Lamborghini",
  "Bentley",
  "Other Exotic / Luxury",
];
const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018 or Earlier"];
const specs = ["Official GCC Spec", "North American (US)", "European Spec", "Japanese Spec"];

export default function SellYourCar() {
  const [sent, setSent] = useState(false);
  const bed = `${inputCls} bg-surface-container-lowest`;

  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-lowest relative" id="sell">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="rounded-2xl bg-surface-container-low shadow-xl p-space-md sm:p-space-lg lg:p-space-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center relative">
            <div className="lg:col-span-5 space-y-space-md">
              <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary flex items-center gap-1">
                <Icon name="price_change" className="text-[16px] md:hidden" /> Instant Marque Appraisal
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
                Thinking About Selling Your Car?
              </h2>
              <p className="font-body-lg text-body-sm md:text-body-lg text-secondary font-light">
                Receive a complimentary, transparent market valuation and competitive same-day settlement offer or trade-in
                credit toward your next acquisition.
              </p>
              <div className="space-y-space-xs pt-space-xs">
                {[
                  "Immediate bank transfer upon vehicle clearance",
                  "Complete RTA deregistration and paperwork handled on-site",
                  "Existing bank loan settlement directly facilitated",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-space-xs text-body-sm text-on-surface">
                    <Icon name="check_circle" className="text-primary text-[20px]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="pt-space-sm">
                <a
                  className="inline-flex items-center gap-2 text-primary font-headline-sm text-body-sm md:text-body-md uppercase tracking-wider hover:underline"
                  href={whatsappLink("Sell My Car Valuation")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="chat" className="text-[20px]" />
                  <span>Or Request Instant WhatsApp Appraisal ({site.phoneDisplay})</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-surface-container rounded-xl p-space-md lg:p-space-lg shadow-md">
              <h3 className="font-headline-sm text-headline-sm uppercase text-on-surface mb-space-md">Vehicle Details for Appraisal</h3>
              {sent ? (
                <div className="space-y-space-sm">
                  <SuccessNote
                    title="Indicative Estimate Generated"
                    text="Your valuation request has been submitted. A senior appraiser will contact you in under 15 minutes."
                    onReset={() => setSent(false)}
                  />
                </div>
              ) : (
                <form
                  className="space-y-space-md"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <FormField label="Marque / Brand *" htmlFor="sell-marque">
                      <select id="sell-marque" required defaultValue="" className={bed}>
                        <option value="" disabled>
                          Select Marque
                        </option>
                        {marques.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Model / Series *" htmlFor="sell-model">
                      <input id="sell-model" className={bed} placeholder="e.g. 911 GT3, G63 AMG" required type="text" />
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <FormField label="Model Year *" htmlFor="sell-year">
                      <select id="sell-year" className={bed}>
                        {years.map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Mileage (KM) *" htmlFor="sell-km">
                      <input id="sell-km" className={bed} placeholder="e.g. 15,000" required type="text" inputMode="numeric" />
                    </FormField>
                    <FormField label="Specification *" htmlFor="sell-spec">
                      <select id="sell-spec" className={bed}>
                        {specs.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <FormField label="Your Name *" htmlFor="sell-name">
                      <input id="sell-name" className={bed} placeholder="Your full name" required type="text" autoComplete="name" />
                    </FormField>
                    <FormField label="UAE Phone / WhatsApp *" htmlFor="sell-phone">
                      <input id="sell-phone" className={bed} placeholder="+971 50 000 0000" required type="tel" autoComplete="tel" />
                    </FormField>
                  </div>
                  <button
                    className="w-full h-14 mt-2 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-widest hover:bg-tertiary active:scale-95 transition-all shadow-md"
                    type="submit"
                  >
                    Get My Valuation in 15 Minutes →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

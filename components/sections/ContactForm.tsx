"use client";

import { useState } from "react";
import { FormField, SuccessNote, inputCls } from "../forms";
import { vehicles } from "@/lib/vehicles";

type Props = {
  mode?: "inquiry" | "test-drive";
  defaultInterest?: string;
  bg?: string;
};

export default function ContactForm({ mode = "inquiry", defaultInterest = "general", bg = "bg-surface-container" }: Props) {
  const [sent, setSent] = useState(false);
  const testDrive = mode === "test-drive";
  const field = `${inputCls} bg-surface-container`;

  return (
    <section className={`w-full py-space-xl lg:py-28 ${bg} relative`} id={testDrive ? "booking" : "contact"}>
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="max-w-4xl mx-auto rounded-2xl bg-surface-container-lowest p-space-md sm:p-space-lg lg:p-space-xl shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-space-lg md:mb-space-xl">
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block mb-1">
              {testDrive ? "White-Glove Test Experience" : "Private Consultation Desk"}
            </span>
            <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
              {testDrive ? "Book a Private Test Drive" : "Let's Find Your Next Car"}
            </h2>
            <p className="font-body-md text-body-sm md:text-body-md text-secondary mt-1">
              {testDrive
                ? "We deliver the vehicle with an accredited technical specialist directly to your villa, office, or our Sheikh Zayed Road lounge."
                : "Our senior automotive advisors stand ready to tailor a bespoke acquisition or test drive experience."}
            </p>
          </div>

          {sent ? (
            <SuccessNote
              title={testDrive ? "Test Drive Requested" : "Inquiry Received"}
              text={
                testDrive
                  ? "Your private test drive request is confirmed. A Vantage concierge will call to lock in your slot within 30 minutes."
                  : "Inquiry received. A dedicated Vantage concierge will respond to you within 30 minutes."
              }
              onReset={() => setSent(false)}
            />
          ) : (
            <form
              className="space-y-space-md"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <FormField label="Full Name *" htmlFor="c-name">
                  <input id="c-name" className={field} placeholder="e.g. Tariq Al-Hashimi" required type="text" autoComplete="name" />
                </FormField>
                <FormField label="Contact Phone / WhatsApp *" htmlFor="c-phone">
                  <input id="c-phone" className={field} placeholder="+971 50 123 4567" required type="tel" autoComplete="tel" />
                </FormField>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <FormField label="Email Address *" htmlFor="c-email">
                  <input id="c-email" className={field} placeholder="name@domain.com" required type="email" autoComplete="email" />
                </FormField>
                <FormField label={testDrive ? "Vehicle to Drive *" : "Interested In"} htmlFor="c-interest">
                  <select id="c-interest" className={field} defaultValue={defaultInterest} required={testDrive}>
                    <option value="general">{testDrive ? "Select a vehicle" : "General Showroom Inquiry"}</option>
                    {vehicles.map((v) => (
                      <option key={v.slug} value={v.slug}>
                        {v.name} (AED {v.price.toLocaleString("en-US")})
                      </option>
                    ))}
                    <option value="finance">Finance &amp; Leasing Pre-Approval</option>
                    <option value="sourcing">Bespoke Commission / Sourcing Request</option>
                  </select>
                </FormField>
              </div>
              {testDrive && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <FormField label="Preferred Date *" htmlFor="c-date">
                    <input id="c-date" className={`${field} [color-scheme:dark]`} required type="date" />
                  </FormField>
                  <FormField label="Preferred Time" htmlFor="c-time">
                    <select id="c-time" className={field}>
                      <option>Morning (9 AM – 12 PM)</option>
                      <option>Afternoon (12 PM – 5 PM)</option>
                      <option>Evening (5 PM – 10 PM)</option>
                    </select>
                  </FormField>
                  <FormField label="Location" htmlFor="c-location">
                    <select id="c-location" className={field}>
                      <option>Sheikh Zayed Road Lounge</option>
                      <option>Doorstep – Residence / Villa</option>
                      <option>Doorstep – Office</option>
                    </select>
                  </FormField>
                </div>
              )}
              <FormField label="Message / Specific Requirements" htmlFor="c-message">
                <textarea
                  id="c-message"
                  className="w-full bg-surface-container p-4 text-on-surface placeholder:text-outline text-body-sm rounded-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary-container/60 transition-colors"
                  placeholder="Detail any specific options, timing, or private viewing preferences..."
                  rows={4}
                />
              </FormField>
              <div className="flex items-start sm:items-center gap-space-sm pt-1">
                <input className="w-4 h-4 mt-0.5 sm:mt-0 rounded accent-primary bg-surface-container border-none cursor-pointer" id="trade-in-check" type="checkbox" />
                <label className="font-body-sm text-body-sm text-secondary cursor-pointer" htmlFor="trade-in-check">
                  I am also interested in evaluating a trade-in vehicle or bank financing package.
                </label>
              </div>
              <button
                className="w-full h-14 mt-4 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-widest hover:bg-tertiary active:scale-95 transition-all shadow-md"
                type="submit"
              >
                {testDrive ? "Confirm Test Drive Request →" : "Transmit Inquiry to VIP Desk →"}
              </button>
            </form>
          )}

          <div className="mt-space-lg pt-space-md border-t border-surface-variant/20 flex flex-wrap items-center justify-center md:justify-between gap-space-sm font-label-spec text-[12px] md:text-label-spec text-outline text-center">
            <span>Official RTA Verified Licensed Broker</span>
            <span>Encrypted Private Communication</span>
            <span>Response Guaranteed &lt; 30 Mins</span>
          </div>
        </div>
      </div>
    </section>
  );
}

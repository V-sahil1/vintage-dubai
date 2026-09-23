"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { bodyOptions, defaultFilters, makeOptions, modelOptions, priceOptions, type Filters } from "@/lib/vehicles";

type Option = { value: string; label: string };

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (v: string) => void;
}) {
  const id = `search-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-label-badge text-label-badge uppercase tracking-widest text-outline">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 bg-surface-container-lowest px-4 py-2 pr-10 text-on-surface text-body-sm font-medium rounded-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary-container/60 transition-colors appearance-none cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="expand_more" className="absolute right-3 top-3 text-secondary pointer-events-none text-[18px]" />
      </div>
    </div>
  );
}

export function toQuery(f: Partial<Filters>) {
  const params = new URLSearchParams();
  (Object.keys(f) as (keyof Filters)[]).forEach((k) => {
    const v = f[k];
    if (v && v !== "all") params.set(k, v);
  });
  const s = params.toString();
  return s ? `?${s}` : "";
}

/**
 * Desktop search bar from the hero. When `onSearch` is provided (inventory page) it filters in place;
 * otherwise it navigates to /inventory with the chosen filters.
 */
export default function SearchPanel({
  initial = defaultFilters,
  onSearch,
  className = "",
  buttonLabel = "Search 84 Cars",
}: {
  initial?: Filters;
  onSearch?: (f: Filters) => void;
  className?: string;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const [f, setF] = useState<Filters>(initial);
  const set = (k: keyof Filters) => (v: string) => {
    const next = { ...f, [k]: v };
    setF(next);
    onSearch?.(next);
  };

  return (
    <form
      className={`w-full rounded-xl bg-surface-container-low/90 backdrop-blur-2xl shadow-xl p-space-md lg:p-space-lg text-left ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearch) onSearch(f);
        else router.push(`/inventory${toQuery(f)}#results`);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-md items-end">
        <Field label="Make / Marque" value={f.make} options={makeOptions} onChange={set("make")} />
        <Field label="Model / Series" value={f.model} options={modelOptions} onChange={set("model")} />
        <Field label="Price Range (AED)" value={f.price} options={priceOptions} onChange={set("price")} />
        <Field label="Body Architecture" value={f.body} options={bodyOptions} onChange={set("body")} />
        <button
          type="submit"
          className="h-12 w-full flex items-center justify-center gap-space-xs px-space-md rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase tracking-widest font-bold hover:bg-tertiary active:scale-95 transition-all shadow-md"
        >
          <Icon name="search" className="text-[20px]" />
          <span>{buttonLabel}</span>
        </button>
      </div>
    </form>
  );
}

/** Compact "Precision Search" capsule from the mobile design. */
export function MobileSearchCapsule() {
  const router = useRouter();
  const [make, setMake] = useState("all");
  const [price, setPrice] = useState("all");

  return (
    <form
      className="bg-surface-container-high/95 backdrop-blur-xl rounded-xl p-space-md shadow-xl flex flex-col gap-space-sm"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/inventory${toQuery({ make, price })}#results`);
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary flex items-center gap-1">
          <Icon name="tune" className="text-[16px]" /> Precision Search
        </span>
        <span className="font-label-spec text-[11px] text-on-surface-variant">84 Vehicles Available</span>
      </div>
      <div className="grid grid-cols-2 gap-space-xs">
        <label className="bg-surface-container-low rounded-lg p-space-xs flex flex-col">
          <span className="font-label-badge text-[9px] uppercase text-on-surface-variant/70">Marque</span>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="bg-transparent text-on-surface font-body-sm text-body-sm focus:outline-none cursor-pointer"
          >
            {makeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.value === "all" ? "All Marques" : o.label.replace(/ \(\d+\)/, "")}
              </option>
            ))}
          </select>
        </label>
        <label className="bg-surface-container-low rounded-lg p-space-xs flex flex-col">
          <span className="font-label-badge text-[9px] uppercase text-on-surface-variant/70">Budget</span>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-transparent text-on-surface font-body-sm text-body-sm focus:outline-none cursor-pointer"
          >
            {priceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.value === "all" ? "Any Budget" : o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        type="submit"
        className="w-full h-11 bg-primary text-on-primary font-headline-sm text-[13px] font-bold tracking-widest uppercase rounded-lg flex items-center justify-center gap-space-xs hover:bg-primary-fixed transition-colors active:scale-[0.99]"
      >
        <Icon name="search" className="text-[18px]" />
        Explore Current Vault
      </button>
    </form>
  );
}

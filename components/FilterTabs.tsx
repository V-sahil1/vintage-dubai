"use client";

import { inventoryTabs } from "@/lib/vehicles";

export default function FilterTabs({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  return (
    <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-lg md:mb-space-xl scrollbar-none -mx-gutter-mobile px-gutter-mobile md:mx-0 md:px-0">
      {inventoryTabs.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            aria-pressed={active}
            className={`px-space-md py-1.5 md:py-2 rounded-full md:rounded-sm font-label-spec text-label-badge md:text-body-sm uppercase tracking-wider whitespace-nowrap transition-colors shrink-0 ${
              active
                ? "bg-primary text-on-primary font-semibold shadow-sm"
                : "bg-surface-container hover:bg-surface-container-high text-secondary hover:text-on-surface"
            }`}
          >
            {t.label} <span className="hidden md:inline">({t.count})</span>
          </button>
        );
      })}
    </div>
  );
}

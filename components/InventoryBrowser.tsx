"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FilterTabs from "./FilterTabs";
import SearchPanel, { toQuery } from "./SearchPanel";
import { CurrencySwitcher } from "./Currency";
import { EmptyState } from "./InventoryShowcase";
import { VehicleCard } from "./VehicleCard";
import { defaultFilters, filterVehicles, vehicles, type Filters } from "@/lib/vehicles";

/** Full inventory listing with search bar + tabs, kept in sync with the URL. */
export default function InventoryBrowser({
  initial,
  basePath = "/inventory",
  showSearch = true,
}: {
  initial: Filters;
  basePath?: string;
  showSearch?: boolean;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters>(initial);
  const [searchKey, setSearchKey] = useState(0);
  const list = filterVehicles(vehicles, filters);

  const update = (next: Filters) => {
    setFilters(next);
    router.replace(`${basePath}${toQuery(next)}`, { scroll: false });
  };

  const reset = () => {
    update({ ...defaultFilters, type: initial.type === "preowned" && basePath === "/used-cars" ? "preowned" : "all" });
    setSearchKey((k) => k + 1);
  };

  return (
    <div>
      {showSearch && (
        <div id="search" className="scroll-mt-24">
          <SearchPanel
            key={searchKey}
            initial={filters}
            onSearch={(f) => update({ ...f, type: filters.type })}
            className="mb-space-xl"
            buttonLabel="Refine Search"
          />
        </div>
      )}

      <div id="results" className="scroll-mt-24 flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md">
        <p className="font-label-spec text-label-spec text-secondary uppercase tracking-wider">
          Showing <span className="text-primary font-bold">{list.length}</span> featured of 84 vehicles
        </p>
        <CurrencySwitcher />
      </div>

      <FilterTabs value={filters.type} onChange={(type) => update({ ...filters, type })} />

      {list.length === 0 ? (
        <EmptyState onReset={reset} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-space-lg">
          {list.map((v) => (
            <VehicleCard key={v.slug} v={v} />
          ))}
        </div>
      )}
    </div>
  );
}

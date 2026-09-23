import { defaultFilters, type Filters } from "./vehicles";

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function readFilters(searchParams: SearchParams, overrides: Partial<Filters> = {}): Promise<Filters> {
  const sp = await searchParams;
  const pick = (k: keyof Filters) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v) || undefined;
  };
  return {
    type: pick("type") ?? overrides.type ?? defaultFilters.type,
    make: pick("make") ?? overrides.make ?? defaultFilters.make,
    model: pick("model") ?? overrides.model ?? defaultFilters.model,
    price: pick("price") ?? overrides.price ?? defaultFilters.price,
    body: pick("body") ?? overrides.body ?? defaultFilters.body,
  };
}

export const filtersKey = (f: Filters) => Object.values(f).join("|");

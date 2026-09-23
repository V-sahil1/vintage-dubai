import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-gutter-mobile py-space-xl text-center">
      <div className="max-w-xl flex flex-col items-center gap-space-md">
        <Icon name="explore_off" className="text-[48px] text-primary" />
        <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary">Error 404</span>
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase text-on-surface tracking-tight">
          This Route Is Off the Map
        </h1>
        <p className="font-body-md text-body-md text-secondary">
          The page or vehicle you are looking for has left the showroom floor.
        </p>
        <div className="flex flex-wrap justify-center gap-space-sm">
          <Link href="/" className="px-space-lg py-3 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm uppercase font-bold tracking-wider hover:bg-tertiary">
            Back to Home
          </Link>
          <Link href="/inventory" className="px-space-lg py-3 rounded-sm bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-body-sm uppercase tracking-wider">
            View Inventory
          </Link>
        </div>
      </div>
    </section>
  );
}

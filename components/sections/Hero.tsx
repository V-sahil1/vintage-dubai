import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon";
import SearchPanel, { MobileSearchCapsule } from "../SearchPanel";

export default function Hero() {
  return (
    <>
      {/* Mobile hero (mobile showroom design) */}
      <section className="md:hidden relative w-full overflow-hidden bg-surface-container-lowest -mt-16">
        <div className="relative w-full h-[520px] pt-16 flex flex-col justify-end p-margin-mobile">
          <Image
            src="/images/hero-showroom.png"
            alt="Cinematic luxury supercar showroom on Sheikh Zayed Road at twilight with the Dubai skyline"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-space-sm mb-space-lg">
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded bg-surface-container/90 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-label-badge text-label-badge uppercase tracking-widest text-primary">
                Dubai Curation • GCC Specs
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight uppercase">
              Find the Car That <span className="text-primary italic font-normal">Defines You.</span>
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm line-clamp-2">
              Curated portfolio of bespoke supercars, verified pre-owned marques, and white-glove doorstep delivery across
              the Emirates.
            </p>
            <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
              <a
                className="h-12 flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-[14px] font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all active:scale-[0.98]"
                href="#inventory"
              >
                <Icon name="electric_car" className="text-[18px]" />
                Collection
              </a>
              <Link
                className="h-12 flex items-center justify-center gap-space-xs bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-sm text-[14px] font-medium uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-[0.98]"
                href="/book-a-test-drive"
              >
                <Icon name="speed" className="text-[18px] text-primary" />
                Test Drive
              </Link>
            </div>
          </div>
        </div>
        <div className="px-margin-mobile -mt-6 relative z-20">
          <MobileSearchCapsule />
        </div>
      </section>

      {/* Tablet / desktop hero */}
      <section className="hidden md:flex relative w-full -mt-16 lg:-mt-20 overflow-hidden min-h-[820px] lg:min-h-[920px] items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-showroom.png"
            alt="Vantage Motors flagship showroom on Sheikh Zayed Road overlooking the Dubai skyline at twilight"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 motion-safe:animate-pulse [animation-duration:12s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/65 to-surface/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/10 via-surface-container-lowest/60 to-surface-container-lowest" />
        </div>
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-gutter lg:px-margin pt-36 pb-28 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-highest/60 backdrop-blur-xl mb-space-lg shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="w-2 h-2 rounded-full bg-primary -ml-2.5" />
            <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary">
              Premium Automotive Dealership • Sheikh Zayed Road, Dubai
            </span>
          </div>
          <h1 className="font-display-xl text-display-xl-mobile lg:text-display-xl max-w-5xl tracking-tight text-on-surface uppercase mb-space-md drop-shadow-lg">
            Find the Car That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-primary-container">
              Defines You
            </span>
            .
          </h1>
          <p className="font-body-lg text-body-lg max-w-2xl text-on-surface-variant font-light mb-space-xl leading-relaxed">
            Explore an uncompromising sanctuary of bespoke luxury, verified hypercars, and certified GCC-specification
            performance icons with white-glove concierge delivery across the Emirates.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-md mb-space-xl">
            <a
              className="inline-flex items-center justify-center gap-space-xs px-space-xl py-4 rounded-sm bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary-container font-headline-sm text-body-md font-bold uppercase tracking-wider shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all duration-300"
              href="#inventory"
            >
              <span>Explore Collection</span>
              <Icon name="arrow_downward" className="text-[20px]" />
            </a>
            <Link
              className="inline-flex items-center justify-center gap-space-xs px-space-xl py-4 rounded-sm bg-surface-container/70 backdrop-blur-md text-on-surface font-headline-sm text-body-md font-semibold uppercase tracking-wider hover:bg-surface-container-high hover:text-primary transition-all duration-300"
              href="/book-a-test-drive"
            >
              <Icon name="key" className="text-[20px] text-primary" />
              <span>Book a Test Drive</span>
            </Link>
          </div>
          <SearchPanel className="max-w-6xl mt-4" />
        </div>
      </section>
    </>
  );
}

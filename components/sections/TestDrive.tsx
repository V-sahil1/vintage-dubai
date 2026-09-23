import Image from "next/image";
import Link from "next/link";

export default function TestDrive({ ctaHref = "/book-a-test-drive#booking" }: { ctaHref?: string }) {
  return (
    <section className="w-full py-space-xl lg:py-24 bg-surface-container-lowest relative overflow-hidden" id="test-drive">
      <div className="max-w-[1600px] mx-auto px-gutter-mobile lg:px-margin">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl p-space-lg py-space-xl lg:p-20 text-center flex flex-col items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/test-drive-road.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-surface-container-lowest/85 backdrop-blur-sm" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-space-md">
            <span className="font-label-badge text-label-badge uppercase tracking-[0.3em] text-primary block">Unrestricted Evaluation</span>
            <h2 className="font-display-xl text-headline-lg-mobile sm:text-headline-lg lg:text-display-xl font-bold uppercase text-on-surface tracking-tight">
              Experience It Before You Own It
            </h2>
            <p className="font-body-lg text-body-sm sm:text-body-lg text-on-surface-variant font-light max-w-2xl mx-auto leading-relaxed">
              Schedule a private, unaccompanied test drive on Dubai&apos;s open asphalt or request our VIP enclosed trailer to
              deliver the vehicle directly to your doorstep.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-md">
              <Link
                className="px-space-lg sm:px-space-xl py-4 rounded-sm bg-primary text-on-primary font-headline-sm text-body-sm sm:text-body-md uppercase font-bold tracking-widest hover:bg-tertiary shadow-lg hover:shadow-primary/30 transition-all"
                href={ctaHref}
              >
                Book a Private Test Drive →
              </Link>
              <div className="flex items-center gap-2 px-space-md py-3 rounded-sm bg-surface-container/70 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="font-label-spec text-label-spec text-secondary uppercase">Same-Day Slots Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

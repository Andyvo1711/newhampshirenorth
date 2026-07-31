import SafeImage from "@/components/SafeImage";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=2400&q=80";

interface ColdOpenProps {
  storyCount: number;
}

export default function ColdOpen({ storyCount }: ColdOpenProps) {
  return (
    <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-night" aria-label="New Hampshire North introduction">
      <div className="frost-zoom absolute inset-0">
        <SafeImage
          src={HERO_IMAGE}
          alt="The White Mountains of New Hampshire at blue hour, snow-covered peaks under a fading winter sky"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/35 to-night/15" aria-hidden="true" />

      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-between px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="fade-in-up flex items-start justify-between">
          <p className="mono-label text-[11px] text-frost/80">45&deg; NORTH</p>
          <p className="mono-label hidden text-[11px] text-frost/70 sm:block">A Journal of the Granite State</p>
        </div>

        <div className="fade-in-up flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-serif text-lg leading-none text-frost/90 sm:text-xl">NEW HAMPSHIRE</p>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] text-frost sm:text-7xl lg:text-8xl">
              NORTH
            </h1>
            <p className="mt-8 font-serif text-2xl italic leading-snug text-frost sm:text-3xl">
              The weather changes fast.
              <br />
              The facts should not.
            </p>
            <a
              href="#morning-report"
              className="mono-label mt-9 inline-flex items-center gap-3 border border-frost/40 px-5 py-3 text-[11px] text-frost transition hover:border-copper hover:text-copper"
            >
              Enter the Morning Report
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <div className="panel-in w-full max-w-[220px] border border-amber/50 bg-amber/15 px-5 py-4 backdrop-blur-sm lg:ml-auto">
            <p className="mono-label text-[11px] text-amber">Morning Report</p>
            <p className="mt-2 font-serif text-2xl text-frost">
              {String(storyCount).padStart(2, "0")} Stories
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:block" aria-hidden="true">
        <div className="h-8 w-px animate-pulse bg-frost/50" />
      </div>
    </section>
  );
}

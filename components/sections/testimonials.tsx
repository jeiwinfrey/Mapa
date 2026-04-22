import IconOpenQuote1 from "@central-icons-react/round-filled-radius-3-stroke-2/IconOpenQuote1"
import IconStar from "@central-icons-react/round-filled-radius-3-stroke-2/IconStar"

import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Mapa turned a loose weekend wishlist into a day that felt personal. We found two places I would have missed completely.",
    name: "Maya Chen",
    detail: "Solo weekend in Paris",
    initials: "MC",
    accent: "bg-[#007AFF]/16 text-[#0058BC] ring-1 ring-[#007AFF]/20",
    quoteTint: "bg-[#007AFF]/12 text-[#0058BC]",
  },
  {
    quote:
      "The plan felt calm. Good food, small galleries, smart walking distance, and no awkward dead time between stops.",
    name: "Jon Bell",
    detail: "Design trip in Copenhagen",
    initials: "JB",
    accent: "bg-[#34C759]/16 text-[#248A3D] ring-1 ring-[#34C759]/22",
    quoteTint: "bg-[#34C759]/12 text-[#248A3D]",
  },
  {
    quote:
      "It picked things our group actually cared about instead of the same checklist every travel app gives you.",
    name: "Sofia Alvarez",
    detail: "Friends trip in Lisbon",
    initials: "SA",
    accent: "bg-[#FF9500]/16 text-[#C93400] ring-1 ring-[#FF9500]/22",
    quoteTint: "bg-[#FF9500]/12 text-[#C93400]",
  },
]

const stats = [
  { value: "4.9", label: "Avg. trip rating", dot: "bg-[#FF9500]" },
  { value: "12k+", label: "Plans generated", dot: "bg-[#007AFF]" },
  { value: "86%", label: "Found a hidden gem", dot: "bg-[#34C759]" },
]

const glassSurface =
  "bg-[var(--system-surface-card)] shadow-[var(--system-shadow-card)] backdrop-blur-2xl ring-1 ring-[var(--system-ring-glass)]"

function StarRow({ className, size = 15 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <IconStar
          key={index}
          size={size}
          className="text-[#FF9500] drop-shadow-[0_1px_0_rgb(255_255_255/0.35)]"
          aria-hidden
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [featured, ...rest] = testimonials

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-gradient-to-b from-background via-muted/35 to-muted/55 px-4 py-20 sm:px-6 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-[20%] top-[10%] h-[min(28rem,55vh)] w-[min(28rem,70vw)] rounded-full bg-[#007AFF]/[0.07] blur-3xl" />
        <div className="absolute -right-[15%] bottom-[5%] h-[min(24rem,48vh)] w-[min(26rem,65vw)] rounded-full bg-[#34C759]/[0.06] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF9500]/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-14 xl:gap-20">
        <header className="mx-auto max-w-xl text-center lg:sticky lg:top-28 lg:mx-0 lg:max-w-[26rem] lg:pt-2 lg:text-left">
          <h2
            id="testimonials-heading"
            className="text-balance text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.045em] text-foreground"
          >
            Trips that feel less planned and more found.
          </h2>
          <p className="mt-6 text-pretty text-[18px] leading-[1.45] tracking-[-0.02em] text-muted-foreground sm:text-[19px]">
            Days built around what you actually like—pace, food, small
            discoveries—without the spreadsheet energy.
          </p>

          <div
            className={cn(
              "mt-10 rounded-[22px] px-5 py-6 sm:px-7 sm:py-7",
              glassSurface,
            )}
          >
            <dl className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 text-center lg:text-left"
                >
                  <dt className="flex items-center justify-center gap-1.5 lg:justify-start">
                    <span
                      className={cn("size-1.5 shrink-0 rounded-full", stat.dot)}
                      aria-hidden
                    />
                    <span className="text-[11px] font-medium leading-tight text-muted-foreground sm:text-[12px]">
                      {stat.label}
                    </span>
                  </dt>
                  <dd className="mt-2.5 text-[clamp(1.35rem,3.5vw,1.85rem)] font-semibold leading-none tracking-[-0.03em] text-foreground tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="flex flex-col gap-4">
          <article
            className={cn(
              "group relative rounded-[22px] p-6 sm:p-8",
              glassSurface,
              "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-2xl sm:size-12",
                  featured.quoteTint,
                )}
              >
                <IconOpenQuote1 size={22} className="opacity-95" aria-hidden />
              </div>
              <StarRow size={16} className="opacity-95" />
            </div>

            <blockquote className="mt-6 sm:mt-8">
              <p className="max-w-prose text-pretty text-[clamp(1.125rem,2.8vw,1.5rem)] font-medium leading-[1.35] tracking-[-0.02em] text-foreground">
                {featured.quote}
              </p>
            </blockquote>

            <footer className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10">
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-full text-[14px] font-semibold sm:size-12 sm:text-[15px]",
                  featured.accent,
                )}
              >
                {featured.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-foreground sm:text-[16px]">
                  {featured.name}
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {featured.detail}
                </p>
              </div>
            </footer>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((testimonial) => (
              <article
                key={testimonial.name}
                className={cn(
                  "flex h-full flex-col rounded-[22px] p-5 sm:p-6",
                  glassSurface,
                  "transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-[13px] font-semibold sm:size-11 sm:text-[14px]",
                      testimonial.accent,
                    )}
                  >
                    {testimonial.initials}
                  </div>
                  <StarRow size={14} className="opacity-90" />
                </div>

                <blockquote className="mt-5 flex flex-1 flex-col sm:mt-6">
                  <p className="text-pretty text-[16px] font-medium leading-[1.4] tracking-[-0.015em] text-foreground sm:text-[17px]">
                    {testimonial.quote}
                  </p>
                </blockquote>

                <footer className="mt-6 pt-1">
                  <p className="text-[14px] font-semibold leading-tight text-foreground sm:text-[15px]">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-[12px] text-muted-foreground sm:text-[13px]">
                    {testimonial.detail}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const footerNav = [
  { href: "#planning-pain-heading", label: "The problem" },
  { href: "#trip-planned-heading", label: "How it works" },
  { href: "#features-heading", label: "Features" },
  { href: "#testimonials-heading", label: "Stories" },
] as const

const ctaButtonClassName = cn(
  "h-auto min-h-11 rounded-full border-0 px-8 py-3",
  "bg-[#34C759]/20 text-[#34C759] shadow-none",
  "hover:bg-[#34C759]/30 hover:text-[#34C759]",
  "text-base font-semibold tracking-[-0.08px]",
  "transition motion-reduce:transition-none active:scale-[0.97] motion-reduce:active:scale-100",
  "focus-visible:ring-2 focus-visible:ring-[#34C759]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
)

const navLinkClassName = cn(
  "text-[13px] font-medium tracking-[-0.02em] text-muted-foreground",
  "underline-offset-4 transition-colors hover:text-foreground",
  "focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34C759]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative flex min-h-svh flex-col overflow-hidden bg-gradient-to-b from-muted/35 via-background to-background"
      aria-label="Site footer"
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center px-6 py-10 sm:py-14">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <p className="text-[22px] leading-[1.2] font-medium tracking-[-0.3px] text-foreground">
            Mapa
          </p>
          <h2 className="mt-8 text-[clamp(2.25rem,6.5vw,3.5rem)] leading-none font-medium tracking-[-1.5px] text-balance text-foreground">
            Your next trip
            <br />
            could be special.
          </h2>
          <p className="mt-6 max-w-md text-[20px] leading-[125%] font-normal tracking-[-0.3px] text-pretty text-muted-foreground">
            Join travelers who plan with Mapa.
          </p>
          <Button
            asChild
            variant="ghost"
            className={cn("mt-10", ctaButtonClassName)}
          >
            <a href="#hero-map-text">Start exploring</a>
          </Button>
        </div>

        <nav
          aria-label="On this page"
          className="mx-auto mt-12 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-14 sm:gap-x-5"
        >
          {footerNav.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClassName}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="shrink-0 px-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 text-center sm:pb-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:text-[11px] sm:tracking-[0.2em]">
          © {year} Mapa
        </p>
      </div>
    </footer>
  )
}

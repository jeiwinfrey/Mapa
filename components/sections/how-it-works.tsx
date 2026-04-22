"use client"

import type { ComponentType } from "react"
import { useEffect, useRef, useState } from "react"
import IconCircleCheck from "@central-icons-react/round-filled-radius-3-stroke-2/IconCircleCheck"
import IconClock from "@central-icons-react/round-filled-radius-3-stroke-2/IconClock"
import IconClockSnooze from "@central-icons-react/round-filled-radius-3-stroke-2/IconClockSnooze"
import IconColorPalette from "@central-icons-react/round-filled-radius-3-stroke-2/IconColorPalette"
import IconCupHot from "@central-icons-react/round-filled-radius-3-stroke-2/IconCupHot"
import IconDiamondShine from "@central-icons-react/round-filled-radius-3-stroke-2/IconDiamondShine"
import IconFashion from "@central-icons-react/round-filled-radius-3-stroke-2/IconFashion"
import IconForkKnife from "@central-icons-react/round-filled-radius-3-stroke-2/IconForkKnife"
import IconHeadphones from "@central-icons-react/round-filled-radius-3-stroke-2/IconHeadphones"
import IconImages2 from "@central-icons-react/round-filled-radius-3-stroke-2/IconImages2"
import IconMapPin from "@central-icons-react/round-filled-radius-3-stroke-2/IconMapPin"
import IconMicrophoneSparkle from "@central-icons-react/round-filled-radius-3-stroke-2/IconMicrophoneSparkle"
import IconMoonStar from "@central-icons-react/round-filled-radius-3-stroke-2/IconMoonStar"
import IconShoppingBag1 from "@central-icons-react/round-filled-radius-3-stroke-2/IconShoppingBag1"
import IconTicket from "@central-icons-react/round-filled-radius-3-stroke-2/IconTicket"
import { useInView, useReducedMotion } from "motion/react"

import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

const STEP_DURATION_MS = 3000

type IconComp = ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>

const interests: {
  label: string
  Icon: IconComp
  className: string
  activeByDefault: boolean
}[] = [
  {
    label: "Modern art",
    Icon: IconColorPalette,
    className:
      "bg-[#FF375F]/16 text-[#D3144D] shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]",
    activeByDefault: true,
  },
  {
    label: "Iconic street food",
    Icon: IconForkKnife,
    className:
      "bg-[#FF9500]/16 text-[#C93400] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    activeByDefault: false,
  },
  {
    label: "Hidden gems",
    Icon: IconDiamondShine,
    className:
      "bg-[#32ADE6]/16 text-[#00689D] shadow-[inset_0_1px_0_rgb(255_255_255/0.4)]",
    activeByDefault: true,
  },
  {
    label: "Chill",
    Icon: IconMoonStar,
    className:
      "bg-[#34C759]/16 text-[#248A3D] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    activeByDefault: true,
  },
  {
    label: "Local designers",
    Icon: IconFashion,
    className:
      "bg-[#AF52DE]/16 text-[#7C3A9E] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    activeByDefault: false,
  },
  {
    label: "Galleries",
    Icon: IconImages2,
    className:
      "bg-[#0A84FF]/14 text-[#0058BC] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    activeByDefault: true,
  },
  {
    label: "Music events",
    Icon: IconMicrophoneSparkle,
    className:
      "bg-[#FF9F0A]/16 text-[#B25000] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
    activeByDefault: false,
  },
]

const smartPicks: {
  title: string
  reason: string
  Icon: IconComp
  iconTint: string
}[] = [
  {
    title: "Studio open house",
    reason:
      "Open Saturday afternoon, aligned with local designers you saved.",
    Icon: IconFashion,
    iconTint:
      "bg-[#AF52DE]/18 text-[#7C3A9E] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
  },
  {
    title: "Small gallery night",
    reason: "Curated walk-through, quieter after 8 PM near your route.",
    Icon: IconImages2,
    iconTint:
      "bg-[#0A84FF]/16 text-[#0058BC] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
  },
  {
    title: "Listening bar",
    reason: "Low-key vinyl room that fits hidden gems without a long detour.",
    Icon: IconHeadphones,
    iconTint:
      "bg-[#34C759]/18 text-[#248A3D] shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]",
  },
]

const planStops: {
  time: string
  title: string
  detail: string
  StopIcon: IconComp
  DetailIcon: IconComp
}[] = [
  {
    time: "10:30",
    title: "Gallery coffee",
    detail: "8 min walk",
    StopIcon: IconCupHot,
    DetailIcon: IconMapPin,
  },
  {
    time: "12:15",
    title: "Design market",
    detail: "Pre-booked entry",
    StopIcon: IconShoppingBag1,
    DetailIcon: IconTicket,
  },
  {
    time: "15:40",
    title: "Canal listening bar",
    detail: "Low-crowd window",
    StopIcon: IconHeadphones,
    DetailIcon: IconClockSnooze,
  },
]

const steps = [
  {
    title: "Personalized program",
    description: "Tailored to your style, interests, and pace",
  },
  {
    title: "Local expertise",
    description: "Hidden gems and live events you will not find on Google",
  },
  {
    title: "Ready plan in one place",
    description: "Optimized routes, less stress, no queues",
  },
]

const glassSurface =
  "bg-[var(--system-surface-card)] shadow-[var(--system-shadow-card)] backdrop-blur-2xl ring-1 ring-[var(--system-ring-glass)]"

function ShowcaseContent({ activeStep }: { activeStep: number }) {
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(
    () =>
      new Set(
        interests
          .filter((interest) => interest.activeByDefault)
          .map((interest) => interest.label),
      ),
  )

  function toggleInterest(label: string) {
    setSelectedInterests((current) => {
      const next = new Set(current)

      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }

      return next
    })
  }

  if (activeStep === 1) {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-md rounded-[22px] px-6 py-8 text-left sm:max-w-lg sm:px-8 sm:py-9",
          glassSurface,
        )}
      >
        <ul className="flex flex-col gap-9 sm:gap-10">
          {smartPicks.map((pick) => (
            <li key={pick.title} className="flex gap-4 sm:gap-5">
              <div
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full",
                  pick.iconTint,
                )}
              >
                <pick.Icon size={20} aria-hidden />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[17px] font-medium leading-snug tracking-[-0.2px] text-foreground">
                  {pick.title}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {pick.reason}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  if (activeStep === 2) {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-md rounded-[22px] px-6 py-8 text-left sm:max-w-lg sm:px-8 sm:py-9",
          glassSurface,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[12px] font-medium tracking-wide text-system-secondary">
              Saturday
            </p>
            <p className="mt-1 text-[22px] font-medium leading-tight tracking-[-0.35px] text-foreground sm:text-[24px]">
              3 stops, zero chaos
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
              <IconClock size={14} className="shrink-0 opacity-70" aria-hidden />
              <span>About five hours, light walking</span>
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-semibold",
              "bg-[#34C759]/20 text-[#34C759]",
            )}
          >
            <IconCircleCheck size={15} aria-hidden />
            Ready
          </span>
        </div>

        <ul className="mt-10 flex flex-col gap-8 sm:mt-11 sm:gap-9">
          {planStops.map((stop) => (
            <li key={stop.title} className="flex gap-4 sm:gap-5">
              <span className="w-11 shrink-0 pt-0.5 text-[14px] font-medium tabular-nums text-system-secondary sm:w-12">
                {stop.time}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full",
                      "bg-[var(--system-fill)] text-system-label",
                    )}
                  >
                    <stop.StopIcon size={18} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[17px] font-medium leading-snug tracking-[-0.15px] text-foreground">
                      {stop.title}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-muted-foreground">
                      <stop.DetailIcon
                        size={14}
                        className="shrink-0 opacity-75"
                        aria-hidden
                      />
                      {stop.detail}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-[22px] p-6 sm:p-8",
        glassSurface,
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {interests.map((interest) => {
          const isSelected = selectedInterests.has(interest.label)

          return (
            <button
              key={interest.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleInterest(interest.label)}
              className={cn(
                "inline-flex min-h-12 items-center gap-2 rounded-full pl-4 pr-5 text-[17px] leading-none font-semibold outline-none sm:min-h-14 sm:gap-2.5 sm:pl-5 sm:pr-7 sm:text-[20px]",
                "transition-[opacity,scale,filter] duration-150 ease-out active:scale-[0.96]",
                "focus-visible:ring-2 focus-visible:ring-system-focus/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                interest.className,
                isSelected
                  ? "opacity-100 saturate-100"
                  : "opacity-35 saturate-50 hover:opacity-65 hover:saturate-75",
              )}
            >
              <interest.Icon
                size={18}
                className="shrink-0 opacity-95 sm:size-[20px]"
                aria-hidden
              />
              {interest.label}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        className={cn(
          "mt-3 inline-flex min-h-14 items-center justify-center rounded-[18px] px-8 text-[18px] leading-none font-semibold",
          "bg-[#34C759]/20 text-[#34C759] shadow-none",
          "hover:bg-[#34C759]/30 hover:text-[#34C759]",
          "transition active:scale-[0.96]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34C759]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
      >
        Generate plan
      </button>
    </div>
  )
}

export function HowItWorks() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { amount: 0.42 })
  const [{ activeStep, cycle }, setStepState] = useState({
    activeStep: 0,
    cycle: 0,
  })

  useEffect(() => {
    if (reducedMotion || !inView) {
      return
    }

    const timer = window.setTimeout(() => {
      setStepState((current) => ({
        activeStep: (current.activeStep + 1) % steps.length,
        cycle: current.cycle + 1,
      }))
    }, STEP_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [activeStep, inView, reducedMotion])

  function selectStep(index: number) {
    setStepState((current) => ({
      activeStep: index,
      cycle: current.cycle + 1,
    }))
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trip-planned-heading"
      className="bg-background px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2
            id="trip-planned-heading"
            className="text-pretty text-[clamp(1.25rem,3.5vw,1.875rem)] leading-snug font-semibold tracking-[-0.02em] text-foreground sm:text-[clamp(1.35rem,3.2vw,2rem)] sm:leading-[1.2]"
          >
            Your trip planned in minutes—tell Mapa what feels right and get a
            day shaped your way.
          </h2>
        </FadeIn>

        <div
          className="mt-12 flex min-h-[31rem] items-center rounded-[28px] bg-muted/50 px-5 py-16 sm:min-h-[34rem] sm:px-8 sm:py-20 lg:px-16"
          aria-live="polite"
        >
          <div key={activeStep} className="w-full animate-in fade-in duration-200">
            <ShowcaseContent activeStep={activeStep} />
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => {
            const isActive = activeStep === index
            const shouldFill = isActive && (inView || reducedMotion)
            const progressStyle =
              shouldFill && !reducedMotion
                ? {
                    animation: `how-it-works-progress ${STEP_DURATION_MS}ms linear forwards`,
                  }
                : undefined
            const progressFillClass = cn(
              "h-full origin-left rounded-full bg-foreground",
              !shouldFill && "scale-x-0",
              shouldFill && reducedMotion && "scale-x-100",
            )

            return (
              <button
                key={step.title}
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => selectStep(index)}
                className={cn(
                  "group flex min-h-44 flex-col items-center rounded-[18px] px-4 py-2 text-center outline-none",
                  "transition-opacity duration-200 ease-out",
                  "focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2",
                  isActive ? "opacity-100" : "opacity-55 hover:opacity-75",
                )}
              >
                <div className="mb-6 h-1 w-28 overflow-hidden rounded-full bg-foreground/12 md:w-32">
                  <div
                    key={`${step.title}-${cycle}`}
                    className={progressFillClass}
                    style={progressStyle}
                    aria-hidden
                  />
                </div>
                <span
                  className={cn(
                    "text-balance text-[22px] leading-[1.15] font-semibold transition-colors duration-200 ease-out sm:text-[24px]",
                    isActive ? "text-foreground" : "text-system-secondary",
                  )}
                >
                  {step.title}
                </span>
                <span
                  className={cn(
                    "mt-4 block max-w-[17rem] text-pretty text-[17px] leading-[1.45] transition-colors duration-200 ease-out",
                    isActive
                      ? "text-muted-foreground"
                      : "text-system-secondary",
                  )}
                >
                  {step.description}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

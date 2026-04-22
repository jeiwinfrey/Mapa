"use client"

import type { ComponentType, ReactNode } from "react"
import { useState } from "react"
import IconChevronDownSmall from "@central-icons-react/round-filled-radius-3-stroke-2/IconChevronDownSmall"
import IconMapPin from "@central-icons-react/round-filled-radius-3-stroke-2/IconMapPin"
import IconMicrophone from "@central-icons-react/round-filled-radius-3-stroke-2/IconMicrophone"
import IconMoonStar from "@central-icons-react/round-filled-radius-3-stroke-2/IconMoonStar"
import IconPause from "@central-icons-react/round-filled-radius-3-stroke-2/IconPause"
import IconPlay from "@central-icons-react/round-filled-radius-3-stroke-2/IconPlay"
import IconSearchlinesSparkle from "@central-icons-react/round-filled-radius-3-stroke-2/IconSearchlinesSparkle"
import IconSend from "@central-icons-react/round-filled-radius-3-stroke-2/IconSend"
import IconSunrise from "@central-icons-react/round-filled-radius-3-stroke-2/IconSunrise"
import IconSunset from "@central-icons-react/round-filled-radius-3-stroke-2/IconSunset"
import { motion } from "motion/react"

import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

type IconComp = ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>

const pillButton =
  "inline-flex shrink-0 items-center justify-center rounded-full transition outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"

const cardShadow = "shadow-[0_8px_32px_-8px_rgb(0_0_0/0.07)]"

const clips: {
  title: string
  duration: string
  Icon: IconComp
  iconBox: string
  playBtn: string
}[] = [
  {
    title: "Canal quarter after dark",
    duration: "1:37",
    Icon: IconMoonStar,
    iconBox:
      "bg-[#5856D6]/16 text-[#4B4596] shadow-[inset_0_1px_0_rgb(255_255_255/0.42)]",
    playBtn:
      "bg-[#5856D6] text-white hover:opacity-90 active:opacity-[0.85]",
  },
  {
    title: "Market morning, fewer crowds",
    duration: "2:04",
    Icon: IconSunrise,
    iconBox:
      "bg-[#FF9500]/16 text-[#C93400] shadow-[inset_0_1px_0_rgb(255_255_255/0.38)]",
    playBtn:
      "bg-[#FF9500] text-white hover:opacity-90 active:opacity-[0.85]",
  },
  {
    title: "The bridge at blue hour",
    duration: "0:58",
    Icon: IconSunset,
    iconBox:
      "bg-[#0A84FF]/14 text-[#0058BC] shadow-[inset_0_1px_0_rgb(255_255_255/0.38)]",
    playBtn:
      "bg-[#0A84FF] text-white hover:opacity-90 active:opacity-[0.85]",
  },
]

const dayBalance = [
  {
    id: "depth",
    label: "Depth",
    hint: "Fewer stops, longer stays, room to wander off-script.",
    labelActive: "text-[#34C759]",
    underline: "bg-[#34C759]",
  },
  {
    id: "even",
    label: "Even",
    hint: "A steady rhythm between highlights and quiet gaps.",
    labelActive: "text-[#007AFF]",
    underline: "bg-[#007AFF]",
  },
  {
    id: "packed",
    label: "Full",
    hint: "More on the map—tight timing, still sane walking.",
    labelActive: "text-[#FF9500]",
    underline: "bg-[#FF9500]",
  },
] as const

function FeatureCard({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center rounded-[24px] bg-muted/30 px-6 pb-9 pt-11 sm:px-9 sm:pb-10 sm:pt-12",
        className,
      )}
    >
      <div className="flex min-h-[13rem] w-full flex-1 items-center justify-center sm:min-h-[15rem] lg:min-h-[16rem]">
        {children}
      </div>
      <h3 className="mt-9 text-center text-[18px] font-medium leading-tight tracking-[-0.03em] text-foreground sm:mt-10 sm:text-[19px]">
        {title}
      </h3>
      <p className="mx-auto mt-2.5 max-w-[17rem] text-center text-[14px] leading-[1.5] text-muted-foreground">
        {description}
      </p>
    </div>
  )
}

function BriefListensShowcase() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const item = clips[active]

  return (
    <div className="w-full max-w-[min(100%,360px)] sm:max-w-[400px]">
      <div className={cn("overflow-hidden rounded-[20px] bg-background/80 p-2", cardShadow)}>
        <ul className="space-y-1">
          {clips.map((clip, i) => {
            const Icon = clip.Icon
            return (
              <li key={clip.title}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setPlaying(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-3.5 rounded-[14px] px-3 py-3 text-left sm:gap-4 sm:px-3.5 sm:py-3.5",
                    "transition-[transform,background-color] duration-150 ease-out",
                    "hover:bg-muted/30 active:scale-[0.99]",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-[13px] sm:size-12 sm:rounded-[14px]",
                      "transition-[opacity,filter,transform] duration-150 ease-out active:scale-[0.96]",
                      clip.iconBox,
                      i === active
                        ? "opacity-100 saturate-100"
                        : "opacity-[0.38] saturate-50 hover:opacity-[0.62] hover:saturate-[0.78]",
                    )}
                    aria-hidden
                  >
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-[15px]">
                      {clip.title}
                    </p>
                    <p className="mt-0.5 text-[12px] tabular-nums text-muted-foreground">
                      {clip.duration}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-2 border-t border-border/35 px-2 pb-2 pt-3">
          <div className="flex items-center justify-between gap-3 px-1">
            <p className="min-w-0 truncate text-[13px] text-muted-foreground">
              {item.title}
            </p>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={playing}
              aria-label={playing ? "Pause" : "Play"}
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full transition-opacity active:opacity-80",
                item.playBtn,
              )}
            >
              {playing ? (
                <IconPause size={20} className="text-white" aria-hidden />
              ) : (
                <IconPlay
                  size={20}
                  className="text-white"
                  aria-hidden
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DayBalanceShowcase() {
  const [mode, setMode] = useState<(typeof dayBalance)[number]["id"]>("even")
  const current = dayBalance.find((m) => m.id === mode) ?? dayBalance[1]

  return (
    <div className="flex w-full max-w-[min(100%,360px)] flex-col items-center text-center sm:max-w-[400px]">
      <div className="flex w-full flex-wrap justify-center gap-1 sm:gap-2">
        {dayBalance.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            className={cn(
              "relative px-4 py-2 text-center text-[13px] font-medium tracking-[-0.02em] transition-colors sm:px-5 sm:text-[14px]",
              mode === m.id
                ? m.labelActive
                : "text-muted-foreground hover:text-foreground/75",
            )}
          >
            {m.label}
            {mode === m.id ? (
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-px w-8 -translate-x-1/2 sm:w-9",
                  m.underline,
                )}
                aria-hidden
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-8 w-full min-w-0 overflow-x-auto sm:mt-9 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <motion.p
          key={current.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mx-auto w-max whitespace-nowrap px-1 text-center text-[14px] leading-normal text-muted-foreground sm:text-[15px]"
        >
          {current.hint}
        </motion.p>
      </div>
    </div>
  )
}

function RealtimeTipsShowcase() {
  const [added, setAdded] = useState(false)
  const [skipped, setSkipped] = useState(false)

  return (
    <div className="relative w-full max-w-[min(100%,360px)] sm:max-w-[400px]">
      <div
        className="absolute inset-0 rounded-[20px] opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 35%, currentColor 0.4px, transparent 0.5px)`,
          backgroundSize: "12px 12px",
          color: "rgb(0 0 0 / 0.06)",
        }}
        aria-hidden
      />
      <div className="relative p-4 sm:p-5">
        <div
          className={cn(
            "rounded-[18px] bg-background/90 p-5 backdrop-blur-sm sm:p-6",
            cardShadow,
          )}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#007AFF]">
            Now
          </p>
          <p className="mt-3 text-[15px] font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-[16px]">
            Alley bakery opens at 7
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-[12px] text-muted-foreground sm:text-[13px]">
            <IconMapPin size={14} className="shrink-0 opacity-60" aria-hidden />
            90 m ahead · 2 min walk
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setAdded(true)
                setSkipped(false)
              }}
              disabled={added}
              className={cn(
                "rounded-full px-4 py-2 text-[11px] font-semibold transition-opacity active:opacity-80 sm:text-[12px]",
                added
                  ? "bg-[#34C759]/16 text-[#248A3D]"
                  : "bg-[#34C759]/20 text-[#248A3D] hover:bg-[#34C759]/26",
              )}
            >
              {added ? "Added" : "Add to route"}
            </button>
            <button
              type="button"
              onClick={() => {
                setSkipped(true)
                setAdded(false)
              }}
              disabled={skipped}
              className={cn(
                "rounded-full px-4 py-2 text-[11px] font-semibold transition-colors active:opacity-80 sm:text-[12px]",
                skipped
                  ? "bg-muted text-muted-foreground"
                  : "bg-[#FF3B30]/12 text-[#D70015] hover:bg-[#FF3B30]/16",
              )}
            >
              {skipped ? "Skipped" : "Skip"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureChatShowcase() {
  const [text, setText] = useState("Coffee, galleries, low crowds tomorrow…")
  const [mapIdx, setMapIdx] = useState(0)
  const maps = ["Apple Maps", "Google Maps", "Mapbox"] as const

  return (
    <div
      className={cn(
        "w-full max-w-[min(100%,360px)] rounded-[20px] p-4 sm:max-w-[400px] sm:p-5",
        "bg-[var(--system-surface-card)] backdrop-blur-xl",
        cardShadow,
      )}
    >
      <label htmlFor="feature-chat-input" className="sr-only">
        Plan your trip
      </label>
      <textarea
        id="feature-chat-input"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={cn(
          "min-h-[4.25rem] w-full resize-none rounded-[14px] bg-muted/35 px-3 py-3",
          "text-[14px] leading-[1.45] tracking-[-0.1px] sm:min-h-[4.75rem] sm:text-[15px]",
          "text-foreground placeholder:text-muted-foreground/70",
          "outline-none transition-colors focus:bg-muted/45",
        )}
        placeholder="Describe your trip, pace, and what you want to discover…"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 sm:mt-3.5">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            aria-label="Enhance with AI"
            className={cn(
              pillButton,
              "size-10 bg-[var(--system-fill)] text-system-secondary hover:bg-[var(--system-fill-hover)]",
            )}
          >
            <IconSearchlinesSparkle size={18} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setMapIdx((i) => (i + 1) % maps.length)}
            aria-label={`Map source: ${maps[mapIdx]}. Click to change.`}
            className={cn(
              pillButton,
              "h-10 max-w-full min-w-0 gap-1.5 px-3",
              "bg-[var(--system-fill)] text-system-secondary hover:bg-[var(--system-fill-hover)]",
            )}
          >
            <span className="shrink-0 text-[11px] font-medium sm:text-[12px]">
              Sourcing:
            </span>
            <span className="min-w-0 truncate text-[11px] font-semibold text-system-label sm:text-[12px]">
              {maps[mapIdx]}
            </span>
            <IconChevronDownSmall size={14} className="shrink-0 opacity-50" aria-hidden />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Voice input"
            className={cn(
              pillButton,
              "size-10 bg-[var(--system-fill)] text-system-secondary hover:bg-[var(--system-fill-hover)]",
            )}
          >
            <IconMicrophone size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Send"
            className={cn(
              pillButton,
              "size-10 bg-[#34C759]/20 text-[#34C759] hover:bg-[#34C759]/28",
            )}
          >
            <IconSend size={18} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-background px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2
            id="features-heading"
            className="text-balance text-[clamp(1.65rem,4.2vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.04em] text-foreground"
          >
            <span className="block">They know the sights.</span>
            <span className="mt-1.5 block">We know the experiences.</span>
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:mt-16 sm:gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          <FadeIn delay={0.05}>
            <FeatureCard
              title="Brief listens"
              description="A short clip of context before you walk in"
            >
              <BriefListensShowcase />
            </FeatureCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <FeatureCard
              title="Day balance"
              description="Depth, an even rhythm, or a fuller map—your call"
            >
              <DayBalanceShowcase />
            </FeatureCard>
          </FadeIn>

          <FadeIn delay={0.05}>
            <FeatureCard
              title="Real-time tips"
              description="Turn left for a courtyard, skip the crowd at noon"
            >
              <RealtimeTipsShowcase />
            </FeatureCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <FeatureCard
              title="Chat"
              description="Plan and adjust your trip as easily as a conversation"
            >
              <FeatureChatShowcase />
            </FeatureCard>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

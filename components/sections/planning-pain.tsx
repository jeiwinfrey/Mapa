"use client"

import { useRef } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

/** Matches --system-secondary → near-black as user scrolls */
const TEXT_GRAY = "#b4b4b9"
const TEXT_BLACK = "#0a0a0a"

const HEADLINE =
  "Travel planning is broken. Planning stress 😫 Decision overload 🤷‍♀️ Missed opportunities⌛ Touristic traps 🪤"

/** First fraction of scroll progress stays fully gray; rest maps 0→1 for the letter wave */
const SCROLL_LETTER_DELAY = 0.16

function splitGraphemes(text: string): string[] {
  try {
    const seg = new Intl.Segmenter("en", { granularity: "grapheme" })
    return [...seg.segment(text)].map((s) => s.segment)
  } catch {
    return [...text]
  }
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a)
  const [br, bg, bb] = hexToRgb(b)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `rgb(${r} ${g} ${bl})`
}

function ScrollLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const color = useTransform(progress, (p) => {
    const start = index / total
    const end = (index + 1) / total
    const span = Math.max(1e-6, end - start)
    const t = Math.max(0, Math.min(1, (p - start) / span))
    return mixHex(TEXT_GRAY, TEXT_BLACK, t)
  })

  return (
    <motion.span style={{ color }} className="inline">
      {char}
    </motion.span>
  )
}

function AmbientOrbs({ reduced }: { reduced: boolean }) {
  if (reduced) return null

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -left-[15%] top-[18%] size-[min(55vw,28rem)] rounded-full bg-[#007AFF]/12 blur-3xl"
        animate={{
          x: [0, 28, 0],
          y: [0, -22, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-[12%] bottom-[12%] size-[min(48vw,24rem)] rounded-full bg-[#34C759]/10 blur-3xl"
        animate={{
          x: [0, -24, 0],
          y: [0, 18, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 size-[min(70vw,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

const graphemes = splitGraphemes(HEADLINE)

export function PlanningPain() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "center 0.52"],
  })

  const letterDriver = useTransform(scrollYProgress, (p) => {
    if (p <= SCROLL_LETTER_DELAY) return 0
    return (p - SCROLL_LETTER_DELAY) / (1 - SCROLL_LETTER_DELAY)
  })

  const total = graphemes.length

  return (
    <section
      ref={sectionRef}
      aria-labelledby="planning-pain-heading"
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-16"
    >
      <AmbientOrbs reduced={!!reduced} />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <h1
          id="planning-pain-heading"
          className="text-balance text-[clamp(1.875rem,5.5vw,2.75rem)] font-semibold leading-[1.3] tracking-[-0.03em] sm:text-[clamp(2.125rem,5vw,3.25rem)] md:text-[clamp(2.25rem,4.5vw,3.5rem)]"
        >
          {graphemes.map((char, index) => (
            <ScrollLetter
              key={`${index}-${char}`}
              char={char}
              index={index}
              total={total}
              progress={letterDriver}
            />
          ))}
        </h1>
      </div>
    </section>
  )
}

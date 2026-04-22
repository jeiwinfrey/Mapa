"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Direction the element slides in from */
  from?: "bottom" | "left" | "right" | "none"
  /** How much of the element must be visible before triggering */
  amount?: number
  /** Only trigger once */
  once?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  from = "bottom",
  amount = 0.15,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(ref, { amount, once })

  const offsets = {
    bottom: { y: 28, x: 0 },
    left: { y: 0, x: -28 },
    right: { y: 0, x: 28 },
    none: { y: 0, x: 0 },
  }

  const { x, y } = reduced ? { x: 0, y: 0 } : offsets[from]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

"use client"

import Image from "next/image"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { HeroInput } from "@/components/sections/hero-input"
import { cn } from "@/lib/utils"

const PARIS_MAP_SRC =
  "https://framerusercontent.com/images/zlh9jNVVcpEvQkV9r7wfqveUDw.png?scale-down-to=4096&width=8000&height=4500"

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="flex min-h-svh flex-col justify-center px-6 py-16">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-[22px] leading-[1.2] font-medium tracking-[-0.3px] text-foreground"
        >
          Mapa
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="mt-8 text-[clamp(2.25rem,6.5vw,3.5rem)] leading-none font-medium tracking-[-1.5px] text-balance text-foreground"
        >
          Travel and discover
          <br />
          without chaos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.2 }}
          className="mt-6 max-w-md text-[20px] leading-[125%] font-normal tracking-[-0.3px] text-pretty text-muted-foreground"
        >
          Collect events, hidden places, food, and shops. Less planning. More
          experiences.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.3 }}
        >
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "mt-10 h-auto min-h-11 rounded-full border-0 px-8 py-3",
              "bg-[#34C759]/20 text-[#34C759] shadow-none",
              "hover:bg-[#34C759]/30 hover:text-[#34C759]",
              "text-base font-semibold tracking-[-0.08px]",
              "transition active:scale-[0.97]",
              "focus-visible:ring-2 focus-visible:ring-[#34C759]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            )}
          >
            Start exploring
          </Button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.45 }}
        className="mx-auto mt-14 w-full max-w-5xl"
      >
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={PARIS_MAP_SRC}
              alt="Stylized map of central Paris with the Seine, parks, and landmarks"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/55 to-transparent"
              aria-hidden
            />
          </div>
          <div className="relative z-10 -mt-10 flex justify-center px-1 sm:-mt-[20rem] sm:px-4">
            <div className="w-full max-w-2xl">
              <HeroInput />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

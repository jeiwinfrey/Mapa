"use client"

import { useState } from "react"
import IconSend from "@central-icons-react/round-filled-radius-3-stroke-2/IconSend"
import IconChevronDownSmall from "@central-icons-react/round-filled-radius-3-stroke-2/IconChevronDownSmall"
import IconSearchlinesSparkle from "@central-icons-react/round-filled-radius-3-stroke-2/IconSearchlinesSparkle"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const MAP_OPTIONS = [
  { id: "apple-maps", label: "Apple Maps" },
  { id: "google-maps", label: "Google Maps" },
  { id: "mapbox", label: "Mapbox" },
] as const

export function HeroInput({ className }: { className?: string }) {
  const [message, setMessage] = useState("")
  const [mapSource, setMapSource] =
    useState<(typeof MAP_OPTIONS)[number]["id"]>("apple-maps")

  const selectedLabel =
    MAP_OPTIONS.find((o) => o.id === mapSource)?.label ?? "Apple Maps"

  const pillButton =
    "inline-flex shrink-0 items-center justify-center rounded-full transition active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-system-focus/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="hero-map-text" className="sr-only">
        Describe what you are planning
      </label>
      <div
        className={cn(
          "flex flex-col rounded-[22px] p-4 sm:p-5",
          "bg-[var(--system-surface-card)] shadow-[var(--system-shadow-card)] backdrop-blur-2xl",
          "ring-1 ring-[var(--system-ring-glass)]",
        )}
      >
        <textarea
          id="hero-map-text"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your trip, pace, and what you want to discover…"
          className={cn(
            "min-h-[6.25rem] w-full resize-none bg-transparent px-0.5 py-0.5",
            "text-[15px] leading-[1.4] tracking-[-0.15px] sm:text-[16px]",
            "text-system-label placeholder:text-system-secondary/65",
            "outline-none ring-0 focus:ring-0 focus-visible:ring-0",
          )}
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 sm:mt-3.5 sm:gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:min-w-0 sm:flex-initial">
            <button
              type="button"
              aria-label="Enhance with AI"
              className={cn(
                pillButton,
                "size-9 bg-[var(--system-fill)] text-system-secondary",
              )}
            >
              <IconSearchlinesSparkle size={19} aria-hidden />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className={cn(
                  pillButton,
                  "h-9 max-w-full min-w-0 gap-1.5 px-3 py-0",
                  "bg-[var(--system-fill)] hover:bg-[var(--system-fill-hover)]",
                )}
              >
                <span
                  className={cn(
                    "shrink-0 text-[12px] font-medium tracking-[-0.08px] sm:text-[13px]",
                    "text-system-secondary",
                  )}
                >
                  Sourcing over:
                </span>
                <span
                  className={cn(
                    "min-w-0 truncate text-[12px] font-semibold tracking-[-0.08px] sm:text-[13px]",
                    "text-system-label",
                  )}
                >
                  {selectedLabel}
                </span>
                <IconChevronDownSmall
                  size={15}
                  className="shrink-0 text-system-secondary opacity-80"
                  aria-hidden
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[min(100vw-2rem,20rem)]"
              >
                <DropdownMenuRadioGroup
                  value={mapSource}
                  onValueChange={(v) =>
                    setMapSource(v as (typeof MAP_OPTIONS)[number]["id"])
                  }
                >
                  {MAP_OPTIONS.map((opt) => (
                    <DropdownMenuRadioItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            type="submit"
            aria-label="Submit"
            className={cn(
              pillButton,
              "size-9 bg-[var(--system-fill)] text-system-secondary",
            )}
          >
            <IconSend size={19} aria-hidden />
          </button>
        </div>
      </div>
    </form>
  )
}

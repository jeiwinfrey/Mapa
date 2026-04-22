import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "lenis/dist/lenis.css"
import "./globals.css"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { cn } from "@/lib/utils"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: {
    default: "Mapa",
    template: "%s · Mapa",
  },
  description:
    "Travel and discover without chaos. Collect events, hidden places, food, and shops. Less planning. More experiences.",
  applicationName: "Mapa",
  appleWebApp: {
    title: "Mapa",
  },
}

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}

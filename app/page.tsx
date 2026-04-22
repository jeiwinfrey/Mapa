import { Features } from "@/components/sections/features"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PlanningPain } from "@/components/sections/planning-pain"
import { Testimonials } from "@/components/sections/testimonials"

export default function Page() {
  return (
    <>
      <main>
        <Hero />
        <PlanningPain />
        <HowItWorks />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

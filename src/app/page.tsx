import Hero from "@/components/hero"
import Stats from "@/components/stats"
import ServicesSection from "@/components/services-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesSection />
      <Testimonials />
      <CTASection />
    </>
  )
}

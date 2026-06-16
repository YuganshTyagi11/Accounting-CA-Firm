"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Mehta",
    company: "Mehta Enterprises",
    role: "CEO",
    content:
      "FinCore Advisors transformed our tax compliance process. Their team made GST filing effortless and saved us significantly on our tax liability. Highly professional and responsive.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "Sharma & Co.",
    role: "Managing Partner",
    content:
      "We switched to FinCore for our audit and financial planning needs. Their attention to detail and proactive advice has been invaluable for our business growth.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    company: "TechVentures India",
    role: "Founder",
    content:
      "From company registration to ongoing compliance, FinCore has been our trusted CA partner. Their digital-first approach makes everything smooth and transparent.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  const next = () => setActive((a) => (a + 1) % testimonials.length)
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(2rem)" }} className="transition-all duration-700 delay-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
            <p className="text-muted text-lg">Trusted by hundreds of businesses across India.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative bg-white rounded-2xl card-shadow-lg p-8 lg:p-12">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg text-primary/80 leading-relaxed mb-8">&ldquo;{testimonials[active].content}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-primary">{testimonials[active].name}</div>
                  <div className="text-sm text-muted">
                    {testimonials[active].role}, {testimonials[active].company}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="p-2 rounded-xl border border-border hover:border-accent/30 hover:bg-card-hover transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-muted" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2 rounded-xl border border-border hover:border-accent/30 hover:bg-card-hover transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === active ? "bg-accent w-8" : "bg-border hover:bg-accent/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

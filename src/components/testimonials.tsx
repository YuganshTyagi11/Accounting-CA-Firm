"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Mehta",
    company: "Mehta Enterprises",
    role: "CEO",
    content:
      "FinCore Advisors transformed our tax compliance process. Their team made GST filing effortless and saved us significantly on our tax liability. Highly professional and responsive.",
    rating: 5,
    initials: "RM",
  },
  {
    name: "Priya Sharma",
    company: "Sharma & Co.",
    role: "Managing Partner",
    content:
      "We switched to FinCore for our audit and financial planning needs. Their attention to detail and proactive advice has been invaluable for our business growth.",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Amit Verma",
    company: "TechVentures India",
    role: "Founder",
    content:
      "From company registration to ongoing compliance, FinCore has been our trusted CA partner. Their digital-first approach makes everything smooth and transparent.",
    rating: 5,
    initials: "AV",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const next = () => setActive((a) => (a + 1) % testimonials.length)
  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-accent/10 to-accent/5 rounded-full text-accent text-sm font-medium mb-5 border border-accent/10">
            Testimonials
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="text-muted text-lg">Trusted by hundreds of businesses across India.</p>
        </div>

        <div
          className="max-w-3xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-4 -left-2 lg:-left-6 w-12 h-12 lg:w-16 lg:h-16 rounded-2xl gradient-bg-accent flex items-center justify-center card-shadow-lg">
              <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
            </div>

            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl card-shadow-lg p-8 lg:p-12 border border-white/20 ml-6 lg:ml-8">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg lg:text-xl text-primary/80 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[active].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[active].initials}
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{testimonials[active].name}</div>
                    <div className="text-sm text-muted">
                      {testimonials[active].role}, {testimonials[active].company}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="p-2.5 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 card-shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5 text-muted" />
                  </button>
                  <button
                    onClick={next}
                    className="p-2.5 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 card-shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5 text-muted" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === active
                    ? "w-10 h-2.5 bg-accent card-shadow-sm"
                    : "w-2.5 h-2.5 bg-border hover:bg-accent/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

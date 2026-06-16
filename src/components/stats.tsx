"use client"

import { useEffect, useRef, useState } from "react"
import { Users, FileCheck, Award, Building2 } from "lucide-react"

const stats = [
  { icon: Users, label: "Happy Clients", value: 500, suffix: "+" },
  { icon: FileCheck, label: "Returns Filed", value: 15000, suffix: "+" },
  { icon: Award, label: "Years Experience", value: 25, suffix: "+" },
  { icon: Building2, label: "Partner Offices", value: 12, suffix: "" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 2000
          const step = Math.ceil(value / (duration / 16))
          const timer = setInterval(() => {
            setCount((prev) => {
              const next = prev + step
              if (next >= value) {
                clearInterval(timer)
                return value
              }
              return next
            })
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export default function Stats() {
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

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group text-center space-y-3 p-6 lg:p-8 rounded-3xl bg-white/80 backdrop-blur-sm card-shadow hover:card-shadow-lg transition-all duration-300"
              style={{
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Gradient border top */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

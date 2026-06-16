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
    <div ref={ref} className="text-3xl lg:text-4xl font-bold text-primary">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-xl bg-white card-shadow">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

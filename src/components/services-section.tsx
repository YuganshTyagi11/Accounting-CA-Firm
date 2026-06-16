"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Receipt, ShieldCheck, Building2, PiggyBank, Scale } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Tax Filing & Returns",
    description: "Comprehensive income tax return filing for individuals, partnerships, and corporations.",
    href: "/services/tax-filing",
    gradient: "from-blue-500/10 to-blue-500/5",
    accent: "text-blue-500",
  },
  {
    icon: Receipt,
    title: "GST Compliance",
    description: "End-to-end GST registration, return filing, and compliance management services.",
    href: "/services/gst-compliance",
    gradient: "from-emerald-500/10 to-emerald-500/5",
    accent: "text-emerald-500",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    description: "Statutory audit, internal audit, and assurance services for business transparency.",
    href: "/services/audit-assurance",
    gradient: "from-purple-500/10 to-purple-500/5",
    accent: "text-purple-500",
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "Private limited, LLP, partnership, and sole proprietorship registration assistance.",
    href: "/services/company-registration",
    gradient: "from-orange-500/10 to-orange-500/5",
    accent: "text-orange-500",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Strategic financial planning, wealth management, and investment advisory.",
    href: "/services/financial-planning",
    gradient: "from-rose-500/10 to-rose-500/5",
    accent: "text-rose-500",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "ROC compliance, RBI regulations, FEMA advisory, and corporate law services.",
    href: "/services/legal-compliance",
    gradient: "from-cyan-500/10 to-cyan-500/5",
    accent: "text-cyan-500",
  },
]

export default function ServicesSection() {
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
    <section className="py-16 lg:py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-bg-mesh opacity-50" />
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
            What We Offer
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
            Comprehensive Financial
            <br />
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            From tax compliance to business growth, we provide all the financial services your business needs under one
            roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative p-6 lg:p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/20 hover:border-accent/30 transition-all duration-500 card-shadow hover:card-shadow-lg hover:-translate-y-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon container */}
              <div className="relative w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 card-shadow">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="relative text-xl font-semibold text-primary mb-3 group-hover:text-accent-dark transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative text-muted text-sm leading-relaxed mb-4">{service.description}</p>

              <span className="relative inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-300">
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, FileText, Receipt, ShieldCheck, Building2, PiggyBank, Scale } from "lucide-react"

const services = [
  {
    icon: FileText,
    title: "Tax Filing & Returns",
    description: "Comprehensive income tax return filing for individuals, partnerships, and corporations.",
    href: "/services/tax-filing",
  },
  {
    icon: Receipt,
    title: "GST Compliance",
    description: "End-to-end GST registration, return filing, and compliance management services.",
    href: "/services/gst-compliance",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    description: "Statutory audit, internal audit, and assurance services for business transparency.",
    href: "/services/audit-assurance",
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "Private limited, LLP, partnership, and sole proprietorship registration assistance.",
    href: "/services/company-registration",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Strategic financial planning, wealth management, and investment advisory.",
    href: "/services/financial-planning",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "ROC compliance, RBI regulations, FEMA advisory, and corporate law services.",
    href: "/services/legal-compliance",
  },
]

export default function ServicesSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(2rem)" }} className="text-center max-w-2xl mx-auto mb-12 lg:mb-16 transition-all duration-700 delay-100">
          <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-medium mb-4">
            What We Offer
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Comprehensive Financial Services
          </h2>
          <p className="text-muted text-lg">
            From tax compliance to business growth, we provide all the financial services your business needs under one
            roof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <Link
              key={service.title}
              href={service.href}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/30 hover:bg-card-hover transition-all card-shadow hover:card-shadow-lg"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

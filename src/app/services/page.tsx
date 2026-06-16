"use client"

import Link from "next/link"
import { ArrowRight, FileText, Receipt, ShieldCheck, Building2, PiggyBank, Scale, Search } from "lucide-react"
import { useState } from "react"

const allServices = [
  {
    icon: FileText,
    title: "Tax Filing & Returns",
    description: "Comprehensive income tax return filing for individuals, HUFs, partnerships, LLPs, and corporations. We ensure maximum deductions and compliance with the latest tax laws.",
    features: ["Income Tax Return (ITR) filing", "Tax planning & optimization", "TDS return filing", "Tax audit under section 44AB", "International taxation"],
    href: "/services/tax-filing",
  },
  {
    icon: Receipt,
    title: "GST Compliance",
    description: "Complete GST compliance solutions from registration to final return filing. Stay compliant with changing GST regulations effortlessly.",
    features: ["GST registration (new & migration)", "GST return filing (GSTR-1, 3B, 9)", "Input tax credit reconciliation", "GST audit & assessment", "E-way bill generation"],
    href: "/services/gst-compliance",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    description: "Independent audit services that ensure transparency, compliance, and build trust with stakeholders.",
    features: ["Statutory audit", "Internal audit", "Stock audit", "Bank audit", "Due diligence"],
    href: "/services/audit-assurance",
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "End-to-end assistance for business entity registration. Choose the right structure for your venture.",
    features: ["Private Limited registration", "LLP registration", "Partnership registration", "One Person Company", "Trademark registration"],
    href: "/services/company-registration",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Strategic financial advice to help you achieve your personal and business financial goals.",
    features: ["Investment planning", "Retirement planning", "Wealth management", "Insurance advisory", "Estate planning"],
    href: "/services/financial-planning",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "Stay compliant with all regulatory requirements including ROC, RBI, FEMA, and other statutory filings.",
    features: ["ROC compliance", "FEMA advisory", "RBI compliance", "ESOP advisory", "M&A advisory"],
    href: "/services/legal-compliance",
  },
]

export default function ServicesPage() {
  const [search, setSearch] = useState("")
  const filtered = allServices.filter(
    (s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-block px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-medium mb-4">
              Our Expertise
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
              Comprehensive CA Services
            </h1>
            <p className="text-muted text-lg">
              We offer a full spectrum of chartered accountancy services tailored to your needs.
            </p>
          </div>

          <div className="max-w-lg mx-auto relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((service) => (
              <div
                key={service.title}
                className="group p-6 lg:p-8 rounded-2xl bg-white border border-border/50 hover:border-accent/30 transition-all card-shadow hover:card-shadow-lg flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm group/link"
                >
                  View Details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted">
              <p className="text-lg">No services found matching &ldquo;{search}&rdquo;</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight, FileText, Receipt, ShieldCheck, Building2, PiggyBank, Scale, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const allServices = [
  {
    icon: FileText,
    title: "Tax Filing & Returns",
    description: "Comprehensive income tax return filing for individuals, HUFs, partnerships, LLPs, and corporations.",
    features: ["Income Tax Return (ITR) filing", "Tax planning & optimization", "TDS return filing", "Tax audit under section 44AB", "International taxation"],
    href: "/services/tax-filing",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
  },
  {
    icon: Receipt,
    title: "GST Compliance",
    description: "Complete GST compliance solutions from registration to final return filing.",
    features: ["GST registration (new & migration)", "GST return filing (GSTR-1, 3B, 9)", "Input tax credit reconciliation", "GST audit & assessment", "E-way bill generation"],
    href: "/services/gst-compliance",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    description: "Independent audit services that ensure transparency, compliance, and build trust.",
    features: ["Statutory audit", "Internal audit", "Stock audit", "Bank audit", "Due diligence"],
    href: "/services/audit-assurance",
    color: "from-purple-500/20 to-purple-500/5",
    border: "border-purple-500/20",
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "End-to-end assistance for business entity registration.",
    features: ["Private Limited registration", "LLP registration", "Partnership registration", "One Person Company", "Trademark registration"],
    href: "/services/company-registration",
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Strategic financial advice for personal and business financial goals.",
    features: ["Investment planning", "Retirement planning", "Wealth management", "Insurance advisory", "Estate planning"],
    href: "/services/financial-planning",
    color: "from-rose-500/20 to-rose-500/5",
    border: "border-rose-500/20",
  },
  {
    icon: Scale,
    title: "Legal Compliance",
    description: "Stay compliant with all regulatory requirements.",
    features: ["ROC compliance", "FEMA advisory", "RBI compliance", "ESOP advisory", "M&A advisory"],
    href: "/services/legal-compliance",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
  },
]

export default function ServicesPage() {
  const [search, setSearch] = useState("")
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(true)
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("visible") },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = allServices.filter(
    (s) => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 lg:py-20 relative min-h-screen" ref={ref}>
        <div className="absolute inset-0 gradient-bg-mesh" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center max-w-2xl mx-auto mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="inline-block px-5 py-2 bg-gradient-to-r from-accent/10 to-accent/5 rounded-full text-accent text-sm font-medium mb-5 border border-accent/10">
              Our Expertise
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
              Comprehensive <span className="gradient-text">CA Services</span>
            </h1>
            <p className="text-muted text-lg">
              We offer a full spectrum of chartered accountancy services tailored to your needs.
            </p>
          </div>

          <div
            className="max-w-lg mx-auto relative mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border/50 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 text-sm transition-all card-shadow-sm"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((service, i) => (
              <div
                key={service.title}
                className="group relative p-6 lg:p-8 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/20 hover:border-accent/30 transition-all duration-500 card-shadow hover:card-shadow-lg hover:-translate-y-1"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1 + 0.2}s`,
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 card-shadow">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="relative text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="relative text-muted text-sm leading-relaxed mb-4">{service.description}</p>

                <ul className="relative space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="relative inline-flex items-center gap-2 text-accent font-medium text-sm group/link"
                >
                  View Details <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No services found matching &ldquo;{search}&rdquo;</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

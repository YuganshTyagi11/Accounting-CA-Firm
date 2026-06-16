"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Users,
  FileText,
  Receipt,
  ShieldCheck,
  Building2,
  PiggyBank,
  Scale,
  Phone,
  CalendarDays,
} from "lucide-react"

const servicesData: Record<string, {
  icon: typeof FileText
  title: string
  description: string
  benefits: string[]
  process: string[]
  faqs: { q: string; a: string }[]
}> = {
  "tax-filing": {
    icon: FileText,
    title: "Tax Filing & Returns",
    description: "We provide comprehensive income tax return filing services for individuals, businesses, and corporations. Our team ensures you claim every eligible deduction while staying fully compliant with the latest tax laws.",
    benefits: [
      "Maximize tax savings with expert planning",
      "Error-free filing with thorough review",
      "Timely submission to avoid penalties",
      "Dedicated CA for all your tax queries",
      "Digital document management",
    ],
    process: [
      "Document collection & review",
      "Tax computation & planning",
      "Return preparation & verification",
      "E-filing with digital signature",
      "Post-filing follow-up & support",
    ],
    faqs: [
      { q: "What documents are needed for ITR filing?", a: "Form 16, bank statements, investment proofs, home loan certificate, rent receipts, and previous year return." },
      { q: "What is the deadline for filing ITR?", a: "July 31 for individuals, September 30 for audited cases (extended occasionally by government)." },
      { q: "Can I file a revised return?", a: "Yes, you can file a revised return before December 31 of the assessment year." },
    ],
  },
  "gst-compliance": {
    icon: Receipt,
    title: "GST Compliance",
    description: "End-to-end GST compliance services including registration, return filing, input tax credit reconciliation, and audit support. We keep your business GST-ready at all times.",
    benefits: [
      "Hassle-free GST registration",
      "Accurate and timely return filing",
      "Maximum ITC claim assistance",
      "GST notice response support",
      "Regular compliance health checks",
    ],
    process: [
      "GST registration application",
      "Return filing schedule setup",
      "Monthly/quarterly return preparation",
      "ITC reconciliation",
      "Annual return & audit",
    ],
    faqs: [
      { q: "Who needs GST registration?", a: "Businesses with turnover exceeding Rs. 20 lakh (Rs. 10 lakh for special category states) or engaged in inter-state supply." },
      { q: "What are the different GST returns?", a: "GSTR-1 (outward supply), GSTR-3B (summary), GSTR-9 (annual). Composition dealers file CMP-08 and GSTR-4." },
    ],
  },
  "audit-assurance": {
    icon: ShieldCheck,
    title: "Audit & Assurance",
    description: "Comprehensive audit services that provide assurance to stakeholders, enhance credibility, and identify areas for business improvement.",
    benefits: [
      "Independent & unbiased assessment",
      "Regulatory compliance assurance",
      "Fraud detection & prevention",
      "Process improvement recommendations",
      "Stakeholder confidence building",
    ],
    process: [
      "Planning & risk assessment",
      "Internal control evaluation",
      "Substantive testing",
      "Reporting & recommendations",
      "Management letter issuance",
    ],
    faqs: [
      { q: "Is statutory audit mandatory?", a: "Yes, companies registered under Companies Act and entities meeting specified turnover thresholds require statutory audit." },
      { q: "How long does an audit take?", a: "Typically 2-4 weeks depending on the size and complexity of the entity." },
    ],
  },
  "company-registration": {
    icon: Building2,
    title: "Company Registration",
    description: "Complete business registration services from entity selection to incorporation. We help you choose the right structure and handle all legal formalities.",
    benefits: [
      "Expert entity selection guidance",
      "Complete documentation handling",
      "Fast-track incorporation",
      "Post-registration compliance",
      "PAN/TAN/GST registration included",
    ],
    process: [
      "Entity structure consultation",
      "Name approval application",
      "Document preparation & filing",
      "Certificate of incorporation",
      "Post-incorporation compliance",
    ],
    faqs: [
      { q: "Which business structure should I choose?", a: "It depends on your needs: Private Limited for funding, LLP for flexibility, Partnership for simplicity." },
      { q: "How long does company registration take?", a: "Private Limited: 7-14 days, LLP: 5-10 days, Partnership: 3-5 days." },
    ],
  },
  "financial-planning": {
    icon: PiggyBank,
    title: "Financial Planning",
    description: "Strategic financial planning services to help individuals and businesses achieve their financial goals through expert guidance and personalized strategies.",
    benefits: [
      "Personalized financial roadmap",
      "Tax-efficient investment strategies",
      "Retirement corpus planning",
      "Risk management & insurance cover",
      "Regular portfolio review",
    ],
    process: [
      "Financial goal assessment",
      "Net worth & cash flow analysis",
      "Risk profiling & asset allocation",
      "Investment strategy development",
      "Regular monitoring & rebalancing",
    ],
    faqs: [
      { q: "When should I start financial planning?", a: "The best time is now. Starting early maximizes the power of compounding." },
      { q: "What is the minimum investment required?", a: "We work with all budgets and customize plans based on your financial capacity." },
    ],
  },
  "legal-compliance": {
    icon: Scale,
    title: "Legal Compliance",
    description: "Comprehensive legal compliance services ensuring your business meets all statutory requirements under company law, SEBI, RBI, FEMA, and other regulations.",
    benefits: [
      "Complete regulatory compliance",
      "Penalty & litigation prevention",
      "Corporate governance support",
      "Board meeting & resolution management",
      "Annual filing assurance",
    ],
    process: [
      "Compliance requirement assessment",
      "Calendar of compliance deadlines",
      "Document preparation & filing",
      "Board meeting support",
      "Annual compliance certificate",
    ],
    faqs: [
      { q: "What is ROC compliance?", a: "ROC compliance involves filing annual returns, financial statements, and other forms with the Registrar of Companies." },
      { q: "What happens if compliance deadlines are missed?", a: "Late filing attracts penalties starting from Rs. 100 per day per form." },
    ],
  },
}

function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const service = servicesData[slug]

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Service Not Found</h1>
          <p className="text-muted mb-6">The service you are looking for does not exist.</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-all"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  const Icon = service.icon

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-primary font-medium">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-primary">{service.title}</h1>
                <p className="text-lg text-muted leading-relaxed">{service.description}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" /> Benefits
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2 p-3 rounded-xl bg-card border border-border/50">
                      <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-primary">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" /> Our Process
                </h2>
                <div className="space-y-3">
                  {service.process.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/50 card-shadow-sm">
                      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm text-primary pt-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" /> FAQs
                </h2>
                <div className="space-y-3">
                  {service.faqs.map((faq, i) => (
                    <details key={i} className="group p-4 rounded-xl bg-white border border-border/50 card-shadow-sm open:border-accent/30">
                      <summary className="text-sm font-medium text-primary cursor-pointer list-none flex items-center justify-between">
                        {faq.q}
                        <ArrowRight className="w-4 h-4 text-muted group-open:rotate-90 transition-transform shrink-0 ml-2" />
                      </summary>
                      <p className="text-sm text-muted mt-3 pt-3 border-t border-border/50">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-28 space-y-6">
                <div className="p-6 lg:p-8 rounded-2xl gradient-bg text-white card-shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Book a Consultation</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Get expert advice tailored to your {service.title.toLowerCase()} needs.
                  </p>
                  <Link
                    href="/book-consultation"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-light transition-all group"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Schedule Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border/50 card-shadow">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" /> Need Help?
                  </h3>
                  <p className="text-sm text-muted mb-4">
                    Speak directly with our team for immediate assistance.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+912245678900"
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border/50 hover:border-accent/30 transition-all"
                    >
                      <Phone className="w-5 h-5 text-accent" />
                      <span className="text-sm font-medium text-primary">+91 22 4567 8900</span>
                    </a>
                  </div>
                </div>

                <Link
                  href="/services"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage

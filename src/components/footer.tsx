import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative gradient-bg text-white overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">FinCore</span>
                <span className="text-[10px] font-medium text-accent -mt-0.5 tracking-widest uppercase">Advisors</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your trusted partner in financial compliance, tax planning, and business advisory services since 2010.
            </p>
            <div className="flex gap-2">
              {["L", "T", "I", "Y"].map((s, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-accent/20 flex items-center justify-center text-sm font-medium text-white/60 hover:text-accent transition-all duration-300 cursor-pointer border border-white/5"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-5">Quick Links</h3>
            <ul className="space-y-3.5">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Tax Calculators", href: "/tax-calculators" },
                { label: "Book Consultation", href: "/book-consultation" },
                { label: "Client Portal", href: "/client-portal" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-accent text-sm transition-all duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-5">Services</h3>
            <ul className="space-y-3.5">
              {[
                "Tax Filing & Returns",
                "GST Compliance",
                "Audit & Assurance",
                "Company Registration",
                "Financial Planning",
              ].map((s) => (
                <li key={s}>
                  <span className="text-white/50 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="text-white/50 text-sm">123 Business Tower, Financial District</span>
                  <br />
                  <span className="text-white/50 text-sm">Mumbai - 400001, India</span>
                </div>
              </li>
              {[
                { icon: Phone, text: "+91 22 4567 8900", href: "tel:+912245678900" },
                { icon: Mail, text: "hello@fincoreadvisors.in", href: "mailto:hello@fincoreadvisors.in" },
                { icon: Clock, text: "Mon - Sat: 9 AM - 7 PM" },
              ].map((item) => (
                <li key={item.text}>
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-200">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-white/50 text-sm group-hover:text-accent transition-colors duration-200">{item.text}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-white/50 text-sm">{item.text}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} FinCore Advisors. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((t) => (
              <Link key={t} href="#" className="text-white/30 hover:text-accent text-xs transition-colors duration-200">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

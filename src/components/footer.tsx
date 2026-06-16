import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">FinCore</span>
                <span className="text-[10px] font-medium text-accent -mt-0.5 tracking-widest uppercase">Advisors</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in financial compliance, tax planning, and business advisory services since 2010.
            </p>
            <div className="flex gap-3">
              {["L", "T", "I", "Y"].map((s, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-accent/30 flex items-center justify-center text-sm font-medium text-white/80 hover:text-accent transition-all cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Services", "Tax Calculators", "Book Consultation", "Client Portal"].map((link) => (
                <li key={link}>
                  <Link
                    href={link === "Home" ? "/" : `/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/70 hover:text-accent text-sm transition-colors flex items-center gap-1 group"
                  >
                    {link}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Tax Filing & Returns",
                "GST Compliance",
                "Audit & Assurance",
                "Company Registration",
                "Financial Planning",
              ].map((s) => (
                <li key={s}>
                  <span className="text-white/70 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-white/70 text-sm">
                  123 Business Tower, Financial District<br />Mumbai - 400001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/70 text-sm">+91 22 4567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/70 text-sm">hello@fincoreadvisors.in</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span className="text-white/70 text-sm">Mon - Sat: 9 AM - 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} FinCore Advisors. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Disclaimer"].map((t) => (
              <Link key={t} href="#" className="text-white/50 hover:text-accent text-xs transition-colors">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Calculator, CalendarDays, Briefcase, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Tax Calculators", href: "/tax-calculators", icon: Calculator },
  { label: "Book Consultation", href: "/book-consultation", icon: CalendarDays },
  { label: "Client Portal", href: "/client-portal", icon: LayoutDashboard },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-white/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center card-shadow-sm group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">FinCore</span>
              <span className="text-[10px] font-medium text-accent -mt-0.5 tracking-widest uppercase">Advisors</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted hover:text-primary rounded-xl hover:bg-primary/5 transition-all duration-200"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
            <Link
              href="/book-consultation"
              className="ml-3 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all duration-300 card-shadow hover:card-shadow-lg"
            >
              Get Started
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-primary/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white/98 backdrop-blur-xl transition-all duration-300 ease-in-out",
          mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-4 text-base font-medium text-muted hover:text-primary rounded-2xl hover:bg-primary/5 transition-all duration-200"
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              {item.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border/50">
            <Link
              href="/book-consultation"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center px-4 py-4 bg-primary text-white text-base font-semibold rounded-2xl hover:bg-primary-light transition-all duration-300 card-shadow"
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

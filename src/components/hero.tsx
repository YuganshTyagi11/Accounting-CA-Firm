"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, TrendingUp, Shield, DollarSign, Users } from "lucide-react"

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 gradient-bg-mesh" />

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #0b1a2e 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(2rem)",
        }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 transition-all duration-1000 ease-out w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div
              style={{ transitionDelay: "200ms" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
              Trusted by 500+ businesses across India
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary leading-[1.05] tracking-tight">
              Your Financial
              <br />
              <span className="gradient-text">Growth Partner</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted leading-relaxed max-w-xl">
              Expert CA services for tax planning, GST compliance, business registration, and financial advisory
              tailored for your success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-consultation"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:bg-primary-light card-shadow-lg hover:glow-accent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Free Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/15 text-primary font-semibold rounded-2xl hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 glass-card"
              >
                Our Services
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4">
              {[
                { icon: CheckCircle, text: "Income Tax Filing" },
                { icon: CheckCircle, text: "GST Registration" },
                { icon: CheckCircle, text: "Audit Services" },
                { icon: CheckCircle, text: "Company Formation" },
              ].map((item, i) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm text-muted"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <item.icon className="w-4 h-4 text-accent" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative group">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-3xl -rotate-6 group-hover:rotate-0 transition-transform duration-500" />

              <div className="relative w-[480px] gradient-bg rounded-3xl card-shadow-lg overflow-hidden">
                {/* Accent gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent" />

                <div className="p-8 lg:p-10">
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: TrendingUp, label: "Returns Filed", value: "15,000+" },
                      { icon: Shield, label: "Satisfaction", value: "98%" },
                      { icon: Users, label: "Clients", value: "500+" },
                      { icon: DollarSign, label: "Tax Saved", value: "₹50Cr+" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-all duration-300"
                      >
                        <stat.icon className="w-5 h-5 text-accent mb-2" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Trust badge */}
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center text-2xl">
                        ⚖️
                      </div>
                      <div>
                        <div className="text-white font-semibold">25+ Years of Excellence</div>
                        <div className="text-white/50 text-sm">Trusted by startups to enterprises</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-muted/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent/50 animate-bounce" />
        </div>
      </div>
    </section>
  )
}

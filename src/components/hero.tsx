"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(2rem)" }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 transition-all duration-700">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Trusted by 500+ businesses
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight">
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all card-shadow hover:card-shadow-lg group"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-primary/20 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-all"
              >
                Our Services
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4">
              {[
                "Income Tax Filing",
                "GST Registration",
                "Audit Services",
                "Company Formation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-[450px] h-[500px] gradient-bg rounded-3xl card-shadow-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <span className="text-5xl">⚖️</span>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-2">25+ Years</h3>
                  <p className="text-white/70">of Excellence in Financial Services</p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      ["500+", "Clients"],
                      ["98%", "Satisfaction"],
                      ["50+", "CA Partners"],
                      ["15K+", "Returns Filed"],
                    ].map(([num, label]) => (
                      <div key={label} className="bg-white/5 rounded-xl p-4">
                        <div className="text-2xl font-bold text-accent">{num}</div>
                        <div className="text-white/60 text-xs">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

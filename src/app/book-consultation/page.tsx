"use client"

import { useState } from "react"
import { CalendarDays, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ArrowRight } from "lucide-react"

type Step = "details" | "datetime" | "confirm"

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
]

const services = [
  "Tax Filing & Returns",
  "GST Compliance",
  "Audit & Assurance",
  "Company Registration",
  "Financial Planning",
  "Legal Compliance",
  "General Consultation",
]

export default function BookConsultationPage() {
  const [step, setStep] = useState<Step>("details")
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", message: "",
    date: "", time: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("fincore_bookings") || "[]")
      existing.push({ ...form, id: Date.now(), createdAt: new Date().toISOString() })
      localStorage.setItem("fincore_bookings", JSON.stringify(existing))
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-24 lg:pt-28 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary mb-3">Booking Confirmed!</h1>
          <p className="text-muted mb-2">
            Thank you, <span className="font-semibold text-primary">{form.name}</span>!
          </p>
          <p className="text-muted text-sm mb-1">
            We have scheduled your consultation for{" "}
            <span className="font-semibold text-primary">{form.date}</span> at{" "}
            <span className="font-semibold text-primary">{form.time}</span>.
          </p>
          <p className="text-muted text-sm mb-8">
            A confirmation has been sent to <span className="font-semibold text-primary">{form.email}</span>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setStep("details"); setForm({ name: "", email: "", phone: "", service: "", message: "", date: "", time: "" }) }}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-all font-medium"
          >
            Book Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-4">
              <CalendarDays className="w-4 h-4" /> Free Consultation
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">Book a Consultation</h1>
            <p className="text-muted text-lg">
              Schedule a free 30-minute call with our expert CAs. No obligations, just clarity.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {(["details", "datetime", "confirm"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step === s
                      ? "bg-primary text-white card-shadow"
                      : ["details", "datetime"].includes(step) && (s === "details" || s === "datetime")
                        ? step !== s
                          ? s === "details"
                            ? "bg-primary/20 text-primary"
                            : "bg-border text-muted"
                          : "bg-primary/20 text-primary"
                        : step === s
                          ? "bg-primary text-white"
                          : "bg-border text-muted"
                  }`}
                >
                  {i + 1}
                </div>
                <span className={`text-xs font-medium capitalize ${step === s ? "text-primary" : "text-muted"}`}>
                  {s}
                </span>
                {i < 2 && <div className="w-8 h-0.5 bg-border mx-1" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === "details" && (
              <div className="bg-white rounded-2xl border border-border/50 card-shadow-lg p-6 lg:p-8 space-y-5">
                <h2 className="text-xl font-semibold text-primary mb-2">Your Details</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-2">
                      <User className="w-4 h-4 text-muted" /> Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted" /> Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted" /> Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted" /> Service Needed
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted" /> Message (Optional)
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="button"
                  onClick={() => form.name && form.email && form.phone ? setStep("datetime") : null}
                  className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    form.name && form.email && form.phone
                      ? "bg-primary text-white hover:bg-primary-light card-shadow"
                      : "bg-border text-muted cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === "datetime" && (
              <div className="bg-white rounded-2xl border border-border/50 card-shadow-lg p-6 lg:p-8 space-y-5">
                <h2 className="text-xl font-semibold text-primary mb-2">Select Date & Time</h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-muted" /> Preferred Date *
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    min={today}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted" /> Preferred Time *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => update("time", t)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          form.time === t
                            ? "bg-primary text-white card-shadow"
                            : "bg-card border border-border/50 text-muted hover:border-primary/30"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="flex-1 px-6 py-3 border-2 border-border text-muted font-semibold rounded-xl hover:bg-card-hover transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => form.date && form.time ? setStep("confirm") : null}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      form.date && form.time
                        ? "bg-primary text-white hover:bg-primary-light card-shadow"
                        : "bg-border text-muted cursor-not-allowed"
                    }`}
                  >
                    Review <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="bg-white rounded-2xl border border-border/50 card-shadow-lg p-6 lg:p-8 space-y-5">
                <h2 className="text-xl font-semibold text-primary mb-2">Confirm Your Booking</h2>

                <div className="space-y-3 p-5 rounded-xl bg-card border border-border/50">
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "Phone", value: form.phone },
                    { label: "Service", value: form.service || "General" },
                    { label: "Date", value: form.date },
                    { label: "Time", value: form.time },
                    { label: "Message", value: form.message || "N/A" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-sm text-muted">{item.label}</span>
                      <span className="text-sm font-medium text-primary text-right">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep("datetime")}
                    className="flex-1 px-6 py-3 border-2 border-border text-muted font-semibold rounded-xl hover:bg-card-hover transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all card-shadow flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" /> Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}

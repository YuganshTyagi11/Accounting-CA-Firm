"use client"

import { useState } from "react"
import { Calculator, IndianRupee, Percent, ArrowRight, Info } from "lucide-react"
import { calculateIncomeTax, calculateGST, calculateTDS, calculateHRA, gstRates, tdsSections } from "@/lib/tax-calculations"

type Tab = "income-tax" | "gst" | "tds" | "hra"

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)
}

function IncomeTaxCalc() {
  const [income, setIncome] = useState("800000")
  const [regime, setRegime] = useState<"old" | "new">("new")
  const result = calculateIncomeTax(Number(income) || 0, regime)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Annual Income (INR)</label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
            placeholder="Enter your annual income"
          />
        </div>
      </div>

      <div className="flex gap-2">
        {(["new", "old"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRegime(r)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              regime === r
                ? "bg-primary text-white card-shadow"
                : "bg-card border border-border/50 text-muted hover:border-primary/30"
            }`}
          >
            {r === "new" ? "New Regime" : "Old Regime"}
          </button>
        ))}
      </div>

      {Number(income) > 0 && (
        <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Taxable Income</span>
            <span className="font-semibold text-primary">{formatINR(Number(income))}</span>
          </div>
          {result.rebate > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-green-600">Rebate u/s 87A</span>
              <span className="font-semibold text-green-600">-{formatINR(result.rebate)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Income Tax</span>
            <span className="font-semibold text-primary">
              {formatINR(Math.max(0, result.tax - result.rebate))}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Health & Education Cess (4%)</span>
            <span className="font-semibold text-primary">{formatINR(result.cess)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-base font-bold text-primary">Total Tax Payable</span>
            <span className="text-lg font-bold text-accent">
              {formatINR(Math.max(0, result.total - result.rebate))}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

function GSTCalc() {
  const [amount, setAmount] = useState("100000")
  const [rate, setRate] = useState(18)
  const [type, setType] = useState<"intra" | "inter">("intra")
  const result = calculateGST(Number(amount) || 0, rate, type)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Taxable Value (INR)</label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">GST Rate</label>
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
        >
          {gstRates.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        {(["intra", "inter"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              type === t
                ? "bg-primary text-white card-shadow"
                : "bg-card border border-border/50 text-muted hover:border-primary/30"
            }`}
          >
            {t === "intra" ? "Intra-State" : "Inter-State"}
          </button>
        ))}
      </div>

      {Number(amount) > 0 && (
        <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Taxable Value</span>
            <span className="font-semibold text-primary">{formatINR(result.taxableValue)}</span>
          </div>
          {type === "intra" ? (
            <>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted">CGST (9%)</span>
                <span className="font-semibold text-primary">{formatINR(result.cgst)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted">SGST (9%)</span>
                <span className="font-semibold text-primary">{formatINR(result.sgst)}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-center py-2 border-b border-border/50">
              <span className="text-sm text-muted">IGST (18%)</span>
              <span className="font-semibold text-primary">{formatINR(result.igst)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Total GST</span>
            <span className="font-semibold text-primary">{formatINR(result.totalGst)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-base font-bold text-primary">Total (incl. GST)</span>
            <span className="text-lg font-bold text-accent">{formatINR(result.totalWithGst)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function TDSCalc() {
  const [amount, setAmount] = useState("50000")
  const [section, setSection] = useState("194J")
  const result = calculateTDS(Number(amount) || 0, section)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Payment Amount (INR)</label>
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">TDS Section</label>
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
        >
          {tdsSections.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {Number(amount) > 0 && (
        <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Section</span>
            <span className="font-semibold text-primary">{result.section}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">TDS Rate</span>
            <span className="font-semibold text-primary">{result.rate}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">TDS Amount</span>
            <span className="font-semibold text-primary">{formatINR(result.tds)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-base font-bold text-primary">Net Payable</span>
            <span className="text-lg font-bold text-accent">{formatINR(result.netAmount)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function HRACalc() {
  const [rent, setRent] = useState("20000")
  const [salary, setSalary] = useState("80000")
  const [metro, setMetro] = useState(true)
  const result = calculateHRA(Number(rent) || 0, Number(salary) || 0, metro)

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Monthly Rent (INR)</label>
          <input
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Basic Salary (INR)</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2">
        {[{ label: "Metro City", value: true }, { label: "Non-Metro", value: false }].map((o) => (
          <button
            key={o.label}
            onClick={() => setMetro(o.value)}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              metro === o.value
                ? "bg-primary text-white card-shadow"
                : "bg-card border border-border/50 text-muted hover:border-primary/30"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {Number(rent) > 0 && Number(salary) > 0 && (
        <div className="space-y-3 p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border/50">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Actual HRA Received</span>
            <span className="font-semibold text-primary">{formatINR(result.actualHRA)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">Rent - 10% of Salary</span>
            <span className="font-semibold text-primary">{formatINR(result.rentExcess)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">50% / 40% of Salary</span>
            <span className="font-semibold text-primary">{formatINR(result.fiftyPercent)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-sm text-muted">HRA Exemption</span>
            <span className="font-semibold text-green-600">{formatINR(result.exemption)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-base font-bold text-primary">Taxable HRA</span>
            <span className="text-lg font-bold text-accent">{formatINR(result.taxableHRA)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

const tabs: { id: Tab; label: string; desc: string }[] = [
  { id: "income-tax", label: "Income Tax", desc: "Calculate your income tax liability under old and new regime" },
  { id: "gst", label: "GST", desc: "Compute GST amount for goods and services" },
  { id: "tds", label: "TDS", desc: "Calculate TDS on various payments" },
  { id: "hra", label: "HRA", desc: "Calculate HRA exemption for salaried employees" },
]

export default function TaxCalculatorsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("income-tax")

  return (
    <div className="pt-24 lg:pt-28">
      <section className="py-12 lg:py-16 bg-gradient-to-b from-primary/5 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" /> Free Tools
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">Tax Calculators</h1>
            <p className="text-muted text-lg">
              Use our free online calculators to estimate your taxes instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-1">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`shrink-0 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-white card-shadow"
                        : "bg-white border border-border/50 text-muted hover:border-primary/30"
                    }`}
                  >
                    <div className="text-sm font-medium whitespace-nowrap">{tab.label}</div>
                    <div className={`text-xs mt-0.5 ${activeTab === tab.id ? "text-white/70" : "text-muted"}`}>
                      {tab.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl border border-border/50 card-shadow-lg p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-primary">
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-xs text-muted">{tabs.find((t) => t.id === activeTab)?.desc}</p>
                  </div>
                </div>

                {activeTab === "income-tax" && <IncomeTaxCalc />}
                {activeTab === "gst" && <GSTCalc />}
                {activeTab === "tds" && <TDSCalc />}
                {activeTab === "hra" && <HRACalc />}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20 flex items-start gap-3">
                <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted">
                  These calculations are for reference purposes only. Actual tax liability may vary based on your specific
                  financial situation. Please consult with our CA for accurate tax planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

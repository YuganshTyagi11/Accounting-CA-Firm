export function calculateIncomeTax(income: number, regime: "old" | "new") {
  if (regime === "new") {
    let tax = 0
    if (income <= 300000) tax = 0
    else if (income <= 600000) tax = (income - 300000) * 0.05
    else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1
    else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15
    else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2
    else tax = 150000 + (income - 1500000) * 0.3
    const cess = tax * 0.04
    return { tax, cess, total: tax + cess, rebate: income <= 700000 ? Math.min(tax, 25000) : 0 }
  } else {
    const deduction = 50000
    const taxable = Math.max(0, income - deduction)
    let tax = 0
    if (taxable <= 250000) tax = 0
    else if (taxable <= 500000) tax = (taxable - 250000) * 0.05
    else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2
    else tax = 112500 + (taxable - 1000000) * 0.3
    const cess = tax * 0.04
    const rebate = taxable <= 500000 ? Math.min(tax, 12500) : 0
    return { tax, cess, total: tax + cess, rebate }
  }
}

export function calculateGST(amount: number, rate: number, type: "intra" | "inter") {
  const gst = (amount * rate) / 100
  if (type === "intra") {
    return {
      taxableValue: amount,
      cgst: gst / 2,
      sgst: gst / 2,
      igst: 0,
      totalGst: gst,
      totalWithGst: amount + gst,
    }
  }
  return {
    taxableValue: amount,
    cgst: 0,
    sgst: 0,
    igst: gst,
    totalGst: gst,
    totalWithGst: amount + gst,
  }
}

export function calculateTDS(amount: number, section: string) {
  const rates: Record<string, number> = {
    "192": 10, "194A": 10, "194C": 2, "194D": 10,
    "194H": 10, "194I": 10, "194J": 10, "194N": 2,
  }
  const rate = rates[section] || 10
  const tds = (amount * rate) / 100
  return { amount, rate, tds, netAmount: amount - tds, section }
}

export function calculateHRA(rent: number, salary: number, metro: boolean) {
  const actualHRA = salary * 0.5
  const rentExcess = rent - salary * 0.1
  const fiftyPercent = metro ? salary * 0.5 : salary * 0.4
  const exemption = Math.min(actualHRA, rentExcess, fiftyPercent)
  const taxableHRA = actualHRA - exemption
  return { actualHRA, rentExcess, fiftyPercent, exemption, taxableHRA }
}

export const gstRates = [
  { label: "Essential goods (5%)", value: 5 },
  { label: "Standard goods (12%)", value: 12 },
  { label: "Standard goods (18%)", value: 18 },
  { label: "Luxury goods (28%)", value: 28 },
]

export const tdsSections = [
  { label: "Section 192 - Salary", value: "192" },
  { label: "Section 194A - Interest", value: "194A" },
  { label: "Section 194C - Contractor", value: "194C" },
  { label: "Section 194D - Insurance", value: "194D" },
  { label: "Section 194H - Commission", value: "194H" },
  { label: "Section 194I - Rent", value: "194I" },
  { label: "Section 194J - Professional Fees", value: "194J" },
]

"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard, FileText, Upload, Clock, Download, Eye,
  LogIn, Mail, Lock, User, ArrowRight, CheckCircle, X, AlertCircle, Plus,
} from "lucide-react"

interface Document {
  id: number
  name: string
  uploadedAt: string
  size: string
  status: "verified" | "pending" | "rejected"
}

interface Booking {
  id: number
  name: string
  date: string
  time: string
  service: string
  createdAt: string
}

function PortalDashboard({ onLogout }: { onLogout: () => void }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [docName, setDocName] = useState("")

  useEffect(() => {
    const docs = JSON.parse(localStorage.getItem("fincore_documents") || "[]")
    const books = JSON.parse(localStorage.getItem("fincore_bookings") || "[]")
    setDocuments(docs)
    setBookings(books)
  }, [])

  const handleUpload = () => {
    if (!docName.trim()) return
    const newDoc: Document = {
      id: Date.now(),
      name: docName,
      uploadedAt: new Date().toLocaleDateString("en-IN"),
      size: "Pending scan",
      status: "pending",
    }
    const updated = [...documents, newDoc]
    setDocuments(updated)
    localStorage.setItem("fincore_documents", JSON.stringify(updated))
    setDocName("")
    setShowUpload(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary">Welcome back!</h1>
          <p className="text-muted">Manage your documents and track consultations.</p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2.5 border border-border text-muted text-sm font-medium rounded-xl hover:bg-card-hover transition-all"
        >
          Logout
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: FileText, label: "Documents", value: documents.length, color: "text-blue-600 bg-blue-50" },
          { icon: CheckCircle, label: "Verified", value: documents.filter((d) => d.status === "verified").length, color: "text-green-600 bg-green-50" },
          { icon: Clock, label: "Consultations", value: bookings.length, color: "text-accent bg-accent/10" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-2xl bg-white border border-border/50 card-shadow">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${stat.color.split(" ")[1]}`}>
                <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[0]}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-border/50 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" /> My Documents
            </h2>
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-light transition-all"
            >
              <Plus className="w-4 h-4" /> Upload
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No documents uploaded yet.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-5 h-5 text-muted shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{doc.name}</p>
                      <p className="text-xs text-muted">{doc.uploadedAt} &middot; {doc.size}</p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-1 rounded-lg font-medium ${
                      doc.status === "verified"
                        ? "bg-green-50 text-green-600"
                        : doc.status === "rejected"
                          ? "bg-red-50 text-red-600"
                          : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-white border border-border/50 card-shadow">
          <h2 className="text-lg font-semibold text-primary flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-accent" /> Recent Consultations
          </h2>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-muted">
              <CalendarDays className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No consultations booked yet.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {bookings.slice().reverse().map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/50"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{b.name.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-primary truncate">{b.name}</p>
                      <p className="text-xs text-muted">
                        {b.date} at {b.time} &middot; {b.service}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs px-2 py-1 rounded-lg bg-green-50 text-green-600 font-medium">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
          <a
            href="/book-consultation"
            className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-border text-sm font-medium rounded-xl hover:bg-card-hover transition-all text-muted"
          >
            Book New Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full card-shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">Upload Document</h3>
              <button onClick={() => setShowUpload(false)} className="p-1 hover:bg-card-hover rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary">Document Name</label>
              <input
                type="text"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g., PAN Card, ITR Acknowledgment"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleUpload()}
              />
            </div>
            <button
              onClick={handleUpload}
              disabled={!docName.trim()}
              className="w-full px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-all disabled:bg-border disabled:text-muted"
            >
              Upload Document
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function PortalLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">Client Portal</h1>
          <p className="text-muted text-sm mt-1">Access your documents and consultation history.</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-border/50 card-shadow-lg p-6 lg:p-8 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted" /> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm"
              placeholder="Enter any password to continue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-all card-shadow flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <p className="text-xs text-muted text-center">
            Demo portal: enter any email and password to explore.
          </p>
        </form>
      </div>
    </div>
  )
}

import { CalendarDays } from "lucide-react"

export default function ClientPortalPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("fincore_portal_logged_in")
    if (stored === "true") setLoggedIn(true)
  }, [])

  const handleLogin = () => {
    setLoggedIn(true)
    localStorage.setItem("fincore_portal_logged_in", "true")
  }

  const handleLogout = () => {
    setLoggedIn(false)
    localStorage.setItem("fincore_portal_logged_in", "false")
  }

  if (!loggedIn) return <PortalLogin onLogin={handleLogin} />

  return (
    <div className="pt-24 lg:pt-28 pb-12 min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortalDashboard onLogout={handleLogout} />
      </div>
    </div>
  )
}

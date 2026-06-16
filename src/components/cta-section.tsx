import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-8 lg:p-16 text-center card-shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Simplify Your Finances?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Book a free consultation with our expert CAs and discover how we can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-primary font-semibold rounded-xl hover:bg-accent-light transition-all group"
              >
                Schedule Free Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="tel:+912245678900"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                +91 22 4567 8900
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

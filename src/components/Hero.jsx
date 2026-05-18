import { ArrowRight, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-green-glow blur-3xl -top-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Badge */}
        <div
          data-reveal
          data-reveal-effect="fade"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/30 bg-green/5 text-green text-xs sm:text-sm font-medium mb-6 md:mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green animate-pulse"></span>
          Live Season 2026 — Ongoing Results
        </div>

        {/* Headline */}
        <h1
          data-reveal
          data-reveal-effect="big"
          className="font-bricolage font-bold mb-5 md:mb-6 leading-tight text-3xl sm:text-4xl md:text-6xl"
        >
          Consistent edges. <br className="hidden sm:block" />
          Transparent results. <br className="hidden sm:block" />
          <em className="text-green not-italic">Every single week.</em>
        </h1>

        {/* Subheading */}
        <p
          data-reveal
          className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mb-8 md:mb-10 leading-relaxed"
        >
          Daily sports betting tips delivered straight to your Telegram. Fully tracked in units,
          completely transparent — for beginners and seasoned punters alike.
        </p>

        {/* Stats */}
        <div
          data-reveal
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 md:mb-10 max-w-2xl"
        >
          <div
            data-reveal
            data-reveal-effect="fade"
            style={{ '--reveal-delay': '80ms' }}
            className="px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-green/20 hover:border-green/50 transition-colors"
          >
            <div
              data-countup="127.8"
              data-prefix="+"
              data-suffix="U"
              className="font-mono text-xl sm:text-2xl font-bold text-green"
            >
              +0U
            </div>
            <div className="text-xs sm:text-sm text-text-muted">Singles 2024</div>
          </div>

          <div
            data-reveal
            data-reveal-effect="fade"
            style={{ '--reveal-delay': '120ms' }}
            className="px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-green/20 hover:border-green/50 transition-colors"
          >
            <div
              data-countup="62.3"
              data-prefix="+"
              data-suffix="U"
              className="font-mono text-xl sm:text-2xl font-bold text-green"
            >
              +0U
            </div>
            <div className="text-xs sm:text-sm text-text-muted">Multis 2025</div>
          </div>

          <div
            data-reveal
            data-reveal-effect="fade"
            style={{ '--reveal-delay': '160ms' }}
            className="px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-green/20 hover:border-green/50 transition-colors col-span-2 md:col-span-1"
          >
            <div
              data-countup="56.78"
              data-prefix="+"
              data-suffix="U"
              className="font-mono text-xl sm:text-2xl font-bold text-green"
            >
              +0U
            </div>
            <div className="text-xs sm:text-sm text-text-muted">Singles 2026 YTD</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
          <button
            data-reveal
            data-reveal-effect="fade"
            className="px-6 sm:px-8 py-3 rounded-lg bg-green text-black font-semibold hover:bg-green-dim transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Get Season Pass <ArrowRight size={18} />
          </button>

          <button
            data-reveal
            data-reveal-effect="fade"
            className="px-6 sm:px-8 py-3 rounded-lg border border-green/50 text-green font-semibold hover:bg-green/10 transition-all transform hover:-translate-y-0.5"
          >
            Join Waitlist
          </button>
        </div>

        {/* Guarantee */}
        <div
          data-reveal
          className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-text-muted max-w-xl"
        >
          <Shield size={18} className="text-green flex-shrink-0 mt-0.5 sm:mt-0" />
          <span>
            Full refund guarantee on $150 season pass if no profit by Round 12
          </span>
        </div>
      </div>
    </section>
  )
}
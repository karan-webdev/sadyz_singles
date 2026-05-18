import { ArrowRight, Shield } from 'lucide-react'
import hero from "../assets/hero-left.png"
import hero2 from "../assets/hero2-portrait.png"

export default function Hero() {
  return (
    <>
      <style>{`
        /* SIMPLE STAGGER FADE SYSTEM */
        .fade {
          opacity: 0;
          transform: translateY(14px);
          animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.15s; }
        .d3 { animation-delay: 0.25s; }
        .d4 { animation-delay: 0.35s; }
        .d5 { animation-delay: 0.45s; }
        .d6 { animation-delay: 0.55s; }
        .d7 { animation-delay: 0.65s; }
      `}</style>

      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">

            {/* LEFT */}
            <div className="flex-1 md:pr-10">

              {/* Guarantee */}
              <div
                data-reveal
                className="fade d1 flex items-start sm:items-center gap-3 mb-6 text-xs sm:text-sm text-text-muted max-w-xl"
              >
                <Shield size={18} className="text-green flex-shrink-0 mt-0" />
                <span>
                  $150 season pass refund if no profit by Round 12
                </span>
              </div>

              {/* Headline */}
              <h1 className="fade d2 font-bricolage font-bold mb-5 md:mb-6 leading-tight text-3xl sm:text-4xl md:text-6xl">
                Consistent edges. <span className="whitespace-nowrap">Transparent results.</span><br />
                <em className="text-green not-italic">Every single week.</em>
              </h1>

              {/* Subtext */}
              <p className="fade d3 text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mb-8 md:mb-10 leading-relaxed">
                Daily sports betting tips delivered straight to your Telegram. Fully tracked in units with transparent results.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 md:mb-10 max-w-2xl">

                <div className="fade d4 px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-white/10 hover:border-green/50 transition-colors">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-green">
                    +127.8U
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted">
                    Singles 2024
                  </div>
                </div>

                <div className="fade d5 px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-white/10 hover:border-green/50 transition-colors">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-green">
                    +62.3U
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted">
                    Multis 2025
                  </div>
                </div>

                <div className="fade d6 px-3 sm:px-4 py-3 rounded-xl bg-bg-card border border-white/10 hover:border-green/50 transition-colors col-span-2 md:col-span-1">
                  <div className="font-mono text-xl sm:text-2xl font-bold text-green">
                    +56.78U
                  </div>
                  <div className="text-xs sm:text-sm text-text-muted">
                    Singles 2026 YTD
                  </div>
                </div>

              </div>

              {/* CTAs */}
              <div className="fade d7 flex flex-col sm:flex-row gap-3 sm:gap-4">

                <button className="btn-primary px-6 sm:px-8 py-3 rounded-lg bg-green text-black font-semibold hover:bg-green-dim transition-all flex items-center justify-center gap-2">
                  Get Season Pass <ArrowRight size={18} />
                </button>

                <button className="px-6 sm:px-8 py-3 rounded-lg border border-white/10 text-white font-semibold hover:bg-white/5 transition-all">
                  Join Waitlist
                </button>

              </div>

            </div>

            {/* RIGHT (UNCHANGED) */}
            <div className="flex-1 hidden lg:flex items-center justify-center mt-2 md:pl-12">

              <div className="relative flex items-center justify-center w-[240px] sm:w-[280px] md:w-[320px] h-[520px]">

                <img
                  src={hero2}
                  alt="Telegram secondary mockup"
                  className="absolute z-0 w-full object-contain scale-[0.82] translate-x-24 -translate-y-10 drop-shadow-2xl"
                />

                <img
                  src={hero}
                  alt="Telegram mockup"
                  className="relative z-10 w-full object-contain drop-shadow-2xl"
                />

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}
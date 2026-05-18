import { ArrowRight, Check, Lock } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-[#f6f7f9] border-t border-gray-200"
      data-reveal
      data-reveal-effect="big"
    >
      {/* subtle glow */}
      <div className="absolute inset-0 bg-green/5 blur-3xl opacity-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        <div className="text-green text-sm font-semibold tracking-wide uppercase mb-4">
          GET STARTED TODAY
        </div>

        <h2 className="text-4xl md:text-5xl font-bricolage font-bold mb-6 text-black">
          Ready to bet with a real edge?
        </h2>

        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of punters getting consistent results. No hype. No complicated systems. Just daily tips that work.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          <button className="btn-primary px-8 py-4 rounded-lg bg-green text-black font-bold text-lg hover:bg-green-dim transition-all transform  flex items-center justify-center gap-2">
            Get Season Pass <ArrowRight size={20} />
          </button>

          <button className="px-8 py-4 rounded-lg border-2 border-gray-300 text-black font-bold text-lg hover:bg-black/5 transition-all transform">
            Join Multis (Open Now)
          </button>

        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            Full money-back guarantee
          </div>

          <div className="hidden sm:block text-gray-300">•</div>

          <div className="flex items-center gap-2">
            <Lock size={18} className="text-green" />
            100% transparent tracking
          </div>

          <div className="hidden sm:block text-gray-300">•</div>

          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            No hidden fees
          </div>

        </div>

      </div>
    </section>
  )
}
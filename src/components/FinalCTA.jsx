import { ArrowRight, Check, Lock } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden" data-reveal data-reveal-effect="big">
      {/* Glow background */}
      <div className="absolute inset-0 bg-green-glow blur-3xl -bottom-40"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <div data-reveal data-reveal-effect="fade" className="text-green text-sm font-semibold tracking-wide uppercase mb-4">GET STARTED TODAY</div>
        
        <h2 data-reveal className="text-4xl md:text-5xl font-bricolage font-bold mb-6">
          Ready to bet with a real edge?
        </h2>
        
        <p data-reveal className="text-lg text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of punters getting consistent results. No hype. No complicated systems. Just daily tips that work.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button data-reveal data-reveal-effect="fade" className="px-8 py-4 rounded-lg bg-green text-black font-bold text-lg hover:bg-green-dim transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
            Get Season Pass <ArrowRight size={20} />
          </button>
          <button data-reveal data-reveal-effect="fade" className="px-8 py-4 rounded-lg border-2 border-green text-green font-bold text-lg hover:bg-green/10 transition-all transform hover:-translate-y-0.5">
            Join Multis (Open Now)
          </button>
        </div>

        {/* Trust badges */}
        <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            Full money-back guarantee
          </div>
          <div className="hidden sm:block text-text-dim">•</div>
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-green" />
            100% transparent tracking
          </div>
          <div className="hidden sm:block text-text-dim">•</div>
          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            No hidden fees
          </div>
        </div>
      </div>
    </section>
  )
}

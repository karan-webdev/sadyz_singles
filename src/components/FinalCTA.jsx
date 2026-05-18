import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Lock } from 'lucide-react'

export default function FinalCTA() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-[#f6f7f9] border-t border-gray-200"
    >
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .show {
          opacity: 1;
          transform: translateY(0);
        }

        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }
        .d4 { transition-delay: 0.35s; }
        .d5 { transition-delay: 0.45s; }

        /* buttons slightly stronger motion */
        .btn {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .btn.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* badges */
        .badge {
          opacity: 0;
          transform: translateY(16px);
          transition: all 0.6s ease;
        }

        .badge.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* subtle glow */}
      <div className="absolute inset-0 bg-green/5 blur-3xl opacity-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        <div className={`reveal d1 ${visible ? "show" : ""} text-green text-sm font-semibold tracking-wide uppercase mb-4`}>
          GET STARTED TODAY
        </div>

        <h2 className={`reveal d2 ${visible ? "show" : ""} text-4xl md:text-5xl font-bricolage font-bold mb-6 text-black`}>
          Ready to bet with a real edge?
        </h2>

        <p className={`reveal d3 ${visible ? "show" : ""} text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed`}>
          Join thousands of punters getting consistent results. No hype. No complicated systems. Just daily tips that work.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          <button className={`btn d4 ${visible ? "show" : ""} btn-primary px-8 py-4 rounded-lg bg-green text-black font-bold text-lg hover:bg-green-dim transition-all flex items-center justify-center gap-2`}>
            Get Season Pass <ArrowRight size={20} />
          </button>

          <button className={`btn d5 ${visible ? "show" : ""} px-8 py-4 rounded-lg border-2 border-gray-300 text-black font-bold text-lg hover:bg-black/5 transition-all`}>
            Join Multis (Open Now)
          </button>

        </div>

        {/* Trust badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">

          <div className={`badge ${visible ? "show" : ""} flex items-center gap-2`}>
            <Check size={18} className="text-green" />
            Full money-back guarantee
          </div>

          <div className="hidden sm:block text-gray-300">•</div>

          <div className={`badge ${visible ? "show" : ""} flex items-center gap-2`}>
            <Lock size={18} className="text-green" />
            100% transparent tracking
          </div>

          <div className="hidden sm:block text-gray-300">•</div>

          <div className={`badge ${visible ? "show" : ""} flex items-center gap-2`}>
            <Check size={18} className="text-green" />
            No hidden fees
          </div>

        </div>

      </div>
    </section>
  )
}
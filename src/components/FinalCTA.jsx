import { useEffect, useRef } from "react"
import { ArrowRight, Check, Lock } from "lucide-react"

export default function FinalCTA() {
  const elementsRef = useRef([])

  const addRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")
            obs.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
      }
    )

    elementsRef.current.forEach((el) => el && obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return (
    <section className="relative py-24 overflow-hidden bg-[#f6f7f9] border-t border-gray-200">

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

        .btn {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .btn.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

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

      <div className="absolute inset-0 bg-green/5 blur-3xl opacity-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* TITLE */}
        <div ref={addRef} className="reveal text-green text-sm font-semibold tracking-wide uppercase mb-4">
          GET STARTED TODAY
        </div>

        <h2 ref={addRef} className="reveal text-4xl md:text-5xl font-bold mb-6 text-black">
          Ready to bet with a real edge?
        </h2>

        <p ref={addRef} className="reveal text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of punters getting consistent results. No hype. No complicated systems. Just proven picks for every game day.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          <button
            ref={addRef}
            className="btn px-8 py-4 rounded-lg bg-green text-black font-bold text-lg flex items-center justify-center gap-2"
          >
            Get Season Pass <ArrowRight size={20} />
          </button>

          <button
            ref={addRef}
            className="btn px-8 py-4 rounded-lg border-2 border-gray-300 text-black font-bold text-lg"
          >
            Join Multis (Open Now)
          </button>

        </div>

        {/* BADGES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">

          <div ref={addRef} className="badge flex items-center gap-2">
            <Check size={18} className="text-green" />
            Full money-back guarantee
          </div>

          <div ref={addRef} className="badge flex items-center gap-2">
            <Lock size={18} className="text-green" />
            100% transparent tracking
          </div>

          <div ref={addRef} className="badge flex items-center gap-2">
            <Check size={18} className="text-green" />
            No hidden fees
          </div>

        </div>

      </div>
    </section>
  )
}
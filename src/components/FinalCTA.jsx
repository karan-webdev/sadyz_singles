import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, Lock } from "lucide-react"
import { createCheckoutSession } from "../utils/stripe"

export default function FinalCTA() {
  const elementsRef = useRef([])

  const [loading, setLoading] = useState(null)
  const [error, setError] = useState("")

  const addRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  const handleCheckout = async (productId) => {
    setError("")
    setLoading(productId)
    try {
      await createCheckoutSession(productId)
    } catch (err) {
      setError("Failed to start checkout. Please try again.")
      console.error(err)
      setLoading(null)
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

      <div className="absolute inset-0 bg-blue/5 blur-3xl opacity-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">

        {/* TITLE */}
        <div ref={addRef} className="reveal text-blue text-sm font-semibold tracking-wide uppercase mb-4">
          GET STARTED TODAY
        </div>

        <h2 ref={addRef} className="reveal text-4xl md:text-5xl font-bold mb-6 text-black">
          Ready to bet with a real edge?
        </h2>

        <p ref={addRef} className="reveal text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of punters getting consistent results. No hype. No complicated systems. Just proven picks for every game day.
        </p>

        {error && (
          <div ref={addRef} className="reveal mb-6 max-w-md mx-auto">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          <button
            ref={addRef}
            onClick={() => handleCheckout("season")}
            disabled={loading !== null}
            className="btn btn-primary px-8 py-4 rounded-lg bg-blue hover:bg-blue-dim transition-all text-black font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "season"
              ? "Processing..."
              : <>Get Season Pass <ArrowRight size={20} /></>}
          </button>

          <button
            ref={addRef}
            onClick={() => handleCheckout("weekly")}
            disabled={loading !== null}
            className="btn px-8 py-4 rounded-lg border-2 border-gray-300 text-black hover:bg-black/5 transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "weekly" ? "Processing..." : "Try Weekly"}
          </button>

        </div>

        {/* BADGES */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">

          <div ref={addRef} className="badge flex items-center gap-2">
            <Check size={18} className="text-blue" />
            Full money-back guarantee
          </div>

          <div ref={addRef} className="badge flex items-center gap-2">
            <Lock size={18} className="text-blue" />
            100% transparent tracking
          </div>

          <div ref={addRef} className="badge flex items-center gap-2">
            <Check size={18} className="text-blue" />
            No hidden fees
          </div>

        </div>

      </div>
    </section>
  )
}
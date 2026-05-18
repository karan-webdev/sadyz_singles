import { useEffect, useRef, useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

function useInView(ref) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [])

  return inView
}

export default function SinglesSoldOut() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email.trim() || !email.includes('@')) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const leftVisible = useInView(leftRef)
  const rightVisible = useInView(rightRef)

  const features = [
    'Daily betting tips sent to Telegram',
    'Fully tracked results in units',
    'Detailed stake sizing guidance',
    'Access to premium research',
    'Exclusive community access',
    'Full refund guarantee'
  ]

  const results = [
    { year: '2024', roi: 127.8 },
    { year: '2025 Q1', roi: 62.3 },
    { year: '2026 YTD', roi: 56.78 }
  ]

  return (
    <>
      <style>{`
        /* LEFT TEXT */
        .fade {
          opacity: 0;
          transform: translateY(18px);
          transition: all 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fade.show {
          opacity: 1;
          transform: translateY(0);
        }

        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }
        .d4 { transition-delay: 0.35s; }
        .d5 { transition-delay: 0.45s; }

        /* FEATURES STAGGER */
        .feature {
          opacity: 0;
          transform: translateY(14px);
          transition: all 0.6s ease;
        }

        .feature.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* RIGHT CARD */
        .card {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .card.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* progress bars */
        .bar {
          width: 0%;
          transition: width 1.2s ease;
        }

        .bar.fill {
          /* width injected inline via JS class trigger */
        }
      `}</style>

      <section className="py-24" id="singles-waitlist">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* LEFT */}
            <div ref={leftRef}>

              <div className={`fade d1 text-green text-sm font-semibold tracking-wide uppercase mb-2 ${leftVisible ? "show" : ""}`}>
                CHANNEL STATUS
              </div>

              <h2 className={`fade d2 text-4xl font-bricolage font-bold mb-2 text-white ${leftVisible ? "show" : ""}`}>
                Singles Waitlist
              </h2>

              <div className={`fade d3 flex items-center gap-2 mb-8 text-yellow-500 ${leftVisible ? "show" : ""}`}>
                <AlertCircle size={20} />
                <span className="font-semibold">Sold out for the season</span>
              </div>

              <p className={`fade d4 text-text-muted text-lg mb-8 leading-relaxed ${leftVisible ? "show" : ""}`}>
                The Singles channel is currently at capacity. Join the waitlist to be notified the moment spots open for the next season.
              </p>

              {/* FEATURES */}
              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <li
                    key={i}
                    className={`feature ${leftVisible ? "show" : ""}`}
                    style={{ transitionDelay: `${0.1 * i + 0.2}s` }}
                  >
                    <div className="flex items-center gap-3 text-text-muted">
                      <CheckCircle size={18} className="text-green flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* FORM */}
              <div className={`fade d5 flex gap-2 mb-3 ${leftVisible ? "show" : ""}`}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="flex-1 px-4 py-3 rounded-lg bg-bg-card border border-text-dim/20 text-white focus:outline-none focus:border-green/50 transition-colors"
                />

                <button
                  onClick={handleSubmit}
                  className={`btn-primary px-6 py-3 rounded-lg font-semibold transition-all ${
                    submitted
                      ? 'bg-green text-black'
                      : 'bg-green text-black hover:bg-green-dim'
                  }`}
                >
                  {submitted ? '✓ Added' : 'Join'}
                </button>
              </div>

              <p className="text-xs text-text-dim">
                No spam. One email when spots open.
              </p>

            </div>

            {/* RIGHT */}
            <div ref={rightRef}>

              <div className={`card ${rightVisible ? "show" : ""} p-6 rounded-xl bg-bg-card border border-text-dim/20`}>

                <div className="text-green text-xs font-semibold tracking-wide uppercase mb-4">
                  2024 Season Results
                </div>

                <div className="space-y-4">

                  {results.map((item, i) => {
                    const percent = Math.min(100, (item.roi / 128) * 100)

                    return (
                      <div key={i}>

                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-mono text-text-muted">
                            {item.year}
                          </span>

                          <span className="text-lg font-bold text-green font-mono">
                            +{item.roi}U
                          </span>
                        </div>

                        <div className="h-2 bg-bg-card-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green to-green/70 rounded-full transition-all duration-1000"
                            style={{
                              width: rightVisible ? `${percent}%` : "0%"
                            }}
                          />
                        </div>

                      </div>
                    )
                  })}

                </div>

                <p className="text-xs text-text-dim mt-4 font-mono">
                  1 unit = baseline stake. ROI varies by season.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  )
}
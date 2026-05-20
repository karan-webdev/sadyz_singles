import { useEffect, useRef, useState } from "react"
import { UserPlus, Bell, TrendingUp } from 'lucide-react'

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
      { threshold: 0.25 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => obs.disconnect()
  }, [])

  return inView
}

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      icon: UserPlus,
      title: 'Join the Channel',
      desc: 'Sign up in seconds and get instant access to the private Telegram tip channel.'
    },
    {
      num: 2,
      icon: Bell,
      title: 'Get Daily Gameday Picks',
      desc: 'Receive structured, high-confidence betting tips delivered straight to your phone every day.'
    },
    {
      num: 3,
      icon: TrendingUp,
      title: 'Place & Track Bets',
      desc: 'Follow the picks, place your bets, and track performance with full transparency over time.'
    }
  ]

  // HEADER OBSERVER
  const headerRef = useRef(null)
  const headerVisible = useInView(headerRef)

  // CARD OBSERVERS (SAFE FIXED VERSION)
  const cardRef1 = useRef(null)
  const cardRef2 = useRef(null)
  const cardRef3 = useRef(null)

  const v1 = useInView(cardRef1)
  const v2 = useInView(cardRef2)
  const v3 = useInView(cardRef3)

  const cardVisible = [v1, v2, v3]
  const cardRefs = [cardRef1, cardRef2, cardRef3]

  return (
    <>
      <style>{`
        /* HEADER */
        .fade-up {
          opacity: 0;
          transform: translateY(18px);
          transition: all 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .fade-up.show {
          opacity: 1;
          transform: translateY(0);
        }

        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }

        /* CARDS */
        .card {
          opacity: 0;
          transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* DESKTOP: bottom-up */
        @media (min-width: 768px) {
          .card {
            transform: translateY(60px);
          }
        }

        /* MOBILE: alternating directions */
        @media (max-width: 767px) {
          .from-left  { transform: translateX(-60px); }
          .from-right { transform: translateX(60px); }
        }

        .card.show {
          opacity: 1;
          transform: translate(0,0);
        }

        .c1 { transition-delay: 0.1s; }
        .c2 { transition-delay: 0.2s; }
        .c3 { transition-delay: 0.3s; }
      `}</style>

      <section className="py-24 bg-[#f6f7f9] border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div ref={headerRef} className="mb-16">

            <div className={`fade-up d1 text-green text-sm font-semibold tracking-wide uppercase mb-2 ${headerVisible ? "show" : ""}`}>
              SIMPLE 3-STEP SYSTEM
            </div>

            <h2 className={`fade-up d2 text-4xl md:text-5xl font-bricolage font-bold mb-3 text-black ${headerVisible ? "show" : ""}`}>
              Join. Get tips. Place bets.
            </h2>

            <p className={`fade-up d3 text-gray-600 text-lg max-w-2xl ${headerVisible ? "show" : ""}`}>
              A straightforward process designed to remove guesswork and keep everything actionable.
            </p>

          </div>

          {/* STEPS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {steps.map((step, idx) => {
              const Icon = step.icon

              const direction =
                idx % 2 === 0 ? "from-left" : "from-right"

              return (
                <div
                  key={idx}
                  ref={cardRefs[idx]}
                  className={`
                    card
                    c${idx + 1}
                    ${direction}
                    ${cardVisible[idx] ? "show" : ""}
                    p-6 rounded-2xl bg-bg-card border border-white/5
                  `}
                >

                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center">
                      <Icon className="text-green" size={22} />
                    </div>
                  </div>

                  <div className="text-sm font-mono text-gray-400 mb-2">
                    Step {step.num}
                  </div>

                  <h3 className="text-xl font-bricolage font-bold mb-2 text-white">
                    {step.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                </div>
              )
            })}

          </div>

        </div>
      </section>
    </>
  )
}
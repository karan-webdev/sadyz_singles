import { useEffect, useRef, useState } from "react"
import { BookOpen, BarChart3, Lock, Calendar } from 'lucide-react'

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

export default function TransparencySection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Logged Daily',
      desc: "Every pick recorded the moment it's sent. No retroactive changes."
    },
    {
      icon: BarChart3,
      title: 'Public Tracking',
      desc: 'Results visible in our Telegram channel. Anyone can audit our record.'
    },
    {
      icon: Lock,
      title: 'Unit System',
      desc: 'All bets tracked in standardized units for fair ROI comparison.'
    },
    {
      icon: Calendar,
      title: 'Season Based',
      desc: 'Clear accountability periods. Results reset each season.'
    }
  ]

  // HEADER OBSERVER
  const headerRef = useRef(null)
  const headerVisible = useInView(headerRef)

  // CARD OBSERVERS
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)]
  const visible = refs.map(r => useInView(r))

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
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .c1 { transition-delay: 0.05s; }
        .c2 { transition-delay: 0.15s; }
        .c3 { transition-delay: 0.25s; }
        .c4 { transition-delay: 0.35s; }
      `}</style>

      <section className="py-24 bg-[#f6f7f9] border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
          <div ref={headerRef} className="mb-16">

            <div className={`fade-up d1 text-green text-sm font-semibold tracking-wide uppercase mb-2 ${headerVisible ? "show" : ""}`}>
              HOW WE TRACK
            </div>

            <h2 className={`fade-up d2 text-4xl md:text-5xl font-bricolage font-bold mb-3 text-black ${headerVisible ? "show" : ""}`}>
              Transparent by design
            </h2>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {features.map((feature, i) => {
              const Icon = feature.icon

              return (
                <div
                  key={i}
                  ref={refs[i]}
                  className={`card c${i + 1} ${visible[i] ? "show" : ""} p-6 rounded-2xl bg-bg-card border border-white/5`}
                >

                  <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center mb-4 transition-colors">
                    <Icon className="text-green" size={22} />
                  </div>

                  <h3 className="text-lg font-bricolage font-bold mb-2 text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.desc}
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
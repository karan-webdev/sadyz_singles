import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import proof9 from "../assets/proof/proof9.jpeg"
import proof10 from "../assets/proof/proof10.jpeg"
import proof11 from "../assets/proof/proof11.jpeg"
import proof12 from "../assets/proof/proof12.jpeg"
import proof13 from "../assets/proof/proof13.jpeg"
import proof5 from "../assets/proof/proof5.jpeg"

import testimonial0 from "../assets/testimonials/testimonial.jpeg"
import testimonial1 from "../assets/testimonials/testimonial1.jpeg"
import testimonial2 from "../assets/testimonials/testimonial2.jpeg"
import testimonial3 from "../assets/testimonials/testimonial3.jpeg"

export default function ProofSection() {
  const stats = [
    { label: "Singles ROI 2024", value: "+127.8%" },
    { label: "Multis ROI 2025", value: "+62.3%" },
    { label: "Singles YTD 2026", value: "+56.78%" },
    { label: "Multis YTD 2026", value: "+34.2%" },
    { label: "Overall Win Rate", value: "100.%" },
    { label: "Avg Odds", value: "2.15x" }
  ]

  const testimonialImages = [
    testimonial0,
    testimonial1,
    testimonial2,
    testimonial3
  ]

  const proofImages = [
    proof9,
    proof10,
    proof11,
    proof12,
    proof13,
    proof5
  ]

  const [active, setActive] = useState(0)
  const [expandedImage, setExpandedImage] = useState(null)

  const startX = useRef(0)
  const refs = useRef([])

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el)
  }

  // scroll + countup observer (UNCHANGED)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show")

            const el = entry.target.querySelector("[data-countup]")
            if (el && !el.dataset.done) {
              animateCount(el)
              el.dataset.done = "true"
            }
          }
        })
      },
      { threshold: 0.15 }
    )

    refs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function animateCount(el) {
    const target = parseFloat(el.dataset.countup)
    const prefix = el.dataset.prefix || ""
    const suffix = el.dataset.suffix || ""

    const start = performance.now()
    const duration = 1200

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const value = (progress * target).toFixed(2)
      el.textContent = `${prefix}${value}${suffix}`

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  function next() {
    setActive((p) => (p + 1) % testimonialImages.length)
  }

  function prev() {
    setActive((p) => (p === 0 ? testimonialImages.length - 1 : p - 1))
  }

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    if (diff < -50) prev()
  }

  useEffect(() => {
    document.body.style.overflow = expandedImage ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [expandedImage])

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .show {
          opacity: 1;
          transform: translateY(0);
        }

        .left { transform: translateX(-40px); opacity: 0; }
        .right { transform: translateX(40px); opacity: 0; }
        .up { transform: translateY(40px); opacity: 0; }

        .show.left,
        .show.right,
        .show.up {
          opacity: 1;
          transform: translate(0,0);
        }

        .card {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .stat {
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.7s ease;
        }

        .stat.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section className="py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-14">
            <div ref={addRef} className="reveal up text-green-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Proof of Results
            </div>

            <h2 ref={addRef} className="reveal up text-4xl font-bold mb-2">
              The numbers don’t lie
            </h2>

            <p ref={addRef} className="reveal up text-white/60">
              Real tracked results across multiple seasons.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {stats.map((s, i) => {
              const count = parseFloat(String(s.value).replace(/[^0-9.]/g, ""))
              const prefix = s.value.startsWith("+") ? "+" : ""
              const suffix = s.value.includes("%") ? "%" : ""

              return (
                <div
                  key={i}
                  ref={addRef}
                  className="stat"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div
                      data-countup={count}
                      data-prefix={prefix}
                      data-suffix={suffix}
                      className="text-green-400 text-xl font-bold"
                    >
                      0{suffix}
                    </div>

                    <div className="text-white/50 text-sm">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* TESTIMONIALS (COMPLETELY STATIC NOW) */}
          <div className="mb-24">

            <h3 ref={addRef} className="reveal left text-2xl font-bold mb-1">
              Member snapshots
            </h3>

            <p ref={addRef} className="reveal left text-white/50 text-sm mb-6">
              Swipe or use arrows. Click to enlarge.
            </p>

            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-lg h-[420px] rounded-3xl overflow-hidden border border-white/10">

                <img
                  src={testimonialImages[active]}
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
                />

                <div className="absolute inset-0 bg-black/40" />

                <img
                  src={testimonialImages[active]}
                  onClick={() => setExpandedImage(testimonialImages[active])}
                  className="relative z-10 w-full h-full object-contain"
                  draggable={false}
                />

              </div>

              {/* ARROWS (NO EFFECTS) */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* THUMBS (STATIC) */}
            <div className="flex justify-center gap-3 mt-6">
              {testimonialImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border ${
                    i === active
                      ? "border-green-400"
                      : "border-white/10 opacity-50"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* PROOF GRID */}
          <h3 ref={addRef} className="reveal left text-2xl font-bold mb-1">
            Result screenshots
          </h3>

          <p ref={addRef} className="reveal left text-white/50 text-sm mb-6">
            Click any image to view full size.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proofImages.map((img, i) => (
              <div
                key={i}
                ref={addRef}
                className="card"
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={() => setExpandedImage(img)}
              >
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <img
                    src={img}
                    className="w-full h-52 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* LIGHTBOX */}
        {expandedImage && (
          <div
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4"
          >
            <img
              src={expandedImage}
              className="max-h-[85vh] rounded-xl border border-white/10"
            />
          </div>
        )}
      </section>
    </>
  )
}
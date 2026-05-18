import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import proof0 from "../assets/proof/proof.jpeg"
import proof1 from "../assets/proof/proof1.jpeg"
import proof2 from "../assets/proof/proof2.jpeg"
import proof3 from "../assets/proof/proof3.jpeg"
import proof4 from "../assets/proof/proof4.jpeg"
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
    { label: "Overall Win Rate", value: "100.%" }, //56.3
    { label: "Avg Odds", value: "2.15x" } //2.15
  ]

  const testimonialImages = [
    testimonial0,
    testimonial1,
    testimonial2,
    testimonial3
  ]

  const proofImages = [
    proof0,
    proof1,
    proof2,
    proof3,
    proof4,
    proof5
  ]

  const [active, setActive] = useState(0)
  const [expandedImage, setExpandedImage] = useState(null)

  const containerRef = useRef(null)
  let startX = 0

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = expandedImage ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [expandedImage])

  function next() {
    setActive((p) => (p + 1) % testimonialImages.length)
  }

  function prev() {
    setActive((p) => (p === 0 ? testimonialImages.length - 1 : p - 1))
  }

  function onTouchStart(e) {
    startX = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    const diff = startX - e.changedTouches[0].clientX
    if (diff > 50) next()
    if (diff < -50) prev()
  }

  return (
    <section id="proof" className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-14">
          <div className="text-green-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Proof of Results
          </div>
          <h2 className="text-4xl font-bold mb-2">
            The numbers don’t lie
          </h2>
          <p className="text-white/60">
            Real tracked results across multiple seasons.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {stats.map((s, i) => {
            const count = parseFloat(String(s.value).replace(/[^0-9.\-]/g, ''))
            const prefix = s.value.startsWith('+') ? '+' : ''
            const suffix = s.value.endsWith('%') ? '%' : ''

            return (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-green/40 transition"
              >
                <div
                  data-countup={count}
                  data-prefix={prefix}
                  data-suffix={suffix}
                  className="text-green-400 text-xl font-bold"
                >
                  0{suffix}
                </div>
                <div className="text-white/50 text-sm">
                  {s.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* CAROUSEL */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold mb-1">
            Member snapshots
          </h3>

          <p className="text-white/50 text-sm mb-6">
            Swipe or use arrows. Click to enlarge.
          </p>

          <div
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative flex justify-center isolate"
          >
            <div className="relative w-full max-w-lg h-[420px] rounded-3xl overflow-hidden border border-white/10">

              {/* blurred bg */}
              <img
                src={testimonialImages[active]}
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
              />

              <div className="absolute inset-0 bg-black/40" />

              {/* main */}
              <img
                src={testimonialImages[active]}
                onClick={() => setExpandedImage(testimonialImages[active])}
                className="relative z-10 w-full h-full object-contain cursor-pointer hover:scale-[1.02] transition"
              />
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex justify-center gap-3 mt-6">
            {testimonialImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-20 h-14 rounded-lg overflow-hidden border transition ${
                  i === active
                    ? "border-green-400 scale-105"
                    : "border-white/10 opacity-50"
                }`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div>
          <h3 className="text-2xl font-bold mb-1">
            Result screenshots
          </h3>

          <p className="text-white/50 text-sm mb-6">
            Click any image to view full size.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proofImages.map((img, i) => (
              <div
                key={i}
                onClick={() => setExpandedImage(img)}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer group"
              >
                <img
                  src={img}
                  className="w-full h-52 object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {expandedImage && (
        <div
          onClick={() => setExpandedImage(null)}
          className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <img
            src={expandedImage}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-auto rounded-xl border border-white/10 shadow-2xl object-contain"
          />
        </div>
      )}
    </section>
  )
}
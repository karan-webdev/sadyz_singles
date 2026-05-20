import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import testimonial0 from "../assets/testimonials/testimonial.jpeg"
import testimonial1 from "../assets/testimonials/testimonial1.jpeg"
import testimonial2 from "../assets/testimonials/testimonial2.jpeg"
import testimonial3 from "../assets/testimonials/testimonial3.jpeg"

export default function TestimonialSection() {
  const testimonialImages = [
    testimonial0,
    testimonial1,
    testimonial2,
    testimonial3
  ]

  const [active, setActive] = useState(0)
  const [expandedImage, setExpandedImage] = useState(null)

  const startX = useRef(0)

  function next() {
    setActive((p) => (p + 1) % testimonialImages.length)
  }

  function prev() {
    setActive((p) =>
      p === 0 ? testimonialImages.length - 1 : p - 1
    )
  }

  function onTouchStart(e) {
    startX.current = e.touches[0].clientX
  }

  function onTouchEnd(e) {
    const diff = startX.current - e.changedTouches[0].clientX
    if (diff > 50) next()
    if (diff < -50) prev()
  }

  // lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = expandedImage ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [expandedImage])

  return (
    <section className="py-24 bg-[#0a0a0a] border-y border-text-dim/10 text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-green-500 text-sm font-semibold uppercase tracking-widest mb-2">
            Member Snapshots
        </div>
        <h2 className="text-4xl font-bold mb-2">
            What members are saying
        </h2>

        <p className="text-white/50 text-sm mb-6">
          Swipe or use arrows. Click to enlarge.
        </p>

        {/* CAROUSEL */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-lg h-[420px] rounded-3xl overflow-hidden border border-white/10">

            {/* blurred background */}
            <img
              src={testimonialImages[active]}
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
            />

            <div className="absolute inset-0 bg-black/40" />

            {/* main image */}
            <img
              src={testimonialImages[active]}
              onClick={() =>
                setExpandedImage(testimonialImages[active])
              }
              className="relative z-10 w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* arrows */}
          <button
  onClick={(e) => {
    e.stopPropagation()
    prev()
  }}
  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-20"
>
  <ChevronLeft size={20} />
</button>

<button
  onClick={(e) => {
    e.stopPropagation()
    next()
  }}
  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center z-20"
>
  <ChevronRight size={20} />
</button>
        </div>

        {/* THUMBNAILS */}
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
  )
}
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import proof from "../assets/proof/proof.jpeg"
import proof1 from "../assets/proof/proof1.jpeg"
import proof2 from "../assets/proof/proof2.jpeg"
import proof3 from "../assets/proof/proof3.jpeg"
import proof4 from "../assets/proof/proof4.jpeg"
import proof5 from "../assets/proof/proof5.jpeg"
import proof6 from "../assets/proof/proof6.jpeg"
import proof7 from "../assets/proof/proof7.jpeg"
import proof8 from "../assets/proof/proof8.jpeg"
import proof9 from "../assets/proof/proof9.jpeg"
import proof10 from "../assets/proof/proof10.jpeg"
import proof11 from "../assets/proof/proof11.jpeg"
import proof12 from "../assets/proof/proof12.jpeg"
import proof13 from "../assets/proof/proof13.jpeg"

const INITIAL_ROWS = 2
const COLS = 3
const INITIAL_COUNT = INITIAL_ROWS * COLS // 6

export default function ProofSection() {
  const stats = [
    { label: "Singles ROI 2024", value: "+127.8%" },
    { label: "Multis ROI 2025", value: "+62.3%" },
    { label: "Singles YTD 2026", value: "+56.78%" },
    { label: "Multis YTD 2026", value: "+34.2%" },
    { label: "Overall Win Rate", value: "100.%" },
    { label: "Avg Odds", value: "2.15x" },
  ]

  const proofImages = [
    proof4, proof, proof1, proof2, proof3, proof5,
    proof6, proof7, proof8, proof9, proof10, proof11, proof12, proof13,
  ]

  const [showAll, setShowAll] = useState(false)
  const [expandedImage, setExpandedImage] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const refs = useRef([])
  const startX = useRef(0)
  const carouselRef = useRef(null)
  const gridRef = useRef(null)
  const btnRef = useRef(null)
  const [btnSticky, setBtnSticky] = useState(false)

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) refs.current.push(el)
  }

  // Intersection observer for reveal animations
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

  // Re-observe newly revealed cards when showAll toggles
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show")
        })
      },
      { threshold: 0.1 }
    )
    const cards = gridRef.current?.querySelectorAll(".card:not(.show)")
    cards?.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [showAll])

  // Sticky toggle button: becomes sticky when grid top is above viewport and grid bottom is below viewport
  useEffect(() => {
    if (window.innerWidth < 768) return // only desktop
    const handleScroll = () => {
      if (!gridRef.current || !btnRef.current) return
      const gridRect = gridRef.current.getBoundingClientRect()
      const inGrid = gridRect.top < 0 && gridRect.bottom > window.innerHeight
      setBtnSticky(inGrid)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
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

  // Mobile carousel scroll sync
  function onCarouselScroll() {
    if (!carouselRef.current) return
    const { scrollLeft, offsetWidth } = carouselRef.current
    setActiveSlide(Math.round(scrollLeft / offsetWidth))
  }

  function scrollTo(index) {
    if (!carouselRef.current) return
    carouselRef.current.scrollTo({ left: index * carouselRef.current.offsetWidth, behavior: "smooth" })
    setActiveSlide(index)
  }

  // Lightbox body scroll lock
  useEffect(() => {
    document.body.style.overflow = expandedImage ? "hidden" : "auto"
    return () => (document.body.style.overflow = "auto")
  }, [expandedImage])

  const visibleImages = showAll ? proofImages : proofImages.slice(0, INITIAL_COUNT)
  const remaining = proofImages.length - INITIAL_COUNT

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .left { transform: translateX(-40px); opacity: 0; }
        .right { transform: translateX(40px); opacity: 0; }
        .up { transform: translateY(40px); opacity: 0; }
        .show.left, .show.right, .show.up, .show {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
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

        /* ── Mobile carousel ── */
        .proof-carousel {
          display: none;
        }
        @media (max-width: 767px) {
          .proof-carousel {
            display: block;
          }
          .proof-desktop-grid {
            display: none !important;
          }
          .proof-toggle-desktop {
            display: none !important;
          }
        }

        .carousel-track {
          display: flex;
          overflow-x: scroll;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          gap: 12px;
          padding-bottom: 4px;
        }
        .carousel-track::-webkit-scrollbar { display: none; }

        .carousel-slide {
          flex: 0 0 calc(85vw);
          scroll-snap-align: center;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          position: relative;
        }
        .carousel-slide img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
        }

        /* peek next card on right */
        .carousel-track::after {
          content: '';
          flex: 0 0 4px;
        }

        /* dot indicators */
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
          flex-wrap: wrap;
          padding: 0 16px;
        }
        .carousel-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          padding: 0;
          flex-shrink: 0;
        }
        .carousel-dot.active {
          background: #4ade80;
          width: 18px;
          border-radius: 3px;
        }

        /* slide counter badge */
        .slide-counter {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          color: rgba(255,255,255,0.7);
          font-size: 11px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 20px;
          backdrop-filter: blur(4px);
          letter-spacing: 0.04em;
        }

        /* ── Desktop sticky toggle ── */
        .proof-toggle-sticky-wrapper {
          position: relative;
        }
        .proof-toggle-btn {
          width: 100%;
          padding: 12px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          color: rgba(255,255,255,0.6);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          letter-spacing: 0.01em;
        }
        .proof-toggle-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.04);
        }
        .proof-toggle-btn.sticky {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          min-width: 200px;
          max-width: 320px;
          background: rgba(10,10,10,0.85);
          backdrop-filter: blur(12px);
          border-color: rgba(255,255,255,0.2);
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
          z-index: 50;
          color: #fff;
        }
      `}</style>

      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="max-w-6xl mx-auto px-6">

          {/* HEADER */}
          <div className="mb-14">
            <div ref={addRef} className="reveal up text-green-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Proof of Results
            </div>
            <h2 ref={addRef} className="reveal up text-4xl font-bold mb-2">
              The numbers don't lie
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
                <div key={i} ref={addRef} className="stat" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <div data-countup={count} data-prefix={prefix} data-suffix={suffix} className="text-green-400 text-xl font-bold">
                      0{suffix}
                    </div>
                    <div className="text-white/50 text-sm">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* SECTION HEADER */}
          <h3 ref={addRef} className="reveal left text-2xl font-bold mb-1">
            Result screenshots
          </h3>
          <p ref={addRef} className="reveal left text-white/50 text-sm mb-6">
            Click any image to view full size.
          </p>

          {/* ── MOBILE: horizontal scroll carousel ── */}
          <div className="proof-carousel">
            <div
              ref={carouselRef}
              className="carousel-track"
              onScroll={onCarouselScroll}
            >
              {proofImages.map((img, i) => (
                <div
                  key={i}
                  className="carousel-slide"
                  onClick={() => setExpandedImage(img)}
                >
                  <img src={img} alt={`Result ${i + 1}`} />
                  <span className="slide-counter">{i + 1} / {proofImages.length}</span>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="carousel-dots">
              {proofImages.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${activeSlide === i ? " active" : ""}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── DESKTOP: expandable grid ── */}
          <div className="proof-desktop-grid" ref={gridRef}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {visibleImages.map((img, i) => (
                <div
                  key={i}
                  ref={addRef}
                  className="card"
                  style={{ transitionDelay: `${Math.min(i, 5) * 80}ms` }}
                  onClick={() => setExpandedImage(img)}
                >
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer hover:border-white/20 transition-colors">
                    <img src={img} alt={`Result ${i + 1}`} className="w-full h-52 object-cover" />
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle button wrapper — becomes sticky while scrolling through grid */}
            <div className="proof-toggle-sticky-wrapper mt-6 proof-toggle-desktop">
              {/* Spacer so page doesn't jump when button goes sticky */}
              <div style={{ height: btnSticky ? 48 : 0 }} />
              <button
                ref={btnRef}
                className={`proof-toggle-btn${btnSticky ? " sticky" : ""}`}
                onClick={() => {
                  setShowAll((prev) => {
                    if (prev) {
                      // Scroll back to grid top when collapsing
                      setTimeout(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50)
                    }
                    return !prev
                  })
                }}
              >
                {showAll ? (
                  <><ChevronUp size={16} /> Show less</>
                ) : (
                  <><ChevronDown size={16} /> Show {remaining} more screenshots</>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* LIGHTBOX */}
        {expandedImage && (
          <div
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <img
              src={expandedImage}
              alt="Expanded result"
              className="max-h-[90vh] max-w-full rounded-xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/10 rounded-full w-9 h-9 flex items-center justify-center text-xl leading-none transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
      </section>
    </>
  )
}
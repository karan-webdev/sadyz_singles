import { useEffect, useRef, useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { subscribeEmail } from '../utils/waitlist'

function useRevealRef(delay = 0) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('show'), delay)
          obs.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return ref
}

function animateCount(el) {
  const target = parseFloat(el.dataset.countup)
  const prefix = el.dataset.prefix || ""
  const suffix = el.dataset.suffix || ""
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 2

  const start = performance.now()
  const duration = 1200

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1)
    const value = (progress * target).toFixed(decimals)
    el.textContent = `${prefix}${value}${suffix}`
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

export default function SinglesSoldOut() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')

  const handleSubmit = async () => {
    const value = email.trim().toLowerCase()
    if (!value) {
      setStatusType('error')
      setStatus('Email is required')
      return
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    if (!validEmail) {
      setStatusType('error')
      setStatus('Please enter a valid email')
      return
    }

    setLoading(true)
    setStatus('')
    setStatusType('')

    try {
      const result = await subscribeEmail(value)

      if (result.success) {
        setSubmitted(true)
        setStatusType('success')
        setStatus(result.message ?? 'Successfully registered')
        setEmail('')

        //meta pixel fire
        if (result.isNew && window.fbq) {
          window.fbq("track", "Lead")
        }

        setTimeout(() => setSubmitted(false), 3000)
      } else {
        throw new Error(result.error || 'Subscription failed')
      }
    } catch (error) {
      setStatusType('error')
      setStatus(error?.message ?? 'Unable to register at this time')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Daily game day betting tips sent to Telegram',
    'Fully tracked results in units',
    'Detailed stake sizing guidance',
    'Access to premium research',
    'Exclusive community access',
    'Full refund guarantee if no profit from Round 14 to Grand Final',
  ]

  const results = [
    { year: '2024', roi: 127.8 },
    { year: '2025 Q1', roi: 62.3 },
    { year: '2026 YTD', roi: 56.78 },
  ]

  // Left column refs
  const labelRef      = useRevealRef(0)
  const headingRef    = useRevealRef(80)
  const badgeRef      = useRevealRef(160)
  const paraRef       = useRevealRef(240)
  const featureRefs   = features.map((_, i) => useRevealRef(320 + i * 70))
  const formRef       = useRevealRef(320 + features.length * 70)
  const disclaimerRef = useRevealRef(320 + features.length * 70 + 60)

  // Right column refs
  const cardLabelRef = useRevealRef(0)
  const resultRefs   = results.map((_, i) => useRevealRef(80 + i * 120))
  const cardNoteRef  = useRevealRef(80 + results.length * 120)

  // Bar + countup state
  const [barVisible, setBarVisible] = useState(results.map(() => false))
  const barRefs   = results.map(() => useRef(null))
  const countRefs = results.map(() => useRef(null))

  useEffect(() => {
    barRefs.forEach((ref, i) => {
      const el = ref.current
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const delay = 80 + i * 120 + 200
            setTimeout(() => {
              setBarVisible((prev) => {
                const next = [...prev]
                next[i] = true
                return next
              })
              const countEl = countRefs[i].current
              if (countEl && !countEl.dataset.done) {
                countEl.dataset.done = "true"
                animateCount(countEl)
              }
            }, delay)
            obs.unobserve(el)
          }
        },
        { threshold: 0.15 }
      )

      obs.observe(el)
      return () => obs.disconnect()
    })
  }, [])

  return (
    <>
      <style>{`
        .rv {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rv.show {
          opacity: 1;
          transform: translateY(0);
        }
        .rv-card {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rv-card.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section className="py-24" id="singles-waitlist">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* LEFT */}
            <div>
              <div ref={labelRef} className="rv text-blue text-sm font-semibold tracking-wide uppercase mb-2">
                CHANNEL STATUS
              </div>

              <h2 ref={headingRef} className="rv text-4xl font-bricolage font-bold mb-2 text-white">
                Singles Waitlist
              </h2>

              <div ref={badgeRef} className="rv flex items-center gap-2 mb-8 text-yellow-500">
                <AlertCircle size={20} />
                <span className="font-semibold">Sold out for the season</span>
              </div>

              <p ref={paraRef} className="rv text-text-muted text-lg mb-8 leading-relaxed">
                The Singles channel is currently at capacity. Join the waitlist to be notified the moment spots open for the next season.
              </p>

              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <li key={i} ref={featureRefs[i]} className="rv">
                    <div className="flex items-center gap-3 text-text-muted">
                      <CheckCircle size={18} className="text-green flex-shrink-0" />
                      <span className="text-sm">{f}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div ref={formRef} className="rv flex gap-2 mb-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="flex-1 px-4 py-3 rounded-lg bg-bg-card border border-text-dim/20 text-white focus:outline-none focus:border-blue/50 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    submitted ? 'bg-blue text-black' : 'bg-blue text-black hover:bg-blue-dim'
                  } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Joining...' : submitted ? '✓ Added' : 'Join'}
                </button>
              </div>

              {status ? (
                <p className={`text-sm mt-2 ${statusType === 'success' ? 'text-green' : 'text-red-400'}`}>
                  {status}
                </p>
              ) : null}

              <p ref={disclaimerRef} className="rv text-xs text-text-dim">
                No spam. One email when spots open.
              </p>
            </div>

            {/* RIGHT */}
            <div className="p-6 rounded-xl bg-bg-card border border-text-dim/20">
              <div ref={cardLabelRef} className="rv text-blue text-xs font-semibold tracking-wide uppercase mb-4">
                Season Results
              </div>

              <div className="space-y-4">
                {results.map((item, i) => {
                  const percent = Math.min(100, (item.roi / 128) * 100)
                  return (
                    <div key={i} ref={resultRefs[i]} className="rv-card">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-mono text-text-muted">{item.year}</span>
                        <span
                          ref={countRefs[i]}
                          data-countup={item.roi}
                          data-prefix="+"
                          data-suffix="U"
                          data-decimals="2"
                          className="text-lg font-bold text-green font-mono"
                        >
                          +0.00U
                        </span>
                      </div>

                      <div ref={barRefs[i]} className="h-2 bg-bg-card-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue to-blue/70 rounded-full transition-all duration-[1200ms] ease-out"
                          style={{ width: barVisible[i] ? `${percent}%` : '0%' }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <p ref={cardNoteRef} className="rv text-xs text-text-dim mt-4 font-mono">
                1 unit = baseline stake. ROI varies by season.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
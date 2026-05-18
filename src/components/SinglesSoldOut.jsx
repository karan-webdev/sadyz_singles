import { useState } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function SinglesSoldOut() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email.trim() || !email.includes('@')) {
      return
    }
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="singles-waitlist" className="py-24" data-reveal data-reveal-effect="big">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left side */}
          <div data-reveal>
            <div className="text-green text-sm font-semibold tracking-wide uppercase mb-2">CHANNEL STATUS</div>
            <h2 className="text-4xl font-bricolage font-bold mb-2">Singles Waitlist</h2>
            <div className="flex items-center gap-2 mb-8 text-yellow-500">
              <AlertCircle size={20} />
              <span className="font-semibold">Sold out for the season</span>
            </div>
            
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              The Singles channel is currently at capacity. Join the waitlist to be notified the moment spots open for the next season.
            </p>

            {/* Features list */}
            <ul className="space-y-3 mb-10">
              {[
                'Daily betting tips sent to Telegram',
                'Fully tracked results in units',
                'Detailed stake sizing guidance',
                'Access to premium research',
                'Exclusive community access',
                'Full refund guarantee'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-text-muted">
                  <CheckCircle size={18} className="text-green flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Waitlist form */}
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="flex-1 px-4 py-3 rounded-lg bg-bg-card border border-text-dim/20 text-text placeholder-text-dim focus:outline-none focus:border-green/50 transition-colors"
              />
              <button
                onClick={handleSubmit}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  submitted
                    ? 'bg-green text-black'
                    : 'bg-green text-black hover:bg-green-dim'
                }`}
              >
                {submitted ? '✓ Added' : 'Join'}
              </button>
            </div>
            <p className="text-xs text-text-dim">No spam. One email when spots open.</p>
          </div>

          {/* Right side - Results card */}
          <div data-reveal>
            <div className="p-6 rounded-xl bg-bg-card border border-text-dim/20">
              <div className="text-green text-xs font-semibold tracking-wide uppercase mb-4">2024 Season Results</div>
              <div className="space-y-4">
                {[
                  { year: '2024', roi: 127.8 },
                  { year: '2025 Q1', roi: 62.3 },
                  { year: '2026 YTD', roi: 56.78 }
                ].map((item, i) => {
                  const percent = Math.min(100, (item.roi / 128) * 100)
                  return (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-mono text-text-muted">{item.year}</span>
                        <span
                          data-countup={item.roi}
                          data-prefix="+"
                          data-suffix="U"
                          className="text-lg font-bold text-green font-mono"
                        >
                          +0U
                        </span>
                      </div>
                      <div className="h-2 bg-bg-card-2 rounded-full overflow-hidden">
                        <div
                          data-fill={percent}
                          className="h-full bg-gradient-to-r from-green to-green/70 rounded-full transition-all duration-1000"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-text-dim mt-4 font-mono">1 unit = baseline stake. ROI varies by season.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

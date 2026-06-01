import { useEffect, useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function SuccessPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fired, setFired] = useState(false)

  const sessionId = new URLSearchParams(window.location.search).get('session_id')

  useEffect(() => {
    if (!sessionId) {
      setError('Unable to load purchase details.')
      setLoading(false)
      return
    }

    fetch(`/api/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(res => res.json())
      .then(data => {
        if (data.email) setEmail(data.email)
      })
      .catch(() => setError('Unable to load purchase details.'))
      .finally(() => setLoading(false))
  }, [sessionId])

  useEffect(() => {
    if (!loading && !error && !fired) {
      confetti({
        particleCount: 140,
        spread: 85,
        origin: { y: 0.6 }
      })
      setFired(true)
    }
  }, [loading, error, fired])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">

      
    <div className="w-full max-w-[340px] sm:max-w-md mx-auto space-y-6">
        {/* ICON */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-blue/10 border border-blue/30 flex items-center justify-center">
            <Check size={42} className="text-blue" strokeWidth={3} />
          </div>
        </div>

        {/* TITLE (BIGGER + MORE IMPACT) */}
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            You're in.
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            Payment successful. Access activated.
          </p>
        </div>

        {/* EMAIL BLOCK (FIXED LAYOUT) */}
        <div className="rounded-xl py-5 space-y-4">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={22} className="text-blue" />
              <span className="font-semibold text-lg text-white">
                Check your inbox!
              </span>
            </div>
          </div>

          {loading ? (
            <p className="text-white/50 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-400 text-sm">{error}</p>
          ) : (
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <span className="text-white/50 text-xs">
                Telegram link sent to:
              </span>

              <span className="text-white font-medium text-sm">
                {email}
              </span>
            </div>
          )}
        </div>

        {/* STEPS */}
        <div className="text-left text-white/60 text-sm space-y-2">
          <h3 className="text-white font-semibold text-lg mb-2">
            All that’s left to do:
          </h3>

          <div>1. Check your email for access</div>
          <div>2. Join the private Telegram</div>
          <div>3. Start receiving picks today</div>
        </div>

        {/* CTA */}
        <a
          href="/"
          className="btn-primary text-center px-6 py-3 rounded-lg bg-blue text-black font-semibold hover:bg-blue-dim transition-all flex items-center justify-center gap-2"
        >
          Back to Home <ArrowRight size={18} />
        </a>

        <p className="text-xs text-center text-white/40">
          © 2026 Sadzys Singles
        </p>

      </div>
    </div>
  )
}
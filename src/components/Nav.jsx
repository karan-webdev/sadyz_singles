import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

export default function Nav() {
  const [isHidden, setIsHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY

      if (y > 80) {
        setIsHidden(y > lastY)
      } else {
        setIsHidden(false)
      }

      setLastY(y)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-sm border-b border-text-dim/10 transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-baseline gap-1 font-bricolage font-bold text-lg">
          <span className="text-text">SADZYS</span>
          <span className="text-text/70">SINGLES</span>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-text/70 hover:text-text transition-colors text-sm"
          >
            How It Works
          </a>

          <a
            href="#proof"
            className="text-text/70 hover:text-text transition-colors text-sm"
          >
            Results
          </a>

          <a
            href="#multis"
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg bg-green text-black font-semibold text-sm hover:bg-green-dim transition-all transform hover:-translate-y-0.5"
          >
            Join Multis <ChevronRight size={16} />
          </a>
        </div>

        {/* MOBILE CTA ONLY */}
        <a
          href="#multis"
          className="btn-primary md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-green text-black font-semibold text-sm hover:bg-green-dim transition-all"
        >
          Join Multis <ChevronRight size={16} />
        </a>

      </div>
    </nav>
  )
}
import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import SinglesSoldOut from './components/SinglesSoldOut'
import MultisSection from './components/MultisSection'
import TransparencySection from './components/TransparencySection'
import ProofSection from './components/ProofSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const animateCount = (el) => {
      const count = parseFloat(el.dataset.countup)
      if (Number.isNaN(count)) return
      const prefix = el.dataset.prefix ?? ''
      const suffix = el.dataset.suffix ?? ''
      const decimals = String(el.dataset.countup).includes('.') ? 2 : 0
      const startTime = performance.now()

      const tick = (time) => {
        const progress = Math.min((time - startTime) / 1200, 1)
        el.textContent = prefix + (count * easeOut(progress)).toFixed(decimals) + suffix
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    const animateFill = (el) => {
      const target = Number(el.dataset.fill ?? 0)
      if (Number.isNaN(target)) return
      const startTime = performance.now()

      const tick = (time) => {
        const progress = Math.min((time - startTime) / 1200, 1)
        el.style.width = `${easeOut(progress) * target}%`
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        el.classList.add('reveal-visible')
        if (el.dataset.countup) animateCount(el)
        if (el.dataset.fill) animateFill(el)
        obs.unobserve(el)
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('[data-reveal], [data-countup], [data-fill]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />
      <Hero />
      <HowItWorks />
      <SinglesSoldOut />
      <MultisSection />
      <TransparencySection />
      <ProofSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}

export default App

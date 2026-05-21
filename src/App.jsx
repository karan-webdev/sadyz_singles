import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhyMostLose from './components/WhyMostLose'
import Testimonails from './components/Testimonials'
import SinglesSoldOut from './components/SinglesSoldOut'
import MultisSection from './components/MultisSection'
import TransparencySection from './components/TransparencySection'
import ProofSection from './components/ProofSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // springy easing with slight overshoot for a more noticeable reveal
    const easeOutBack = (t) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    const animateCount = (el) => {
      const count = parseFloat(el.dataset.countup)
      if (Number.isNaN(count)) return
      const prefix = el.dataset.prefix ?? ''
      const suffix = el.dataset.suffix ?? ''
      const decimals = String(el.dataset.countup).includes('.') ? 2 : 0
      const startTime = performance.now()
      const duration = 900 // shorter, snappier count-up

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1)
        el.textContent = prefix + (count * easeOutBack(progress)).toFixed(decimals) + suffix
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    const animateFill = (el) => {
      const target = Number(el.dataset.fill ?? 0)
      if (Number.isNaN(target)) return
      const startTime = performance.now()
      const duration = 900

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1)
        el.style.width = `${Math.max(0, Math.min(100, easeOutBack(progress) * target))}%`
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
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })

    document.querySelectorAll('[data-reveal], [data-countup], [data-fill]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text">
      <Nav />
      <Hero />
      <Testimonails />
      <HowItWorks />
      <SinglesSoldOut />
      <MultisSection />
      <TransparencySection />
      <ProofSection />
      <FinalCTA />
      <WhyMostLose />
      <Footer />
    </div>
  )
}

export default App

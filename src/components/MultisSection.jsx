import { useEffect, useRef, useState } from 'react'
import { CheckCircle, RefreshCw, Users, Shield } from 'lucide-react'

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(entry.target)
        }
      },
      {
        root: null,
        threshold: options.threshold ?? 0.12,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      }
    )

    obs.observe(node)

    return () => obs.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return inView
}

function Animated({ children, className = '', delay = 0, as: Tag = 'div', threshold, rootMargin }) {
  const ref = useRef(null)
  const visible = useInView(ref, { threshold, rootMargin })

  return (
    <Tag
      ref={ref}
      className={`${className} ${visible ? 'show' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </Tag>
  )
}

export default function MultisSection() {
  const headerRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const headerVisible = useInView(headerRef, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  })

  const leftVisible = useInView(leftRef, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  })

  const rightVisible = useInView(rightRef, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  })

  return (
    <>
      <style>{`
        .fade {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .fade.show {
          opacity: 1;
          transform: translateY(0);
        }

        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.15s; }
        .d3 { transition-delay: 0.25s; }

        .left-fade {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .left-fade.show {
          opacity: 1;
          transform: translateY(0);
        }

        .feature {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          will-change: opacity, transform;
        }

        .feature.show {
          opacity: 1;
          transform: translateY(0);
        }

        .card {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .card.show {
          opacity: 1;
          transform: translateY(0);
        }

        .delay1 { transition-delay: 0.15s; }
        .delay2 { transition-delay: 0.3s; }

        .item-fade {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          will-change: opacity, transform;
        }

        .item-fade.show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section id="multis" className="py-24 bg-bg/50 border-y border-text-dim/10">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={headerRef} className="mb-16">
            <div className={`fade d1 text-blue text-sm font-semibold tracking-wide uppercase mb-2 ${headerVisible ? "show" : ""}`}>
              MAIN OFFER — OPEN NOW
            </div>

            <h2 className={`fade d2 text-4xl md:text-5xl font-bricolage font-bold mb-3 ${headerVisible ? "show" : ""}`}>
              Multis Channel
            </h2>

            <p className={`fade d3 text-text-muted text-lg ${headerVisible ? "show" : ""}`}>
              Multi-leg bets that combine several selections for bigger returns with a smaller stake. Fully tracked, beginner-friendly, unlimited spots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div ref={leftRef}>
              <div className={`left-fade ${leftVisible ? "show" : ""}`}>
                <div className="space-y-8">
                  <div>
                    <Animated
                      as="h3"
                      threshold={0.12}
                      rootMargin="0px 0px -10% 0px"
                      className="text-2xl font-bricolage font-bold mb-3"
                      delay={0}
                    >
                      What are Multis?
                    </Animated>

                    <Animated
                      as="p"
                      threshold={0.12}
                      rootMargin="0px 0px -10% 0px"
                      className="text-text-muted leading-relaxed"
                      delay={0.08}
                    >
                      Multis combine 2-10 individual picks into one multi-leg bet. If all legs hit, your returns are multiplied. Lower stake, higher potential upside. Perfect for managed risk.
                    </Animated>

                    <Animated
  as="div"
  threshold={0.12}
  rootMargin="0px 0px -10% 0px"
  className="mt-5 p-4 border-y border-text-dim/10"
  delay={0.15}
>
  <div className="text-1xl  font-bricolage font-semibold text-blue mb-2">
    Betting structure
  </div>

  <ul className="space-y-1 text-sm text-text-muted">
    <li>• Around 50/50 promo + non-promo bets</li>
    <li>• All picks +EV (expected value) focused</li>
    <li>• Mix of SGM & CGM (same game / cross-game multis)</li>
    <li>• Wide bookie coverage shown in slips</li>
  </ul>
</Animated>
                  </div>

                     {/* TRUST BAND (REFUND GUARANTEE - UPGRADED) */}
                  <Animated
                    as="div"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="mt-6 p-4 rounded-lg border border-blue/30 bg-blue/5 flex items-start gap-3"
                    delay={0.25}
                  >
                  

                    
                    <div>
                     <div className="flex items-center gap-2 text-xs text-blue uppercase tracking-wide mb-2">
                        <Shield size={16} className="text-blue flex-shrink-0" />
                        <span>Risk Protection</span>
                     </div>
                      <div className="font-semibold text-text">
                        100% Refund Guarantee
                      </div>
                      <div className="text-sm text-text-muted">
                        Join before Round 14 - if there’s no profit between then and the Grand Final, you get a full refund.
                      </div>
                    </div>
                  </Animated>

                </div>
              </div>
            </div>

            <div ref={rightRef} className="space-y-4">
              <Animated
                as="div"
                threshold={0.12}
                rootMargin="0px 0px -10% 0px"
                className={`card delay1 p-6 rounded-xl border border-text-dim/30 bg-bg-card hover:border-blue/50 transition-all`}
                delay={0}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-blue text-xs font-semibold tracking-wide uppercase">
                      Weekly Pass
                    </div>

                    <div className="text-3xl font-bold text-text font-mono mt-2">
                      $12.50
                    </div>

                    <div className="text-sm text-text-muted">
                      per week
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.05}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Roughly <strong className="text-blue">20 multis</strong> per round</span>
                  </Animated>

                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.1}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Telegram access</span>
                  </Animated>

                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.15}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Exclusive community access</span>
                  </Animated>
                </ul>

                <Animated
                  as="button"
                  threshold={0.12}
                  rootMargin="0px 0px -10% 0px"
                  className="btn-primary w-full py-2 rounded-lg bg-blue text-black font-semibold hover:bg-blue-dim transition-all item-fade"
                  delay={0.2}
                >
                  Get Weekly
                </Animated>

                <Animated
                  as="p"
                  threshold={0.12}
                  rootMargin="0px 0px -10% 0px"
                  className="text-xs text-text-dim text-center mt-3 item-fade"
                  delay={0.25}
                >
                  Cancel anytime
                </Animated>
              </Animated>

              <Animated
                as="div"
                threshold={0.12}
                rootMargin="0px 0px -10% 0px"
                className={`card delay2 relative p-6 rounded-xl border-2 border-blue bg-bg-card hover:border-blue transition-all ring-1 ring-blue/30`}
                delay={0}
              >
                <div className="absolute -top-3 left-6 px-2 py-1 bg-blue text-black text-xs font-bold rounded-full">
                  BEST VALUE
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-blue text-xs font-semibold tracking-wide uppercase">
                      Season Pass
                    </div>

                    <div className="text-3xl font-bold text-text font-mono mt-2">
                      $150
                    </div>

                    <div className="text-sm text-text-muted">
                      rest of season (18 weeks incl. finals)
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.05}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Roughly <strong className="text-blue">20 multis</strong> per round</span>
                  </Animated>

                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.1}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Telegram access</span>
                  </Animated>

                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.15}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span>Exclusive community access</span>
                  </Animated>

                  <Animated
                    as="li"
                    threshold={0.12}
                    rootMargin="0px 0px -10% 0px"
                    className="item-fade text-sm text-text-muted flex items-center gap-2"
                    delay={0.2}
                  >
                    <CheckCircle size={16} className="text-green flex-shrink-0" />
                    <span class="text-blue font-bold">Full refund guarantee</span>
                  </Animated>
                </ul>

                <Animated
                  as="button"
                  threshold={0.12}
                  rootMargin="0px 0px -10% 0px"
                  className="btn-primary w-full py-2 rounded-lg bg-blue text-black font-semibold hover:bg-blue-dim transition-all item-fade"
                  delay={0.25}
                >
                  Get Season Pass
                </Animated>

                <Animated
                  as="p"
                  threshold={0.12}
                  rootMargin="0px 0px -10% 0px"
                  className="text-xs text-text-dim text-center mt-3 item-fade"
                  delay={0.3}
                >
                  Avg. $8.33 per week
                </Animated>
              </Animated>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
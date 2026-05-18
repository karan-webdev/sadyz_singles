import { CheckCircle, RefreshCw, Users } from 'lucide-react'

export default function MultisSection() {
  return (
    <section id="multis" className="py-24 bg-bg/50 border-y border-text-dim/10">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div data-reveal data-reveal-effect="big" className="mb-16">
          <div className="text-green text-sm font-semibold tracking-wide uppercase mb-2">
            MAIN OFFER — OPEN NOW
          </div>

          <h2 className="text-4xl md:text-5xl font-bricolage font-bold mb-3">
            Multis Channel
          </h2>

          <p className="text-text-muted text-lg">
            Multi-leg bets that combine several selections for bigger returns with a smaller stake. Fully tracked, beginner-friendly, unlimited spots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* LEFT */}
          <div data-reveal className="space-y-8">

            <div>
              <h3 className="text-2xl font-bricolage font-bold mb-3">
                What are Multis?
              </h3>

              <p className="text-text-muted leading-relaxed">
                Multis combine 2-5 individual picks into one multi-leg bet. If all legs hit, your returns are multiplied. Lower stake, higher potential upside. Perfect for managed risk.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-3">
              {[
                {
                  icon: CheckCircle,
                  title: 'Fully Tracked',
                  desc: 'Every multi logged with odds and stake'
                },
                {
                  icon: Users,
                  title: 'Unlimited Members',
                  desc: 'No caps. As many people as want to join'
                },
                {
                  icon: RefreshCw,
                  title: '100% Refund Guarantee',
                  desc: 'No profit by Round 12? Full money back.'
                }
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex gap-3">
                    <Icon size={20} className="text-green flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-text">
                        {item.title}
                      </div>
                      <div className="text-sm text-text-muted">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

          </div>

          {/* RIGHT */}
          <div data-reveal className="space-y-4">

            {/* MONTHLY */}
            <div className="p-6 rounded-xl border border-text-dim/30 bg-bg-card hover:border-green/50 transition-all">

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-green text-xs font-semibold tracking-wide uppercase">
                    Monthly Pass
                  </div>

                  <div className="text-3xl font-bold text-text font-mono mt-2">
                    $29
                  </div>

                  <div className="text-sm text-text-muted">
                    per month
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span><strong className="text-green">3-5 multis</strong> per week</span>
                </li>

                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span>Telegram access</span>
                </li>

                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span>Exclusive community access</span>
                </li>
              </ul>

              <button className="w-full py-2 rounded-lg bg-green text-black font-semibold hover:bg-green-dim transition-all">
                Get Monthly
              </button>

              <p className="text-xs text-text-dim text-center mt-3 font-mono">
                Cancel anytime
              </p>
            </div>

            {/* SEASON */}
            <div className="relative p-6 rounded-xl border-2 border-green bg-bg-card hover:border-green transition-all ring-1 ring-green/30">

              <div className="absolute -top-3 left-6 px-2 py-1 bg-green text-black text-xs font-bold rounded-full">
                BEST VALUE
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-green text-xs font-semibold tracking-wide uppercase">
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
                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span><strong className="text-green">3-5 multis</strong> per week</span>
                </li>

                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span>Telegram access</span>
                </li>

                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span>Exclusive community access</span>
                </li>

                <li className="text-sm text-text-muted flex items-center gap-2">
                  <CheckCircle size={16} className="text-green flex-shrink-0" />
                  <span>Refund guarantee</span>
                </li>
              </ul>

              <button className="w-full py-2 rounded-lg bg-green text-black font-semibold hover:bg-green-dim transition-all">
                Get Season Pass
              </button>

              <p className="text-xs text-text-dim text-center mt-3 font-mono">
                Avg. $8.33 per week
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
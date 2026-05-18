import { UserPlus, Bell, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      icon: UserPlus,
      title: 'Join the Channel',
      desc: 'Sign up in seconds and get instant access to the private Telegram tip channel.'
    },
    {
      num: 2,
      icon: Bell,
      title: 'Get Daily Picks',
      desc: 'Receive structured, high-confidence betting tips delivered straight to your phone every day.'
    },
    {
      num: 3,
      icon: TrendingUp,
      title: 'Place & Track Bets',
      desc: 'Follow the picks, place your bets, and track performance with full transparency over time.'
    }
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 bg-[#f6f7f9] border-y border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div data-reveal data-reveal-effect="big" className="mb-16">

          <div className="text-green text-sm font-semibold tracking-wide uppercase mb-2">
            SIMPLE 3-STEP SYSTEM
          </div>

          <h2 className="text-4xl md:text-5xl font-bricolage font-bold mb-3 text-black">
            Join. Get tips. Place bets.
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl">
            A straightforward process designed to remove guesswork and keep everything actionable.
          </p>

        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {steps.map((step, idx) => {
            const Icon = step.icon

            return (
              <div
                key={idx}
                data-reveal
                className="
                  p-6 rounded-2xl
                  bg-bg-card
                  border border-white/5
                  transition-all duration-300
                "
              >

                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center transition-colors">
                    <Icon className="text-green" size={22} />
                  </div>
                </div>

                <div className="text-sm font-mono text-gray-400 mb-2">
                  Step {step.num}
                </div>

                <h3 className="text-xl font-bricolage font-bold mb-2 text-white">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}
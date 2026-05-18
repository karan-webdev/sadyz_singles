import { BookOpen, BarChart3, Lock, Calendar } from 'lucide-react'

export default function TransparencySection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Logged Daily',
      desc: "Every pick recorded the moment it's sent. No retroactive changes."
    },
    {
      icon: BarChart3,
      title: 'Public Tracking',
      desc: 'Results visible in our Telegram channel. Anyone can audit our record.'
    },
    {
      icon: Lock,
      title: 'Unit System',
      desc: 'All bets tracked in standardized units for fair ROI comparison.'
    },
    {
      icon: Calendar,
      title: 'Season Based',
      desc: 'Clear accountability periods. Results reset each season.'
    }
  ]

  return (
    <section
      className="py-24 bg-[#f6f7f9] border-y border-gray-200"
      data-reveal
      data-reveal-effect="big"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-16" data-reveal>
          <div className="text-green text-sm font-semibold tracking-wide uppercase mb-2">
            HOW WE TRACK
          </div>

          <h2 className="text-4xl md:text-5xl font-bricolage font-bold mb-3 text-black">
            Transparent by design
          </h2>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, i) => {
            const Icon = feature.icon

            return (
              <div
                key={i}
                data-reveal
                className="
                  p-6 rounded-2xl
                  bg-bg-card
                  border border-white/5
                  transition-all duration-300
                "
              >

                <div className="w-12 h-12 rounded-xl bg-green/10 border border-green/20 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="text-green" size={22} />
                </div>

                <h3 className="text-lg font-bricolage font-bold mb-2 text-white">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>

              </div>
            )
          })}

        </div>

      </div>
    </section>
  )
}
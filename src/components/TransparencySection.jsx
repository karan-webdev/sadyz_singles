import { BookOpen, BarChart3, Lock, Calendar } from 'lucide-react'

export default function TransparencySection() {
  const features = [
    {
      icon: BookOpen,
      title: 'Logged Daily',
      desc: 'Every pick recorded the moment it\'s sent. No retroactive changes.'
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
    <section className="py-24" data-reveal data-reveal-effect="big">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16" data-reveal>
          <div className="text-green text-sm font-semibold tracking-wide uppercase mb-2">HOW WE TRACK</div>
          <h2 className="text-4xl md:text-5xl font-bricolage font-bold mb-3">Transparent by design</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div 
                key={i}
                data-reveal
                className="p-6 rounded-xl border border-text-dim/20 bg-bg-card/50 hover:border-green/50 hover:bg-bg-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-green/10 border border-green/30 flex items-center justify-center mb-4 group-hover:border-green/60 transition-colors">
                  <Icon className="text-green" size={24} />
                </div>
                <h3 className="text-lg font-bricolage font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

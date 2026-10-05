import { Activity, Network, MessageCircle, ShieldCheck, BadgeCheck, Lock, Sparkles } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts'
import { GlareCard } from './glare-cards'

const chartData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 52 },
  { time: '08:00', value: 48 },
  { time: '12:00', value: 70 },
  { time: '16:00', value: 61 },
  { time: '20:00', value: 85 },
  { time: '23:59', value: 99 },
]

export function GlareFeatureGrid() {
  return (
    <section className="px-4 py-16 md:py-24 bg-ink-950 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[600px] h-[600px] bg-brand-400/10 rounded-full blur-[160px] mix-blend-screen pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center mb-14 relative z-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Creator tools that run in real time</h2>
        <p className="mt-3 text-white/50">Track subscription earnings, fan growth, direct messages, and payouts live from one creator dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto relative z-10">
        {/* Card 1: Earnings area chart */}
        <GlareCard tiltIntensity={12} className="flex flex-col h-[400px] sm:h-[420px] bg-ink-900/60 border-white/10 p-6 sm:p-8">
          <div className="flex justify-between items-start mb-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-brand-400">
                <Activity size={18} />
                <span className="text-xs font-mono uppercase tracking-widest">Live earnings</span>
              </div>
              <h3 className="text-2xl font-semibold text-white">Monthly revenue</h3>
            </div>
            <span className="text-3xl font-mono text-white/90">$4.2k</span>
          </div>

          <div className="h-44 w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlareCard>

        {/* Card 2: Interactive media focus */}
        <GlareCard tiltIntensity={20} glareColor="rgba(56, 189, 248, 0.4)" className="h-[420px] p-0 overflow-hidden group border-none">
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=1000&fit=crop&q=80"
            alt="Direct messaging"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-white mb-2">Direct messaging</h3>
              <p className="text-white/60 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Chat with subscribers one-on-one and build relationships that keep them coming back.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/20" />
                <MessageCircle className="text-brand-400 animate-pulse" size={16} />
              </div>
            </div>
          </div>
        </GlareCard>

        {/* Card 3: Fan growth bar chart */}
        <GlareCard tiltIntensity={15} glareColor="rgba(14, 165, 233, 0.25)" className="h-[420px] flex flex-col justify-between bg-ink-950/80 border-white/5">
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center">
              <Network className="text-brand-400" size={24} />
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs font-mono mb-1 uppercase tracking-tighter">Fan growth</p>
              <h3 className="text-4xl font-bold text-white tracking-tighter">
                +1.2k<span className="text-brand-400 text-lg"> /mo</span>
              </h3>
            </div>
          </div>

          <div className="h-36 w-full px-2 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} animationBegin={500} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlareCard>

        {/* Card 4: Secure payouts */}
        <GlareCard tiltIntensity={14} glareColor="rgba(56, 189, 248, 0.3)" className="h-[260px] flex flex-col justify-between bg-ink-900/60 border-white/10">
          <ShieldCheck className="text-brand-400" size={28} />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Secure payouts</h3>
            <p className="text-white/50 text-sm">Earnings move straight to your bank account every month, tracked in your wallet.</p>
          </div>
        </GlareCard>

        {/* Card 5: Identity verified */}
        <GlareCard tiltIntensity={14} glareColor="rgba(56, 189, 248, 0.3)" className="h-[260px] flex flex-col justify-between bg-ink-900/60 border-white/10">
          <BadgeCheck className="text-brand-400" size={28} />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Verified creators</h3>
            <p className="text-white/50 text-sm">Every account goes through identity verification before it can publish.</p>
          </div>
        </GlareCard>

        {/* Card 6: Content protection */}
        <GlareCard tiltIntensity={14} glareColor="rgba(56, 189, 68, 0.3)" className="h-[260px] flex flex-col justify-between bg-ink-900/60 border-white/10">
          <Lock className="text-brand-400" size={28} />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Content protection</h3>
            <p className="text-white/50 text-sm">Subscriber-only posts stay locked and blurred until someone actually subscribes.</p>
          </div>
        </GlareCard>
      </div>

      <div className="flex items-center justify-center gap-2 mt-10 text-white/40 text-sm relative z-10">
        <Sparkles size={14} className="text-brand-400" /> Hover a card to see it tilt toward your cursor.
      </div>
    </section>
  )
}

export default GlareFeatureGrid

import { useMemo } from 'react'
import { Activity, Globe2, MessageCircle } from 'lucide-react'
import DottedMap from 'dotted-map'
import { Area, AreaChart, CartesianGrid } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './chart'

const map = new DottedMap({ height: 55, grid: 'diagonal' })
const points = map.getPoints()

function Map() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-full">
      {points.map((point, index) => (
        <circle key={index} cx={point.x} cy={point.y} r={0.15} fill="currentColor" className="text-brand-400" />
      ))}
    </svg>
  )
}

const chartConfig = {
  earnings: { label: 'Earnings', color: '#0ea5e9' },
  subscribers: { label: 'Subscribers', color: '#38bdf8' },
}

const chartData = [
  { month: 'May', earnings: 56, subscribers: 224 },
  { month: 'Jun', earnings: 56, subscribers: 224 },
  { month: 'Jul', earnings: 126, subscribers: 252 },
  { month: 'Aug', earnings: 205, subscribers: 410 },
  { month: 'Sep', earnings: 200, subscribers: 126 },
  { month: 'Oct', earnings: 400, subscribers: 800 },
]

function EarningsChart() {
  const config = useMemo(() => chartConfig, [])
  return (
    <ChartContainer className="h-[320px] md:h-96 aspect-auto" config={config}>
      <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0 }}>
        <defs>
          <linearGradient id="fillEarnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-earnings)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-earnings)" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="fillSubscribers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-subscribers)" stopOpacity={0.8} />
            <stop offset="55%" stopColor="var(--color-subscribers)" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Area strokeWidth={2} dataKey="subscribers" type="stepBefore" fill="url(#fillSubscribers)" stroke="var(--color-subscribers)" stackId="a" />
        <Area strokeWidth={2} dataKey="earnings" type="stepBefore" fill="url(#fillEarnings)" stroke="var(--color-earnings)" stackId="a" />
      </AreaChart>
    </ChartContainer>
  )
}

export function FeaturesGrid() {
  return (
    <section className="px-4 py-16 md:py-24 bg-ink-950">
      <div className="mx-auto grid max-w-5xl border border-white/10 md:grid-cols-2 rounded-2xl overflow-hidden">
        {/* Global reach */}
        <div>
          <div className="p-6 sm:p-12">
            <span className="text-white/50 flex items-center gap-2">
              <Globe2 className="size-4" />
              Creators everywhere
            </span>
            <p className="mt-8 text-2xl font-semibold text-white">A global stage. Fans and creators from every timezone.</p>
          </div>

          <div aria-hidden className="relative">
            <div className="absolute inset-0 z-10 m-auto size-fit">
              <div className="rounded-xl bg-ink-900 z-[1] relative flex size-fit w-fit items-center gap-2 border border-white/10 px-3 py-1 text-xs font-medium text-white shadow-md shadow-black/20">
                <span className="text-lg">🇯🇵</span> Last signup from Japan
              </div>
              <div className="rounded-xl bg-ink-900 absolute inset-2 -bottom-2 mx-auto border border-white/10 px-3 py-4 text-xs font-medium shadow-md shadow-black/20" />
            </div>

            <div className="relative overflow-hidden">
              <div className="[background-image:radial-gradient(var(--tw-gradient-stops))] z-[1] from-transparent to-ink-950 to-75% absolute inset-0" />
              <Map />
            </div>
          </div>
        </div>

        {/* Messaging */}
        <div className="overflow-hidden border-t border-white/10 bg-ink-900 p-6 sm:p-12 md:border-0 md:border-l md:border-white/10">
          <div className="relative z-10">
            <span className="text-white/50 flex items-center gap-2">
              <MessageCircle className="size-4" />
              Direct messaging, built in
            </span>
            <p className="my-8 text-2xl font-semibold text-white">Stay close to the fans who support you.</p>
          </div>
          <div aria-hidden className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex justify-center items-center size-5 rounded-full border border-white/10">
                  <span className="size-3 rounded-full bg-brand-500" />
                </span>
                <span className="text-white/40 text-xs">Sat 22 Feb</span>
              </div>
              <div className="rounded-xl bg-ink-950 mt-1.5 w-3/5 border border-white/10 p-3 text-xs text-white">
                Hey! Love the new post, when's the next drop?
              </div>
            </div>

            <div>
              <div className="rounded-xl mb-1 ml-auto w-3/5 bg-brand-600 p-3 text-xs text-white">
                Thank you! New set goes live Friday for subscribers 🎉
              </div>
              <span className="text-white/40 block text-right text-xs">Now</span>
            </div>
          </div>
        </div>

        {/* Stat */}
        <div className="col-span-full border-y border-white/10 p-12">
          <p className="text-center text-4xl font-semibold lg:text-7xl text-white">99.99% Uptime</p>
        </div>

        {/* Earnings chart */}
        <div className="relative col-span-full bg-ink-950">
          <div className="relative z-10 max-w-lg px-6 pr-12 pt-6 md:px-12 md:pt-12">
            <span className="text-white/50 flex items-center gap-2">
              <Activity className="size-4" />
              Earnings, live
            </span>
            <p className="my-8 text-2xl font-semibold text-white">
              Watch your subscribers and earnings grow in real time.{' '}
              <span className="text-white/50">Know exactly how your page is performing.</span>
            </p>
          </div>
          <EarningsChart />
        </div>
      </div>
    </section>
  )
}

export default FeaturesGrid

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

const DEFAULT_CREATORS = [
  {
    name: 'Darren Mills',
    role: 'Pro Boxer',
    followers: '500K',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Ivy Solange',
    role: 'Model',
    followers: '20M+',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Marcus Reed',
    role: 'Entrepreneur',
    followers: '47M',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Nina Carrow',
    role: 'Musician',
    followers: '8.4M',
    image: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Theo Marsh',
    role: 'Footballer',
    followers: '12M',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Soraya Kim',
    role: 'Artist',
    followers: '3.2M',
    image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Elena Cruz',
    role: 'Model',
    followers: '15M',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&h=1000&fit=crop&q=80',
  },
  {
    name: 'Jonah Pierce',
    role: 'Entrepreneur',
    followers: '6.1M',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=700&h=1000&fit=crop&q=80',
  },
]

// Edge-to-edge panels, like a wide photo strip wrapped around a cylinder:
// the centre panel faces the viewer flat, each neighbour is rotated a little
// further away in 3D and pushed back, so the strip reads as one continuous
// curved surface rather than separate floating cards.
const SLOT_STYLES_FN = (CARD_W) => ({
  '-3': { x: -3 * CARD_W, rotateY: 42, z: -260, opacity: 0, brightness: 0.25 },
  '-2': { x: -2 * CARD_W, rotateY: 34, z: -160, opacity: 1, brightness: 0.35 },
  '-1': { x: -1 * CARD_W, rotateY: 22, z: -70, opacity: 1, brightness: 0.55 },
  0: { x: 0, rotateY: 0, z: 40, opacity: 1, brightness: 1 },
  1: { x: 1 * CARD_W, rotateY: -22, z: -70, opacity: 1, brightness: 0.55 },
  2: { x: 2 * CARD_W, rotateY: -34, z: -160, opacity: 1, brightness: 0.35 },
  3: { x: 3 * CARD_W, rotateY: -42, z: -260, opacity: 0, brightness: 0.25 },
})

/**
 * Horizontal drag/auto-advancing creator carousel: a curved strip of panels
 * wrapped in 3D, the active one facing flat and the rest angled away —
 * drag or let it idle and it keeps turning right-to-left on its own.
 */
export function CreatorCarousel({ creators = DEFAULT_CREATORS, autoPlayMs = 3000 }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cardW, setCardW] = useState(300)
  const count = creators.length

  useEffect(() => {
    const update = () => setCardW(window.innerWidth < 640 ? 200 : 300)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const SLOT_STYLES = SLOT_STYLES_FN(cardW)

  const go = useCallback((dir) => setIndex((i) => (((i + dir) % count) + count) % count), [count])

  useEffect(() => {
    if (paused || count <= 1) return
    const id = setInterval(() => go(1), autoPlayMs)
    return () => clearInterval(id)
  }, [paused, go, autoPlayMs, count])

  const slot = (i) => {
    let diff = i - index
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    return diff
  }

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
    <div
      className="relative w-full h-[400px] sm:h-[520px] select-none overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {creators.map((creator, i) => {
          const diff = slot(i)
          if (Math.abs(diff) > 3) return null
          const style = SLOT_STYLES[String(diff)]
          const isActive = diff === 0

          return (
            <motion.div
              key={creator.name}
              className="absolute w-[200px] sm:w-[300px] h-[340px] sm:h-[460px] cursor-grab active:cursor-grabbing"
              style={{ zIndex: 10 - Math.abs(diff), transformStyle: 'preserve-3d' }}
              animate={{ x: style.x, rotateY: style.rotateY, z: style.z, opacity: style.opacity }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              drag={isActive ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
                setPaused(false)
              }}
              onClick={() => {
                if (!isActive) setIndex(i)
              }}
            >
              <div className="relative w-full h-full overflow-hidden border border-white/10 bg-ink-900">
                <img
                  src={creator.image}
                  alt={`${creator.name}, ${creator.role} on CreatorHub`}
                  className="w-full h-full object-cover"
                  style={{ filter: `brightness(${style.brightness})` }}
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-center">
                  <p className={`font-bold transition-all ${isActive ? 'text-white text-xl' : 'text-white/60 text-base'}`}>
                    {creator.name}
                  </p>
                  <p className={`text-xs mt-1 ${isActive ? 'text-brand-300' : 'text-white/40'}`}>{creator.role}</p>
                  <p className={`text-xs mt-0.5 flex items-center justify-center gap-1 ${isActive ? 'text-white/70' : 'text-white/30'}`}>
                    <Users size={11} /> {creator.followers} followers
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {creators.map((creator, i) => (
          <button
            key={creator.name}
            onClick={() => setIndex(i)}
            aria-label={`Go to ${creator.name}`}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default CreatorCarousel

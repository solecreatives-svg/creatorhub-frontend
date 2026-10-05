import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const SLIDES = [
  {
    word: 'Models',
    left: { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=650&fit=crop&q=80', name: 'Ivy Solange', followers: '20M+' },
    right: { image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=650&fit=crop&q=80', name: 'Elena Cruz', followers: '15M+' },
  },
  {
    word: 'Footballers',
    left: { image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=500&h=650&fit=crop&q=80', name: 'Theo Marsh', followers: '12M+' },
    right: { image: 'https://images.unsplash.com/photo-1517747614396-d21a78e850e8?w=500&h=650&fit=crop&q=80', name: 'Rafa Costa', followers: '9.6M+' },
  },
  {
    word: 'Entrepreneurs',
    left: { image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=650&fit=crop&q=80', name: 'Marcus Reed', followers: '47M+' },
    right: { image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=650&fit=crop&q=80', name: 'Jonah Pierce', followers: '6.1M+' },
  },
  {
    word: 'Musicians',
    left: { image: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?w=500&h=650&fit=crop&q=80', name: 'Nina Carrow', followers: '8.4M+' },
    right: { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=650&fit=crop&q=80', name: 'Dara Voss', followers: '5.3M+' },
  },
  {
    word: 'Artists',
    left: { image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=500&h=650&fit=crop&q=80', name: 'Soraya Kim', followers: '3.2M+' },
    right: { image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=650&fit=crop&q=80', name: 'Priya Chandran', followers: '2.8M+' },
  },
]

function CreatorPill({ person }) {
  return (
    <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/15 rounded-full pl-1.5 pr-3 py-1.5">
      <img src={person.image} alt="" className="w-6 h-6 rounded-full object-cover" />
      <span className="text-xs font-medium text-white whitespace-nowrap">
        {person.name} · {person.followers} followers
      </span>
    </div>
  )
}

function SideImage({ person, side }) {
  return (
    <div
      className={`relative w-[150px] sm:w-[240px] md:w-[300px] aspect-[2/2.6] rounded-2xl overflow-hidden shadow-2xl border border-white/10 shrink-0 ${
        side === 'left' ? '-rotate-2' : 'rotate-2'
      }`}
    >
      <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <CreatorPill person={person} />
    </div>
  )
}

/**
 * Scroll-driven centerpiece: a vertical stack of creator categories with the
 * active one lit up and the rest dimmed, flanked by two creator photos (with
 * a small avatar/name/followers pill) that change together as the visitor
 * scrolls through the pinned section — one niche per scroll "step".
 */
export function WordCycleHero({
  label,
  eyebrow = 'Now open to all creators',
  subtitle = 'Turn your biggest fans into your most reliable income.',
  showCta = true,
}) {
  const sectionRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) {
        setIndex(0)
        return
      }
      const progress = Math.min(1, Math.max(0, -rect.top / total))
      const i = Math.min(SLIDES.length - 1, Math.floor(progress * SLIDES.length))
      setIndex(i)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const slide = SLIDES[index]

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden"
      style={{ height: `${SLIDES.length * 70}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {label && (
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight text-center mb-8">
            {label}
          </h2>
        )}
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1.5 border border-brand-500/30 mb-10">
            {eyebrow}
          </span>
        )}

        <div className="relative flex items-center justify-center gap-3 sm:gap-8 md:gap-14 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SideImage person={slide.left} side="left" />
            </motion.div>
          </AnimatePresence>

          <div className="text-center px-1 sm:px-6">
            <div className="h-[140px] sm:h-[200px] md:h-[240px] flex flex-col items-center justify-center overflow-hidden">
              {SLIDES.map((s, i) => {
                const diff = i - index
                const isActive = diff === 0
                return (
                  <motion.p
                    key={s.word}
                    animate={{
                      opacity: isActive ? 1 : Math.max(0.08, 0.3 - Math.abs(diff) * 0.08),
                      scale: isActive ? 1 : 0.72,
                      y: diff * -2,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className={`font-extrabold tracking-tight leading-[1.05] whitespace-nowrap ${
                      isActive ? 'text-white text-3xl sm:text-6xl md:text-7xl' : 'text-white text-xl sm:text-4xl md:text-5xl'
                    }`}
                  >
                    {s.word}
                  </motion.p>
                )
              })}
            </div>
            <p className="mt-4 text-white/60 text-sm sm:text-lg max-w-md mx-auto">{subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${index}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <SideImage person={slide.right} side="right" />
            </motion.div>
          </AnimatePresence>
        </div>

        {showCta && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="btn-primary text-base px-6 py-3">
              Start earning today
            </Link>
            <Link to="/explore" className="btn bg-white/10 text-white hover:bg-white/20 text-base px-6 py-3">
              Explore creators
            </Link>
          </div>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <span
              key={s.word}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WordCycleHero

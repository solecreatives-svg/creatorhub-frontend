import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from './magnetic-button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(239,68,68,0.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(239,68,68,0.8)); }
  30% { transform: scale(1); }
}
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(circle at 50% 50%, rgba(14,165,233,0.18) 0%, rgba(56,189,248,0.12) 40%, transparent 70%);
}

.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 100%);
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.18);
  color: #fff;
}

.footer-giant-bg-text {
  font-size: 15vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px rgba(255,255,255,0.15));
}
`

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Exclusive Content</span> <span className="text-brand-400/70">✦</span>
    <span>Direct Messaging</span> <span className="text-brand-300/70">✦</span>
    <span>Monthly Payouts</span> <span className="text-brand-400/70">✦</span>
    <span>Real Fan Relationships</span> <span className="text-brand-300/70">✦</span>
    <span>Built for Creators</span> <span className="text-brand-400/70">✦</span>
  </div>
)

export function CinematicFooter() {
  const wrapperRef = useRef(null)
  const giantTextRef = useRef(null)
  const headingRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: '0vh',
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={wrapperRef}
        className="cinematic-footer-wrapper relative flex min-h-[640px] w-full flex-col justify-between overflow-hidden bg-ink-950 text-white"
      >
        <div className="footer-aurora pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px]" />
        <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

        <div
          ref={giantTextRef}
          className="footer-giant-bg-text pointer-events-none absolute -bottom-[2vh] left-1/2 z-0 -translate-x-1/2 select-none whitespace-nowrap"
        >
          CREATORHUB
        </div>

        <div className="absolute top-10 left-0 z-10 w-full -rotate-2 scale-110 overflow-hidden border-y border-white/10 bg-ink-950/60 py-4 shadow-2xl backdrop-blur-md">
          <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold uppercase tracking-[0.3em] text-white/50 md:text-sm">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-28 sm:mt-20 mb-10 flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6">
          <h2
            ref={headingRef}
            className="footer-text-glow mb-8 sm:mb-10 text-center text-3xl sm:text-4xl font-black tracking-tighter md:text-7xl"
          >
            Ready to start earning?
          </h2>

          <div ref={linksRef} className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-wrap justify-center gap-4">
              <MagneticButton
                as={Link}
                to="/signup"
                className="footer-glass-pill group flex items-center gap-3 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-sm font-bold text-white md:text-base"
              >
                Become a creator
              </MagneticButton>

              <MagneticButton
                as={Link}
                to="/explore"
                className="footer-glass-pill group flex items-center gap-3 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-sm font-bold text-white md:text-base"
              >
                Explore creators
              </MagneticButton>
            </div>

            <div className="mt-2 flex w-full flex-wrap justify-center gap-3 md:gap-6">
              <MagneticButton as={Link} to="/privacy" className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-white/60 hover:text-white md:text-sm">
                Privacy Policy
              </MagneticButton>
              <MagneticButton as={Link} to="/terms" className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-white/60 hover:text-white md:text-sm">
                Terms of Service
              </MagneticButton>
              <MagneticButton as={Link} to="/about" className="footer-glass-pill rounded-full px-6 py-3 text-xs font-medium text-white/60 hover:text-white md:text-sm">
                About
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex w-full flex-col items-center justify-between gap-6 px-6 pb-8 md:flex-row md:px-12">
          <div className="order-2 text-[10px] font-semibold uppercase tracking-widest text-white/40 md:order-1 md:text-xs">
            © 2026 CreatorHub. All rights reserved.
          </div>

          <div className="footer-glass-pill order-1 flex cursor-default items-center gap-2 rounded-full border-white/10 px-6 py-3 md:order-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 md:text-xs">Crafted with</span>
            <span className="animate-footer-heartbeat text-sm text-red-500 md:text-base">❤</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 md:text-xs">by</span>
            <span className="ml-1 text-xs font-black tracking-normal text-white md:text-sm">CreatorHub</span>
          </div>

          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-white/60 hover:text-white"
          >
            <svg className="h-5 w-5 transform transition-transform duration-300 group-hover:-translate-y-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </MagneticButton>
        </div>
      </footer>
    </>
  )
}

export default CinematicFooter

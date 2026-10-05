import { useRef } from 'react'
import { TimelineContent } from './timeline-animation'

const revealVariants = {
  visible: (i) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
  hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
}

function Quote({ children }) {
  return <p>"{children}"</p>
}

function Byline({ name, role, avatar }) {
  return (
    <div className="flex justify-between items-end pt-5">
      <div>
        <h2 className="font-semibold lg:text-xl text-lg">{name}</h2>
        <p className="lg:text-base text-sm opacity-80">{role}</p>
      </div>
      <img
        src={avatar}
        alt={name}
        width={64}
        height={64}
        className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
      />
    </div>
  )
}

export default function ClientFeedback() {
  const testimonialRef = useRef(null)

  return (
    <div className="w-full bg-ink-900">
      <section className="relative h-full container text-white mx-auto rounded-lg py-12 sm:py-14 bg-ink-900" ref={testimonialRef}>
        <article className="max-w-screen-md mx-auto text-center space-y-2">
          <TimelineContent as="h2" className="xl:text-4xl text-2xl sm:text-3xl font-medium text-white px-4" animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by creators building real income
          </TimelineContent>
          <TimelineContent as="p" className="mx-auto text-white/50" animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Here's how CreatorHub members feel about running their business on the platform
          </TimelineContent>
        </article>

        <div className="lg:grid lg:grid-cols-3 gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          {/* Column 1 */}
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2">
            <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-brand-600 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1f_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
              <article className="mt-auto relative">
                <Quote>CreatorHub has been a game-changer for my coaching business. The platform is top-notch and payouts are always on time.</Quote>
                <Byline
                  name="Maya Ortiz"
                  role="Fitness Coach"
                  avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>

            <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit lg:shrink-0 flex flex-col justify-between relative bg-ink-950 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <article className="mt-auto">
                <Quote>We've seen incredible results since moving here. The messaging tools make it so easy to stay close to fans.</Quote>
                <Byline
                  name="Leo Nakamura"
                  role="Illustrator"
                  avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="lg:h-full md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-ink-950 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">"Their support team is highly responsive, and the dashboard genuinely helped me understand my audience."</p>
                <Byline
                  name="Priya Chandran"
                  role="Recipe Developer"
                  avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>

            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-ink-950 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">"We're extremely satisfied with CreatorHub. The payout flow and fair fees exceeded our expectations."</p>
                <Byline
                  name="John Reyes"
                  role="Music Producer"
                  avatar="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>

            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-ink-950 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm">"Customer support is absolutely exceptional — always available, always helpful."</p>
                <Byline
                  name="Steven Sunny"
                  role="Streamer"
                  avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-ink-950 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <article className="mt-auto">
                <Quote>CreatorHub has been a key partner in my growth as a creator.</Quote>
                <Byline
                  name="Rika Shinoda"
                  role="Digital Artist"
                  avatar="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>

            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-brand-600 text-white overflow-hidden rounded-lg border border-white/10 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff1f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1f_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
              <article className="mt-auto relative">
                <Quote>CreatorHub has been a true game-changer. Exceptional service combined with deep expertise has made a real impact on my business.</Quote>
                <Byline
                  name="Paul Brauch"
                  role="Podcast Host"
                  avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80"
                />
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </div>
  )
}

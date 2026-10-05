import { motion, useInView } from 'framer-motion'

/**
 * Reveals its children with a staggered fade/blur-in animation once the
 * `timelineRef` container scrolls into view. `as` lets you pick which motion
 * tag to render (defaults to "div"), `animationNum` controls the stagger
 * delay, and `customVariants` overrides the default animation.
 */
export function TimelineContent({
  as = 'div',
  children,
  animationNum = 0,
  customVariants,
  timelineRef,
  className,
  ...rest
}) {
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 })
  const MotionTag = motion[as] || motion.div

  const variants = customVariants || {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
    hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
  }

  return (
    <MotionTag
      custom={animationNum}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export default TimelineContent

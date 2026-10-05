import { forwardRef, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '../../lib/utils'

/**
 * Zero-dependency magnetic hover button: nudges toward the cursor on
 * mousemove, springs back on mouseleave. `as` lets you render it as a
 * button, an <a>, or a react-router <Link>.
 */
export const MagneticButton = forwardRef(function MagneticButton(
  { className, children, as: Component = 'button', ...props },
  forwardedRef
) {
  const localRef = useRef(null)

  useEffect(() => {
    const element = localRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect()
        const h = rect.width / 2
        const w = rect.height / 2
        const x = e.clientX - rect.left - h
        const y = e.clientY - rect.top - w

        gsap.to(element, {
          x: x * 0.4,
          y: y * 0.4,
          rotationX: -y * 0.15,
          rotationY: x * 0.15,
          scale: 1.05,
          ease: 'power2.out',
          duration: 0.4,
        })
      }

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1.2,
        })
      }

      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <Component
      ref={(node) => {
        localRef.current = node
        if (typeof forwardedRef === 'function') forwardedRef(node)
        else if (forwardedRef) forwardedRef.current = node
      }}
      className={cn('cursor-pointer', className)}
      {...props}
    >
      {children}
    </Component>
  )
})

export default MagneticButton

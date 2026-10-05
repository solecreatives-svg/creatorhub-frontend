import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
]

export function Navbar1() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const toggleMenu = () => setIsOpen((o) => !o)

  const cta = isAuthenticated
    ? { label: 'Go to app', onClick: () => navigate('/home') }
    : { label: 'Sign up free', onClick: () => navigate('/signup') }

  return (
    <div className="sticky top-0 z-40 flex justify-center w-full pt-4 pb-2 px-4 bg-gradient-to-b from-ink-950 via-ink-950/90 to-transparent">
      <div className="flex items-center justify-between px-5 py-2.5 bg-ink-900/90 backdrop-blur border border-white/10 rounded-full shadow-lg w-full max-w-3xl relative z-10">
        <Link to="/" className="flex items-center">
          <motion.span
            className="w-8 h-8 mr-6 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Sparkles size={16} />
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {LINKS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={cta.onClick}
            className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-brand-600 rounded-full hover:bg-brand-500 transition-colors"
          >
            {cta.label}
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }} aria-label="Toggle menu">
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-ink-950 z-50 pt-24 px-6 md:hidden"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {LINKS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <NavLink to={item.to} end={item.to === '/'} className="text-base text-white font-medium" onClick={toggleMenu}>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6 space-y-3"
              >
                {!isAuthenticated && (
                  <NavLink to="/login" onClick={toggleMenu} className="block text-center text-base text-white font-medium py-3 rounded-full border border-white/15">
                    Log in
                  </NavLink>
                )}
                <button
                  onClick={() => {
                    toggleMenu()
                    cta.onClick()
                  }}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-semibold text-white bg-brand-600 rounded-full hover:bg-brand-500 transition-colors"
                >
                  {cta.label}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar1

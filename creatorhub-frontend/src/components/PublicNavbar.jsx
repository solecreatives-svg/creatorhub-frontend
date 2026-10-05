import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLink = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`

export default function PublicNavbar() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-ink-900/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl text-white">
          <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <Sparkles size={18} />
          </span>
          CreatorHub
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/explore" className={navLink}>Explore</NavLink>
          <NavLink to="/pricing" className={navLink}>Pricing</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button onClick={() => navigate('/home')} className="btn-dark">Go to app</button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-secondary">Log in</button>
              <button onClick={() => navigate('/signup')} className="btn-primary">Sign up free</button>
            </>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-3 bg-ink-900">
          <NavLink to="/explore" onClick={() => setOpen(false)} className="block text-sm font-medium text-white/80">Explore</NavLink>
          <NavLink to="/pricing" onClick={() => setOpen(false)} className="block text-sm font-medium text-white/80">Pricing</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="block text-sm font-medium text-white/80">About</NavLink>
          <div className="flex gap-3 pt-2">
            {isAuthenticated ? (
              <button onClick={() => navigate('/home')} className="btn-dark w-full">Go to app</button>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="btn-secondary w-full">Log in</button>
                <button onClick={() => navigate('/signup')} className="btn-primary w-full">Sign up</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

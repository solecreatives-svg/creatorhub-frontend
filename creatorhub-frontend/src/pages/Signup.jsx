import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, User, Palette } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('fan')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signup({ name, email, password, isCreator: role === 'creator' })
      navigate(role === 'creator' ? '/dashboard' : '/home', { replace: true })
    } catch (err) {
      setError(err.message || 'Could not sign up. Check your backend is running.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-950 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-extrabold text-xl text-white mb-8">
          <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <Sparkles size={18} />
          </span>
          CreatorHub
        </Link>

        <div className="card p-8">
          <h1 className="text-2xl font-extrabold text-white mb-1">Create your account</h1>
          <p className="text-sm text-white/50 mb-6">Join as a fan or start earning as a creator.</p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('fan')}
              className={`rounded-xl border p-4 text-left transition-colors ${
                role === 'fan' ? 'border-brand-600 bg-brand-500/15' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <User size={20} className={role === 'fan' ? 'text-brand-600' : 'text-white/50'} />
              <p className="font-semibold text-sm mt-2 text-white">I'm a fan</p>
              <p className="text-xs text-white/50">Subscribe to creators</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('creator')}
              className={`rounded-xl border p-4 text-left transition-colors ${
                role === 'creator' ? 'border-brand-600 bg-brand-500/15' : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <Palette size={20} className={role === 'creator' ? 'text-brand-600' : 'text-white/50'} />
              <p className="font-semibold text-sm mt-2 text-white">I'm a creator</p>
              <p className="text-xs text-white/50">Earn from subscribers</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full name</label>
              <input className="input" placeholder="Jordan Lee" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
              {submitting ? 'Creating account…' : `Create ${role === 'creator' ? 'creator' : 'fan'} account`}
            </button>
          </form>

          <p className="text-xs text-white/40 mt-4 text-center">
            Creates a real account in your database — make sure the backend is running.
          </p>

          <p className="text-sm text-white/60 mt-6 text-center">
            Already have an account? <Link to="/login" className="text-brand-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const tabs = ['Profile', 'Account', 'Notifications', 'Danger zone']

export default function Settings() {
  const { user, updateUser, logout } = useAuth()
  const [tab, setTab] = useState('Profile')
  const [name, setName] = useState(user.name)
  const [handle, setHandle] = useState(user.handle)
  const [bio, setBio] = useState(user.bio)
  const [email, setEmail] = useState(user.email)
  const [prefs, setPrefs] = useState({ newPosts: true, messages: true, renewals: true, marketing: false })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const saveProfile = async (e) => {
    e.preventDefault()
    setError('')
    try {
      // Note: the backend only persists name/bio today — handle changes
      // aren't wired up yet (would need a uniqueness check server-side).
      await updateUser({ name, bio })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.message)
    }
  }

  const saveAccount = async (e) => {
    e.preventDefault()
    setError('Email changes aren’t wired to the backend yet — this would need a verification flow.')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">Settings</h1>

      <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px ${
              tab === t ? 'border-brand-600 text-white' : 'border-transparent text-white/50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {error && (
        <div className="max-w-lg mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {tab === 'Profile' && (
        <form onSubmit={saveProfile} className="card p-6 space-y-4 max-w-lg">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            <button type="button" className="btn-secondary">Change photo</button>
          </div>
          <div>
            <label className="label">Display name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label">Handle</label>
            <input className="input" value={handle} onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9]/gi, ''))} />
          </div>
          <div>
            <label className="label">Bio</label>
            <textarea className="input" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">Save changes</button>
            {saved && <span className="text-sm text-brand-600 font-medium">Saved!</span>}
          </div>
        </form>
      )}

      {tab === 'Account' && (
        <form onSubmit={saveAccount} className="card p-6 space-y-4 max-w-lg">
          <div>
            <label className="label">Email address</label>
            <input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" defaultValue="••••••••••" />
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn-primary">Save changes</button>
            {saved && <span className="text-sm text-brand-600 font-medium">Saved!</span>}
          </div>
        </form>
      )}

      {tab === 'Notifications' && (
        <div className="card p-6 max-w-lg space-y-5">
          {[
            { key: 'newPosts', label: 'New posts from creators I subscribe to' },
            { key: 'messages', label: 'Direct messages' },
            { key: 'renewals', label: 'Subscription renewal reminders' },
            { key: 'marketing', label: 'Product updates and offers' },
          ].map((p) => (
            <label key={p.key} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-white">{p.label}</span>
              <input
                type="checkbox"
                checked={prefs[p.key]}
                onChange={() => setPrefs((prev) => ({ ...prev, [p.key]: !prev[p.key] }))}
                className="w-5 h-5 accent-brand-600"
              />
            </label>
          ))}
        </div>
      )}

      {tab === 'Danger zone' && (
        <div className="card p-6 max-w-lg space-y-4 border-red-500/30">
          <div>
            <p className="font-semibold text-white">Log out</p>
            <p className="text-sm text-white/50 mb-2">Sign out of CreatorHub on this device.</p>
            <button onClick={logout} className="btn-secondary">Log out</button>
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="font-semibold text-red-600">Delete account</p>
            <p className="text-sm text-white/50 mb-2">This will permanently remove your account and subscriptions. This is a demo — nothing is actually deleted.</p>
            <button className="btn bg-red-600 text-white hover:bg-red-700 px-5 py-2.5">Delete account</button>
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/mockData'

export default function CreatorSettings() {
  const { user, updateUser, updateCreatorProfile, toggleCreatorMode } = useAuth()
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState(user.bio)
  const [price, setPrice] = useState(user.creatorProfile.price)
  const [category, setCategory] = useState(user.creatorProfile.category)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await updateUser({ name, bio })
      await updateCreatorProfile({ price: Number(price), category })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-white mb-6">Creator settings</h1>

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="h-32 rounded-xl overflow-hidden bg-ink-800">
          {user.creatorProfile.cover && (
            <img src={user.creatorProfile.cover} alt="" className="w-full h-full object-cover" />
          )}
        </div>

        <div>
          <label className="label">Display name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="label">Bio</label>
          <textarea className="input" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>

        <div>
          <label className="label">Category</label>
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Monthly subscription price (USD)</label>
          <input type="number" min="1" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? 'Saving…' : 'Save changes'}
          </button>
          {saved && <span className="text-sm text-brand-600 font-medium">Saved!</span>}
        </div>
      </form>

      <div className="card p-6 mt-6 border-red-500/30">
        <p className="font-semibold text-white">Turn off creator mode</p>
        <p className="text-sm text-white/50 mb-3">Switch back to browsing as a fan. Your creator profile and posts are kept.</p>
        <button onClick={() => toggleCreatorMode().catch((err) => setError(err.message))} className="btn-secondary">
          Switch to fan mode
        </button>
      </div>
    </div>
  )
}

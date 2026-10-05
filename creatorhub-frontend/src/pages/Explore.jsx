import React, { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { categories } from '../data/mockData'
import { creatorsApi } from '../lib/api'
import { normalizeCreator } from '../lib/normalize'
import CreatorCard from '../components/CreatorCard'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    creatorsApi
      .list(category)
      .then((data) => {
        if (!cancelled) setCreators(data.map(normalizeCreator))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load creators — is the backend running?')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [category])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    if (!q) return creators
    return creators.filter((c) => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q))
  }, [query, creators])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">Explore creators</h1>
        <p className="text-white/60 mt-2">Discover creators across fitness, art, music, cooking, and more.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            className="input pl-10"
            placeholder="Search creators or handles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
              category === cat ? 'bg-ink-950 text-white border-white/10' : 'border-white/10 text-white/60 hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">{error}</div>
      )}

      {loading ? (
        <p className="text-white/50 text-sm">Loading creators…</p>
      ) : filtered.length === 0 ? (
        <p className="text-white/50 text-sm">No creators match your search yet — try creating a creator account.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => <CreatorCard key={c.id} creator={c} />)}
        </div>
      )}
    </div>
  )
}

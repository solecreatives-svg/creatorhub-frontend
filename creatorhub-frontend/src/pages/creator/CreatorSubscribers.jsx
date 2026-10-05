import React, { useState } from 'react'
import { Search, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { creatorStats } from '../../data/mockData'

// Extend the seed list a bit so the table feels populated.
const extra = [
  { id: 's6', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/100?img=21', since: '3 weeks ago', tier: 'Monthly — $12' },
  { id: 's7', name: 'Marcus Webb', avatar: 'https://i.pravatar.cc/100?img=14', since: '1 month ago', tier: 'Annual — $120' },
  { id: 's8', name: 'Elena Petrova', avatar: 'https://i.pravatar.cc/100?img=29', since: '2 months ago', tier: 'Monthly — $12' },
]

export default function CreatorSubscribers() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const all = [...creatorStats.recentSubscribers, ...extra]
  const filtered = all.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Subscribers</h1>
          <p className="text-white/50">{all.length} total subscribers</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input className="input pl-10" placeholder="Search subscribers..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="card divide-y divide-white/10">
        {filtered.map((s) => (
          <div key={s.id} className="flex items-center gap-3 px-5 py-4">
            <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{s.name}</p>
              <p className="text-xs text-white/50">{s.tier} · joined {s.since}</p>
            </div>
            <button onClick={() => navigate('/messages')} className="btn-secondary text-sm">
              <MessageCircle size={14} /> Message
            </button>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-white/50 px-5 py-6">No subscribers match your search.</p>}
      </div>
    </div>
  )
}

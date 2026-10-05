import React from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Users } from 'lucide-react'
import { formatCount } from '../lib/normalize'

export default function CreatorCard({ creator }) {
  return (
    <Link to={`/creator/${creator.id}`} className="card overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="h-28 w-full overflow-hidden">
        <img src={creator.cover} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="px-4 pb-4 -mt-8">
        <div className="flex items-end justify-between">
          <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full border-4 border-ink-900 object-cover" />
          <span className="mb-1 text-[11px] font-semibold uppercase tracking-wide bg-brand-500/15 text-brand-300 border border-brand-500/30 rounded-full px-2.5 py-1">
            {creator.category}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <h3 className="font-bold text-white">{creator.name}</h3>
          {creator.verified && <BadgeCheck size={16} className="text-brand-400" />}
        </div>
        <p className="text-sm text-white/50">@{creator.handle}</p>
        <p className="text-sm text-white/60 mt-2 line-clamp-2">{creator.bio}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-white/50">
            <Users size={13} /> {formatCount(creator.subscribers)} followers
          </span>
          <span className="text-sm font-bold text-brand-400">${creator.price}/mo</span>
        </div>
      </div>
    </Link>
  )
}

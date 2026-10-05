import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { postsApi, creatorsApi } from '../lib/api'
import { normalizeFeedPost, normalizeCreator } from '../lib/normalize'
import PostCard from '../components/PostCard'

export default function Home() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [feed, setFeed] = useState([])
  const [suggested, setSuggested] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    Promise.all([postsApi.list(), creatorsApi.list()])
      .then(([posts, creators]) => {
        if (cancelled) return
        setFeed(posts.map(normalizeFeedPost))
        setSuggested(creators.map(normalizeCreator).filter((c) => !user.subscriptions.includes(c.id)).slice(0, 3))
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [user.subscriptions])

  const feedPosts = filter === 'subscribed'
    ? feed.filter(({ post }) => user.subscriptions.includes(post.creatorId))
    : feed

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[1fr_320px] gap-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-white">Your feed</h1>
          <div className="flex gap-2 bg-ink-900 rounded-full border border-white/10 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`text-sm font-medium px-4 py-1.5 rounded-full ${filter === 'all' ? 'bg-ink-950 text-white' : 'text-white/60'}`}
            >
              For you
            </button>
            <button
              onClick={() => setFilter('subscribed')}
              className={`text-sm font-medium px-4 py-1.5 rounded-full ${filter === 'subscribed' ? 'bg-ink-950 text-white' : 'text-white/60'}`}
            >
              Subscribed
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">{error}</div>
        )}

        {loading ? (
          <p className="text-sm text-white/50">Loading feed…</p>
        ) : feedPosts.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="font-semibold text-white">No posts yet</p>
            <p className="text-sm text-white/50 mt-1">
              Posts only show up here once they clear moderation review — see the backend README for why.
            </p>
            <Link to="/explore" className="btn-primary mt-4 inline-flex">Explore creators</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {feedPosts.map(({ post, creator }) => {
              const unlocked = user.subscriptions.includes(post.creatorId)
              return <PostCard key={post.id} post={post} creator={creator} unlocked={unlocked} />
            })}
          </div>
        )}
      </div>

      <aside className="space-y-6">
        <div className="card p-5">
          <h3 className="font-bold text-white mb-1">Welcome back, {user.name.split(' ')[0]}</h3>
          <p className="text-sm text-white/50">You're subscribed to {user.subscriptions.length} creator{user.subscriptions.length === 1 ? '' : 's'}.</p>
          <Link to="/subscriptions" className="text-sm font-semibold text-brand-600 hover:underline mt-2 inline-block">
            Manage subscriptions →
          </Link>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-white mb-3">Suggested for you</h3>
          <div className="space-y-4">
            {suggested.length === 0 && <p className="text-xs text-white/40">No other creators to suggest yet.</p>}
            {suggested.map((c) => (
              <Link key={c.id} to={`/creator/${c.id}`} className="flex items-center gap-3 group">
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate group-hover:underline">{c.name}</p>
                  <p className="text-xs text-white/50 truncate">{c.category}</p>
                </div>
                <span className="text-xs font-bold text-brand-600 shrink-0">${c.price}/mo</span>
              </Link>
            ))}
          </div>
          <Link to="/explore" className="text-sm font-semibold text-brand-600 hover:underline mt-4 inline-block">
            See more →
          </Link>
        </div>
      </aside>
    </div>
  )
}

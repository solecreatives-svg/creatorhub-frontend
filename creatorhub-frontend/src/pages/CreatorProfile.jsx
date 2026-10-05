import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, MessageCircle, Lock, Check } from 'lucide-react'
import { creatorsApi, postsApi } from '../lib/api'
import { normalizeCreator, normalizeFeedPost } from '../lib/normalize'
import { useAuth } from '../context/AuthContext'
import PostCard from '../components/PostCard'
import NotFound from './NotFound'

export default function CreatorProfile() {
  const { id } = useParams()
  const { isAuthenticated, user, subscribeToCreator, unsubscribeFromCreator, startConversation } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('posts')
  const [creator, setCreator] = useState(null)
  const [creatorPosts, setCreatorPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [actionError, setActionError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    Promise.all([creatorsApi.get(id), postsApi.list(id)])
      .then(([c, posts]) => {
        if (cancelled) return
        setCreator(normalizeCreator(c))
        setCreatorPosts(posts.map(normalizeFeedPost))
      })
      .catch(() => !cancelled && setNotFound(true))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <div className="max-w-5xl mx-auto py-16 text-center text-sm text-white/50">Loading profile…</div>
  }
  if (notFound || !creator) return <NotFound />

  const isSubscribed = isAuthenticated && user.subscriptions.includes(creator.id)

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setActionError('')
    setBusy(true)
    try {
      if (isSubscribed) await unsubscribeFromCreator(creator.id)
      else await subscribeToCreator(creator.id)
    } catch (err) {
      setActionError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleMessage = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setActionError('')
    try {
      const conversationId = await startConversation(creator.id)
      navigate('/messages', { state: { conversationId } })
    } catch (err) {
      setActionError(err.message)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-16">
      <div className="h-56 sm:h-72 w-full overflow-hidden bg-ink-800">
        <img src={creator.cover} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 sm:-mt-16">
          <img src={creator.avatar} alt={creator.name} className="w-28 h-28 rounded-full border-4 border-white object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{creator.name}</h1>
              {creator.verified && <BadgeCheck size={20} className="text-brand-600" />}
            </div>
            <p className="text-white/50">@{creator.handle} · {creator.category}</p>
          </div>
          <div className="flex gap-3 pb-1">
            <button onClick={handleMessage} className="btn-secondary">
              <MessageCircle size={16} /> Message
            </button>
            <button onClick={handleSubscribe} disabled={busy} className={isSubscribed ? 'btn-secondary' : 'btn-primary'}>
              {isSubscribed ? (<><Check size={16} /> Subscribed</>) : `Subscribe — $${creator.price}/mo`}
            </button>
          </div>
        </div>

        {actionError && (
          <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
            {actionError}
            {actionError.toLowerCase().includes('payment provider') && (
              <p className="mt-1 text-xs text-red-500">
                Expected — no real payment processor is wired up yet. See BACKEND-AND-DEPLOYMENT-GUIDE.md.
              </p>
            )}
          </div>
        )}

        <p className="mt-6 text-white/80 max-w-2xl">{creator.bio}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {creator.tags.map((t) => (
            <span key={t} className="text-xs font-medium bg-brand-500/15 text-brand-300 rounded-full px-3 py-1">#{t}</span>
          ))}
        </div>

        <div className="flex gap-8 mt-6 text-sm">
          <div><span className="font-bold text-white">{creator.subscribers.toLocaleString()}</span> <span className="text-white/50">subscribers</span></div>
          <div><span className="font-bold text-white">{creatorPosts.length}</span> <span className="text-white/50">posts</span></div>
        </div>

        <div className="flex gap-6 border-b border-white/10 mt-8 mb-6">
          {['posts', 'about'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm font-semibold capitalize border-b-2 -mb-px ${
                tab === t ? 'border-brand-600 text-white' : 'border-transparent text-white/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'posts' && (
          <div className="space-y-6 max-w-2xl">
            {!isSubscribed && (
              <div className="card p-5 flex items-center gap-4 bg-brand-500/15 border-brand-500/30">
                <Lock size={20} className="text-brand-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Subscribe to unlock all of {creator.name}'s posts</p>
                  <p className="text-xs text-white/50">Cancel anytime. Billed monthly.</p>
                </div>
                <button onClick={handleSubscribe} disabled={busy} className="btn-primary shrink-0">${creator.price}/mo</button>
              </div>
            )}
            {creatorPosts.length === 0 ? (
              <p className="text-sm text-white/50">
                No posts have cleared moderation review yet — new posts stay hidden until they do (see the backend README).
              </p>
            ) : (
              creatorPosts.map(({ post }) => (
                <PostCard key={post.id} post={post} creator={creator} unlocked={isSubscribed} />
              ))
            )}
          </div>
        )}

        {tab === 'about' && (
          <div className="card p-6 max-w-2xl">
            <h3 className="font-bold text-white mb-2">About {creator.name}</h3>
            <p className="text-sm text-white/80">{creator.bio}</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/50">Category</p>
                <p className="font-semibold text-white">{creator.category}</p>
              </div>
              <div>
                <p className="text-white/50">Subscription price</p>
                <p className="font-semibold text-white">${creator.price}/month</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

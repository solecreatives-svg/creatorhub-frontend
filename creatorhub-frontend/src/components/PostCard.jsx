import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageSquare, Lock, Share2 } from 'lucide-react'

export default function PostCard({ post, creator, unlocked }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const isLocked = post.locked && !unlocked

  const toggleLike = () => {
    if (isLocked) return
    setLiked((l) => !l)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 px-4 pt-4">
        <Link to={`/creator/${creator.id}`}>
          <img src={creator.avatar} alt={creator.name} className="w-10 h-10 rounded-full object-cover" />
        </Link>
        <div>
          <Link to={`/creator/${creator.id}`} className="font-semibold text-sm text-white hover:underline">
            {creator.name}
          </Link>
          <p className="text-xs text-white/50">{post.timestamp}</p>
        </div>
      </div>

      <div className="px-4 pt-3">
        <p className="text-sm text-white">{post.caption}</p>
      </div>

      {post.type === 'image' && (
        <div className="relative mt-3">
          <img
            src={post.image}
            alt=""
            className={`w-full max-h-[480px] object-cover ${isLocked ? 'blur-xl scale-105' : ''}`}
          />
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/30 text-white text-center px-4">
              <Lock size={28} />
              <p className="font-semibold">Subscribe to {creator.name} to unlock this post</p>
              <Link to={`/creator/${creator.id}`} className="btn-primary">
                Subscribe — ${creator.price}/mo
              </Link>
            </div>
          )}
        </div>
      )}

      {post.type === 'text' && isLocked && (
        <div className="mx-4 my-3 rounded-xl bg-ink-950/95 text-white p-6 text-center flex flex-col items-center gap-3">
          <Lock size={24} />
          <p className="font-semibold">Subscribe to {creator.name} to read this post</p>
          <Link to={`/creator/${creator.id}`} className="btn-primary">
            Subscribe — ${creator.price}/mo
          </Link>
        </div>
      )}

      <div className="flex items-center gap-6 px-4 py-3 text-white/60">
        <button
          onClick={toggleLike}
          disabled={isLocked}
          className={`flex items-center gap-1.5 text-sm ${liked ? 'text-brand-600' : ''} disabled:opacity-40`}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
          {likeCount.toLocaleString()}
        </button>
        <button disabled={isLocked} className="flex items-center gap-1.5 text-sm disabled:opacity-40">
          <MessageSquare size={18} />
          {post.comments}
        </button>
        <button disabled={isLocked} className="flex items-center gap-1.5 text-sm ml-auto disabled:opacity-40">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Lock, Unlock, Trash2, Plus, Heart, MessageSquare } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function CreatorPosts() {
  const { user, deletePost } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-white">My posts</h1>
        <Link to="/dashboard/upload" className="btn-primary"><Plus size={16} /> New post</Link>
      </div>

      {user.myPosts.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-semibold text-white">No posts yet</p>
          <p className="text-sm text-white/50 mt-1">Share your first post with your subscribers.</p>
          <Link to="/dashboard/upload" className="btn-primary mt-4 inline-flex">Create a post</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {user.myPosts.map((p) => (
            <div key={p.id} className="card overflow-hidden">
              {p.type === 'image' && <img src={p.image} alt="" className="w-full h-48 object-cover" />}
              <div className="p-4">
                <p className="text-sm text-white line-clamp-2">{p.caption}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-white/50">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Heart size={14} />{p.likes}</span>
                    <span className="flex items-center gap-1"><MessageSquare size={14} />{p.comments}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    {p.locked ? <Lock size={14} /> : <Unlock size={14} />}
                    {p.locked ? 'Subscribers only' : 'Public'}
                  </span>
                </div>
                {p.moderationStatus && p.moderationStatus !== 'APPROVED' && (
                  <p className="text-xs mt-2 font-medium text-amber-600">
                    {p.moderationStatus === 'PENDING' ? 'Awaiting moderation review' : 'Rejected by moderation'}
                  </p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-white/40">{p.timestamp}</span>
                  <button
                    onClick={() => deletePost(p.id).catch((err) => alert(err.message))}
                    className="text-red-500 hover:text-red-600 p-1.5"
                    aria-label="Delete post"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

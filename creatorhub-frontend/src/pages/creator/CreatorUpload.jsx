import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image as ImageIcon, Type, Lock, Unlock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function CreatorUpload() {
  const { addPost } = useAuth()
  const navigate = useNavigate()
  const [type, setType] = useState('image')
  const [caption, setCaption] = useState('')
  const [image, setImage] = useState(`https://picsum.photos/seed/newpost${Date.now()}/900/700`)
  const [locked, setLocked] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!caption.trim()) return
    setSubmitting(true)
    try {
      await addPost({ type, caption: caption.trim(), mediaUrl: type === 'image' ? image : undefined, locked })
      navigate('/dashboard/posts')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-white mb-6">Create a post</h1>

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
          {error.includes('verification') && (
            <p className="mt-1 text-xs text-red-500">
              Expected in this scaffold — no identity verification vendor is wired up yet. For local testing, set
              <code> ageVerified = true</code> and <code>idVerificationStatus = 'VERIFIED'</code> on your user via
              Prisma Studio (<code>npx prisma studio</code>).
            </p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">Post type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('image')}
              className={`rounded-xl border p-4 text-left flex items-center gap-2 ${
                type === 'image' ? 'border-brand-600 bg-brand-500/15' : 'border-white/10'
              }`}
            >
              <ImageIcon size={18} className={type === 'image' ? 'text-brand-600' : 'text-white/50'} />
              <span className="text-sm font-medium">Photo</span>
            </button>
            <button
              type="button"
              onClick={() => setType('text')}
              className={`rounded-xl border p-4 text-left flex items-center gap-2 ${
                type === 'text' ? 'border-brand-600 bg-brand-500/15' : 'border-white/10'
              }`}
            >
              <Type size={18} className={type === 'text' ? 'text-brand-600' : 'text-white/50'} />
              <span className="text-sm font-medium">Text</span>
            </button>
          </div>
        </div>

        {type === 'image' && (
          <div>
            <label className="label">Image preview</label>
            <img src={image} alt="preview" className="w-full h-56 object-cover rounded-xl mb-2" />
            <button
              type="button"
              onClick={() => setImage(`https://picsum.photos/seed/newpost${Date.now()}/900/700`)}
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              Shuffle placeholder image
            </button>
          </div>
        )}

        <div>
          <label className="label">Caption</label>
          <textarea
            className="input"
            rows={4}
            placeholder="Write something for your subscribers..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Visibility</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLocked(false)}
              className={`rounded-xl border p-4 text-left flex items-center gap-2 ${
                !locked ? 'border-brand-600 bg-brand-500/15' : 'border-white/10'
              }`}
            >
              <Unlock size={18} className={!locked ? 'text-brand-600' : 'text-white/50'} />
              <span className="text-sm font-medium">Public</span>
            </button>
            <button
              type="button"
              onClick={() => setLocked(true)}
              className={`rounded-xl border p-4 text-left flex items-center gap-2 ${
                locked ? 'border-brand-600 bg-brand-500/15' : 'border-white/10'
              }`}
            >
              <Lock size={18} className={locked ? 'text-brand-600' : 'text-white/50'} />
              <span className="text-sm font-medium">Subscribers only</span>
            </button>
          </div>
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full py-3">
          {submitting ? 'Publishing…' : 'Publish post'}
        </button>
      </form>
    </div>
  )
}

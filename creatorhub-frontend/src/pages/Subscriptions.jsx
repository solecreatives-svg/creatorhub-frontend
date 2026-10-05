import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Subscriptions() {
  const { user, unsubscribeFromCreator } = useAuth()
  const subs = user.subscriptionDetails
  const totalMonthly = subs.reduce((sum, c) => sum + c.price, 0)
  const [error, setError] = useState('')
  const [cancelingId, setCancelingId] = useState(null)

  const handleCancel = async (creatorId) => {
    setError('')
    setCancelingId(creatorId)
    try {
      await unsubscribeFromCreator(creatorId)
    } catch (err) {
      setError(err.message)
    } finally {
      setCancelingId(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-1">Subscriptions</h1>
      <p className="text-white/50 mb-6">You're spending <span className="font-semibold text-white">${totalMonthly}/month</span> across {subs.length} creator{subs.length === 1 ? '' : 's'}.</p>

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      {subs.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="font-semibold text-white">No active subscriptions</p>
          <p className="text-sm text-white/50 mt-1">Subscribe to creators to see them here.</p>
          <Link to="/explore" className="btn-primary mt-4 inline-flex">Explore creators</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {subs.map((c) => (
            <div key={c.creatorId} className="card p-4 flex items-center gap-4">
              <Link to={`/creator/${c.creatorId}`}>
                <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/creator/${c.creatorId}`} className="font-semibold text-white hover:underline">{c.name}</Link>
                <p className="text-sm text-white/50">@{c.handle} · Renews monthly</p>
              </div>
              <span className="text-sm font-bold text-white">${c.price}/mo</span>
              <button
                onClick={() => handleCancel(c.creatorId)}
                disabled={cancelingId === c.creatorId}
                className="btn-secondary"
              >
                {cancelingId === c.creatorId ? 'Canceling…' : 'Cancel'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

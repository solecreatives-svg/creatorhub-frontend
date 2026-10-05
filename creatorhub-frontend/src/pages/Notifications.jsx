import React, { useEffect } from 'react'
import { Heart, MessageCircle, Bell, RefreshCcw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const icons = {
  new_post: Bell,
  message: MessageCircle,
  renewal: RefreshCcw,
  like: Heart,
}

export default function Notifications() {
  const { user, markNotificationsRead } = useAuth()

  useEffect(() => {
    markNotificationsRead().catch((err) => console.error('Failed to mark notifications read', err))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (user.notifications.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-extrabold text-white mb-6">Notifications</h1>
        <p className="text-sm text-white/50">You're all caught up — nothing here yet.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">Notifications</h1>
      <div className="card divide-y divide-white/10">
        {user.notifications.map((n) => {
          const Icon = icons[n.type] || Bell
          return (
            <div key={n.id} className={`flex items-start gap-4 p-4 ${!n.read ? 'bg-brand-500/150/15' : ''}`}>
              <div className="w-9 h-9 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center shrink-0">
                <Icon size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{n.text}</p>
                <p className="text-xs text-white/50 mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-brand-600 mt-2 shrink-0" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

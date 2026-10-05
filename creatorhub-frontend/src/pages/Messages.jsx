import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Messages() {
  const { user, sendMessage } = useAuth()
  const location = useLocation()
  const [activeId, setActiveId] = useState(location.state?.conversationId || user.conversations[0]?.id)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')

  // If we arrived here from a creator profile's "Message" button, the
  // conversation was just created and its id is passed via router state.
  useEffect(() => {
    if (location.state?.conversationId) setActiveId(location.state.conversationId)
  }, [location.state])

  const active = user.conversations.find((c) => c.id === activeId) || user.conversations[0]

  const handleSend = async (e) => {
    e.preventDefault()
    setError('')
    if (!draft.trim() || !active) return
    const text = draft.trim()
    setDraft('')
    try {
      await sendMessage(active.id, text)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] lg:h-screen flex">
      {/* Conversation list */}
      <div className="w-full sm:w-80 shrink-0 border-r border-white/10 bg-ink-900 overflow-y-auto">
        <div className="px-5 py-5 border-b border-white/10">
          <h1 className="text-xl font-extrabold text-white">Messages</h1>
        </div>
        {user.conversations.length === 0 && (
          <p className="px-5 py-6 text-sm text-white/50">
            No conversations yet — message a creator from their profile to start one.
          </p>
        )}
        {user.conversations.map((c) => {
          const last = c.messages[c.messages.length - 1]
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left border-b border-white/10 hover:bg-white/5 ${
                activeId === c.id ? 'bg-brand-500/15' : ''
              }`}
            >
              <img src={c.creator.avatar} alt={c.creator.name} className="w-11 h-11 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white truncate">{c.creator.name}</p>
                  {c.unread > 0 && <span className="text-[10px] bg-brand-600 text-white rounded-full px-1.5 py-0.5">{c.unread}</span>}
                </div>
                <p className="text-xs text-white/50 truncate">{last?.text || 'No messages yet'}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active thread */}
      <div className="hidden sm:flex flex-col flex-1 bg-[#faf9fb]">
        {active ? (
          <>
            <div className="px-6 py-4 border-b border-white/10 bg-ink-900 flex items-center gap-3">
              <img src={active.creator.avatar} alt={active.creator.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-white">{active.creator.name}</p>
                <p className="text-xs text-white/50">@{active.creator.handle}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {active.messages.length === 0 && (
                <p className="text-sm text-white/40 text-center mt-8">Say hello 👋</p>
              )}
              {active.messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-sm rounded-2xl px-4 py-2.5 text-sm ${
                      m.from === 'me' ? 'bg-brand-600 text-white rounded-br-sm' : 'bg-ink-900 border border-white/10 text-white rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                    <p className={`text-[10px] mt-1 ${m.from === 'me' ? 'text-brand-100' : 'text-white/40'}`}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {error && <p className="px-6 pb-2 text-xs text-red-600">{error}</p>}

            <form onSubmit={handleSend} className="px-6 py-4 border-t border-white/10 bg-ink-900 flex gap-3">
              <input
                className="input flex-1"
                placeholder={`Message ${active.creator.name}...`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="btn-primary px-4"><Send size={16} /></button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/50 text-sm">Select a conversation</div>
        )}
      </div>
    </div>
  )
}

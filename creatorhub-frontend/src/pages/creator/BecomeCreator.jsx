import React from 'react'
import { Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function BecomeCreator() {
  const { toggleCreatorMode } = useAuth()

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-brand-500/20 text-brand-600 flex items-center justify-center mx-auto mb-5">
        <Sparkles size={26} />
      </div>
      <h1 className="text-2xl font-extrabold text-white">Turn on creator mode</h1>
      <p className="text-white/60 mt-2">
        You need to enable creator mode to access the dashboard. You can switch back to fan mode any time from the sidebar.
      </p>
      <button onClick={toggleCreatorMode} className="btn-primary mt-6 px-6 py-3">Enable creator mode</button>
    </div>
  )
}

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Trash2, Star, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const brandFromNumber = (num) => (num.startsWith('4') ? 'Visa' : num.startsWith('5') ? 'Mastercard' : 'Card')

export default function PaymentMethods() {
  const { user, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [number, setNumber] = useState('')
  const [exp, setExp] = useState('')
  const [name, setName] = useState(user.name)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    const digits = number.replace(/\D/g, '')
    if (digits.length < 4) return
    setSaving(true)
    try {
      await addPaymentMethod({ brand: brandFromNumber(digits), last4: digits.slice(-4), exp: exp || '01/30', name })
      setNumber('')
      setExp('')
      setShowForm(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = (id) => removePaymentMethod(id).catch((err) => setError(err.message))
  const handleSetDefault = (id) => setDefaultPaymentMethod(id).catch((err) => setError(err.message))

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/wallet" className="inline-flex items-center gap-1 text-sm font-medium text-white/50 hover:text-white mb-4">
        <ArrowLeft size={16} /> Back to wallet
      </Link>
      <h1 className="text-2xl font-extrabold text-white mb-6">Payment methods</h1>

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        {user.wallet.paymentMethods.length === 0 && (
          <div className="card p-6 text-center text-sm text-white/50">No payment methods added yet.</div>
        )}
        {user.wallet.paymentMethods.map((m) => (
          <div key={m.id} className="card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-brand-500/15 text-brand-600 flex items-center justify-center shrink-0">
              <CreditCard size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">{m.brand} •••• {m.last4}</p>
              <p className="text-xs text-white/50">Expires {m.exp} · {m.name}</p>
            </div>
            {m.isDefault ? (
              <span className="text-xs font-semibold text-brand-300 bg-brand-500/15 rounded-full px-3 py-1 flex items-center gap-1 shrink-0">
                <Star size={12} fill="currentColor" /> Default
              </span>
            ) : (
              <button
                onClick={() => handleSetDefault(m.id)}
                className="text-xs font-semibold text-white/50 hover:text-brand-600 shrink-0"
              >
                Make default
              </button>
            )}
            <button
              onClick={() => handleRemove(m.id)}
              className="text-red-500 hover:text-red-600 p-1.5 shrink-0"
              aria-label="Remove card"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleAdd} className="card p-6 space-y-4">
          <h3 className="font-bold text-white">Add a card</h3>
          <div>
            <label className="label">Cardholder name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label">Card number</label>
            <input
              className="input"
              placeholder="4242 4242 4242 4242"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Expiry (MM/YY)</label>
              <input className="input" placeholder="08/28" value={exp} onChange={(e) => setExp(e.target.value)} />
            </div>
            <div>
              <label className="label">CVC</label>
              <input className="input" placeholder="123" maxLength={3} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Save card'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
          <p className="text-xs text-white/40">
            This will fail until a real payment processor is configured on the backend (see BACKEND-AND-DEPLOYMENT-GUIDE.md) — that's intentional, not a bug.
          </p>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)} className="btn-secondary">
          <Plus size={16} /> Add payment method
        </button>
      )}
    </div>
  )
}

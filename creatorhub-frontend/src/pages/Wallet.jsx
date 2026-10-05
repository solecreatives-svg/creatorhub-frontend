import React from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Wallet() {
  const { user } = useAuth()
  const { wallet } = user
  const spent = wallet.transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  const defaultCard = wallet.paymentMethods.find((m) => m.isDefault) || wallet.paymentMethods[0]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-white mb-6">Wallet</h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-sm text-white/50">Total spent (last 30 days)</p>
          <p className="text-3xl font-extrabold text-white mt-1">${spent.toFixed(2)}</p>
        </div>
        <Link to="/wallet/payment-methods" className="card p-6 hover:shadow-lg transition-shadow">
          <p className="text-sm text-white/50 mb-2">Default payment method</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-white/60" />
              <span className="text-sm font-medium text-white">
                {defaultCard ? `${defaultCard.brand} •••• ${defaultCard.last4}` : 'No card added'}
              </span>
            </div>
            <ChevronRight size={18} className="text-white/40" />
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-white">Transaction history</h2>
        <Link to="/wallet/payment-methods" className="text-sm font-semibold text-brand-600 hover:underline">
          Manage payment methods →
        </Link>
      </div>

      <div className="card divide-y divide-white/10">
        {wallet.transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-white">{t.label}</p>
              <p className="text-xs text-white/50">{t.date}</p>
            </div>
            <span className="text-sm font-semibold text-white">
              {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

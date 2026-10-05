import React, { useState } from 'react'
import { Landmark, ArrowDownToLine, Pencil } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function CreatorPayouts() {
  const { user, linkBankAccount, withdrawFunds } = useAuth()
  const { creatorWallet } = user
  const [showBankForm, setShowBankForm] = useState(!creatorWallet.bankAccount)
  const [showWithdrawForm, setShowWithdrawForm] = useState(false)
  const [bankName, setBankName] = useState(creatorWallet.bankAccount?.bankName || '')
  const [accountHolder, setAccountHolder] = useState(creatorWallet.bankAccount?.accountHolder || user.name)
  const [accountNumber, setAccountNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canWithdraw = creatorWallet.availableBalance >= creatorWallet.minimumPayout && !!creatorWallet.bankAccount

  const handleSaveBank = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const digits = accountNumber.replace(/\D/g, '')
    try {
      await linkBankAccount({ bankName: bankName || 'My Bank', accountHolder, last4: digits.slice(-4) || '0000' })
      setShowBankForm(false)
      setAccountNumber('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    setError('')
    const amt = Number(amount)
    if (!amt || amt <= 0 || amt > creatorWallet.availableBalance) return
    setSubmitting(true)
    try {
      await withdrawFunds(amt)
      setConfirmation(amt)
      setAmount('')
      setShowWithdrawForm(false)
      setTimeout(() => setConfirmation(null), 4000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-extrabold text-white mb-6">Payouts</h1>

      {confirmation && (
        <div className="card p-4 mb-6 bg-green-500/10 border-green-500/30 text-sm text-green-400 font-medium">
          Withdrawal of ${confirmation.toFixed(2)} requested — funds typically arrive in 2-3 business days.
        </div>
      )}

      {error && (
        <div className="card p-4 mb-6 bg-red-500/10 border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-sm text-white/50">Available balance</p>
          <p className="text-3xl font-extrabold text-white mt-1">${creatorWallet.availableBalance.toFixed(2)}</p>
          <button
            onClick={() => setShowWithdrawForm((s) => !s)}
            disabled={!canWithdraw}
            className="btn-primary mt-4 w-full disabled:opacity-40"
          >
            <ArrowDownToLine size={16} /> Withdraw funds
          </button>
          {!creatorWallet.bankAccount && (
            <p className="text-xs text-white/40 mt-2">Link a bank account below before withdrawing.</p>
          )}
          {creatorWallet.bankAccount && creatorWallet.availableBalance < creatorWallet.minimumPayout && (
            <p className="text-xs text-white/40 mt-2">Minimum withdrawal is ${creatorWallet.minimumPayout}.</p>
          )}
        </div>
        <div className="card p-6">
          <p className="text-sm text-white/50">Pending balance</p>
          <p className="text-3xl font-extrabold text-white mt-1">${creatorWallet.pendingBalance.toFixed(2)}</p>
          <p className="text-xs text-white/40 mt-4">Clears once each subscriber's billing period completes.</p>
        </div>
      </div>

      {showWithdrawForm && (
        <form onSubmit={handleWithdraw} className="card p-6 space-y-4 mb-8">
          <h3 className="font-bold text-white">Withdraw to {creatorWallet.bankAccount?.bankName}</h3>
          <div>
            <label className="label">Amount (USD)</label>
            <input
              type="number"
              min={creatorWallet.minimumPayout}
              max={creatorWallet.availableBalance}
              className="input"
              placeholder={`Up to $${creatorWallet.availableBalance.toFixed(2)}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={submitting} className="btn-primary">
              {submitting ? 'Processing…' : 'Confirm withdrawal'}
            </button>
            <button type="button" onClick={() => setShowWithdrawForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      <div className="card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Payout method</h3>
          {creatorWallet.bankAccount && !showBankForm && (
            <button onClick={() => setShowBankForm(true)} className="text-sm font-semibold text-brand-600 hover:underline flex items-center gap-1">
              <Pencil size={14} /> Edit
            </button>
          )}
        </div>

        {creatorWallet.bankAccount && !showBankForm ? (
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-500/15 text-brand-600 flex items-center justify-center">
              <Landmark size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{creatorWallet.bankAccount.bankName} •••• {creatorWallet.bankAccount.last4}</p>
              <p className="text-xs text-white/50">{creatorWallet.bankAccount.accountHolder}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveBank} className="space-y-4">
            <div>
              <label className="label">Bank name</label>
              <input className="input" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Chase Bank" />
            </div>
            <div>
              <label className="label">Account holder name</label>
              <input className="input" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
            </div>
            <div>
              <label className="label">Account number</label>
              <input
                className="input"
                placeholder="000123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'Saving…' : 'Save bank account'}
              </button>
              {creatorWallet.bankAccount && (
                <button type="button" onClick={() => setShowBankForm(false)} className="btn-secondary">Cancel</button>
              )}
            </div>
            <p className="text-xs text-white/40">
              This will fail until a real payout processor is configured on the backend — that's intentional, not a bug.
            </p>
          </form>
        )}
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-white/10">
          <h3 className="font-bold text-white">Payout history</h3>
        </div>
        <div className="divide-y divide-white/10">
          {creatorWallet.payoutHistory.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-sm font-medium text-white">{p.method}</p>
                <p className="text-xs text-white/50">{p.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">${p.amount.toFixed(2)}</p>
                <p className={`text-xs ${p.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{p.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

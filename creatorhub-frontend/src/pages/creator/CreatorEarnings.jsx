import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownToLine } from 'lucide-react'
import { creatorStats } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import BarChart from '../../components/BarChart'

export default function CreatorEarnings() {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-white">Earnings</h1>
        <Link to="/dashboard/payouts" className="btn-primary">
          <ArrowDownToLine size={16} /> Withdraw funds
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="card p-5">
          <p className="text-sm text-white/50">Lifetime earnings</p>
          <p className="text-2xl font-extrabold text-white mt-1">${creatorStats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-white/50">Available to withdraw</p>
          <p className="text-2xl font-extrabold text-white mt-1">${user.creatorWallet.availableBalance.toFixed(2)}</p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-white/50">Platform fee</p>
          <p className="text-2xl font-extrabold text-white mt-1">15%</p>
        </div>
      </div>

      <div className="card p-6 mb-8">
        <h3 className="font-bold text-white mb-4">Revenue over time</h3>
        <BarChart data={creatorStats.monthlyRevenue} labels={creatorStats.monthLabels} prefix="$" height={200} />
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-white">Recent payouts</h3>
          <Link to="/dashboard/payouts" className="text-sm font-semibold text-brand-600 hover:underline">
            Manage payouts →
          </Link>
        </div>
        <div className="divide-y divide-white/10">
          {user.creatorWallet.payoutHistory.slice(0, 3).map((p) => (
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

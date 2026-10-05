import React from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Users, TrendingUp, Image as ImageIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { creatorStats } from '../../data/mockData'
import BarChart from '../../components/BarChart'

const stats = [
  { label: 'Total revenue', value: `$${creatorStats.totalRevenue.toLocaleString()}`, icon: DollarSign },
  { label: 'Active subscribers', value: creatorStats.activeSubscribers, icon: Users },
  { label: 'New this month', value: `+${creatorStats.newThisMonth}`, icon: TrendingUp },
  { label: 'Churn rate', value: `${creatorStats.churnRate}%`, icon: TrendingUp },
]

export default function CreatorDashboard() {
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Creator dashboard</h1>
          <p className="text-white/50">Welcome back, {user.name.split(' ')[0]}.</p>
        </div>
        <Link to="/dashboard/upload" className="btn-primary">
          <ImageIcon size={16} /> New post
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="w-9 h-9 rounded-lg bg-brand-500/15 text-brand-600 flex items-center justify-center mb-3">
              <Icon size={18} />
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
            <p className="text-xs text-white/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4">Monthly revenue</h3>
          <BarChart data={creatorStats.monthlyRevenue} labels={creatorStats.monthLabels} prefix="$" />
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-white mb-4">Subscriber growth</h3>
          <BarChart data={creatorStats.subscriberGrowth} labels={creatorStats.monthLabels} />
        </div>
      </div>

      <div className="card p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Recent subscribers</h3>
          <Link to="/dashboard/subscribers" className="text-sm font-semibold text-brand-600 hover:underline">View all →</Link>
        </div>
        <div className="divide-y divide-white/10">
          {creatorStats.recentSubscribers.map((s) => (
            <div key={s.id} className="flex items-center gap-3 py-3">
              <img src={s.avatar} alt={s.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{s.name}</p>
                <p className="text-xs text-white/50">{s.tier}</p>
              </div>
              <span className="text-xs text-white/50 shrink-0">{s.since}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

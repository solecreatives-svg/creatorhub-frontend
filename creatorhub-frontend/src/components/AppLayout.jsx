import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Home, Compass, MessageCircle, Bell, Wallet, Settings, Sparkles,
  LayoutDashboard, Image, Upload, Users, DollarSign, LogOut, Menu, X,
  ToggleLeft, ToggleRight, Landmark,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const fanLinks = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/subscriptions', label: 'Subscriptions', icon: Users },
  { to: '/wallet', label: 'Wallet', icon: Wallet },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const creatorLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/posts', label: 'My Posts', icon: Image },
  { to: '/dashboard/upload', label: 'Upload', icon: Upload },
  { to: '/dashboard/subscribers', label: 'Subscribers', icon: Users },
  { to: '/dashboard/earnings', label: 'Earnings', icon: DollarSign },
  { to: '/dashboard/payouts', label: 'Payouts', icon: Landmark },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/settings', label: 'Creator Settings', icon: Settings },
]

function SidebarContent({ onNavigate }) {
  const { user, logout, toggleCreatorMode } = useAuth()
  const links = user.isCreator ? creatorLinks : fanLinks
  const unread = user.notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 flex items-center gap-2 font-extrabold text-lg text-white">
        <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
          <Sparkles size={18} />
        </span>
        CreatorHub
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-500/15 text-brand-300' : 'text-white/60 hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
            {label === 'Notifications' && unread > 0 && (
              <span className="ml-auto text-[10px] bg-brand-600 text-white rounded-full px-1.5 py-0.5">{unread}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-3">
        <button
          onClick={() => toggleCreatorMode().catch((err) => alert(err.message))}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5"
        >
          {user.isCreator ? <ToggleRight size={18} className="text-brand-600" /> : <ToggleLeft size={18} />}
          {user.isCreator ? 'Creator mode: On' : 'Switch to creator mode'}
        </button>

        <div className="flex items-center gap-3 px-2">
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">@{user.handle}</p>
          </div>
          <button onClick={logout} className="ml-auto p-2 text-white/50 hover:text-red-600" aria-label="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink-950 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-white/10 bg-ink-900">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-ink-900 shadow-xl">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden sticky top-0 z-30 bg-ink-900 border-b border-white/10 h-14 flex items-center px-4">
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div className="ml-3 font-bold text-white">CreatorHub</div>
        </header>
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

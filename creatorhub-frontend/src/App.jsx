import React from 'react'
import { Routes, Route } from 'react-router-dom'

import PublicLayout from './components/PublicLayout'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Explore from './pages/Explore'
import CreatorProfile from './pages/CreatorProfile'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import About from './pages/About'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

// Fan (authenticated) pages
import Home from './pages/Home'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Subscriptions from './pages/Subscriptions'
import Wallet from './pages/Wallet'
import PaymentMethods from './pages/PaymentMethods'
import Settings from './pages/Settings'

// Creator dashboard pages
import CreatorDashboard from './pages/creator/CreatorDashboard'
import CreatorPosts from './pages/creator/CreatorPosts'
import CreatorUpload from './pages/creator/CreatorUpload'
import CreatorSubscribers from './pages/creator/CreatorSubscribers'
import CreatorEarnings from './pages/creator/CreatorEarnings'
import CreatorPayouts from './pages/creator/CreatorPayouts'
import CreatorSettings from './pages/creator/CreatorSettings'
import BecomeCreator from './pages/creator/BecomeCreator'

export default function App() {
  return (
    <Routes>
      {/* Public marketing site — also used for logged-in browsing of explore/creator pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/creator/:id" element={<CreatorProfile />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>

      {/* Standalone auth pages (no navbar/footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Authenticated app shell */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/payment-methods" element={<PaymentMethods />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/dashboard/become-creator" element={<BecomeCreator />} />

        <Route element={<ProtectedRoute requireCreator />}>
          <Route path="/dashboard" element={<CreatorDashboard />} />
          <Route path="/dashboard/posts" element={<CreatorPosts />} />
          <Route path="/dashboard/upload" element={<CreatorUpload />} />
          <Route path="/dashboard/subscribers" element={<CreatorSubscribers />} />
          <Route path="/dashboard/earnings" element={<CreatorEarnings />} />
          <Route path="/dashboard/payouts" element={<CreatorPayouts />} />
          <Route path="/dashboard/settings" element={<CreatorSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

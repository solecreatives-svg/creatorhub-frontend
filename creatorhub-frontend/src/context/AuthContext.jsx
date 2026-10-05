import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  authApi, usersApi, creatorsApi, postsApi, subscriptionsApi,
  messagesApi, notificationsApi, paymentMethodsApi, payoutsApi,
  getToken, setToken, clearToken,
} from '../lib/api'
import {
  formatDate, normalizeSubscription, normalizeConversation,
  normalizePaymentMethod, normalizeNotification, normalizeMyPost, normalizePayout,
} from '../lib/normalize'

const AuthContext = createContext(null)

// Fetches everything needed to build the `user` object the rest of the app
// reads from, given the base user record returned by /users/me (or from
// login/register). This is what makes the real backend look, to every page
// component, like the same `user` shape the old localStorage mock used.
async function hydrateUser(base) {
  const [subs, conversations, notifications, paymentMethods] = await Promise.all([
    subscriptionsApi.list(),
    messagesApi.listConversations(),
    notificationsApi.list(),
    paymentMethodsApi.list(),
  ])

  const normalizedSubs = subs.map(normalizeSubscription)

  const wallet = {
    paymentMethods: paymentMethods.map(normalizePaymentMethod),
    transactions: normalizedSubs.flatMap((s) => s.transactions),
  }

  let creatorProfile = null
  let creatorWallet = null
  let myPosts = []

  if (base.role === 'CREATOR') {
    try {
      const [profile, mine, summary, payouts] = await Promise.all([
        creatorsApi.me(),
        postsApi.mine(),
        payoutsApi.summary(),
        payoutsApi.history(),
      ])
      creatorProfile = {
        price: (profile.monthlyPrice || 0) / 100,
        category: profile.category,
        cover: profile.coverUrl,
      }
      creatorWallet = {
        availableBalance: summary.availableCents / 100,
        pendingBalance: 0, // settlement delay isn't modeled in this scaffold
        minimumPayout: (summary.minimumPayoutCents || 2000) / 100,
        bankAccount: summary.bankAccount
          ? {
              bankName: summary.bankAccount.bankName,
              accountHolder: summary.bankAccount.accountHolder,
              last4: summary.bankAccount.last4,
            }
          : null,
        payoutHistory: payouts.map(normalizePayout),
      }
      myPosts = mine.map(normalizeMyPost)
    } catch (err) {
      // A CREATOR user with no profile yet (shouldn't normally happen —
      // /users/me/role creates one) falls back to empty creator data
      // instead of breaking the whole hydrate.
      console.error('Failed to load creator dashboard data', err)
    }
  }

  return {
    id: base.id,
    name: base.name,
    handle: base.handle,
    email: base.email,
    avatar: base.avatarUrl,
    bio: base.bio || '',
    isCreator: base.role === 'CREATOR',
    joined: formatDate(base.createdAt),
    subscriptions: normalizedSubs.map((s) => s.creatorId),
    subscriptionDetails: normalizedSubs,
    wallet,
    conversations: conversations.map((c) => normalizeConversation(c, base.id)),
    notifications: notifications.map(normalizeNotification),
    myPosts,
    creatorProfile,
    creatorWallet,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      const token = getToken()
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const base = await usersApi.me()
        const hydrated = await hydrateUser(base)
        setUser(hydrated)
      } catch (err) {
        // Token expired/invalid — drop it silently and fall back to logged out.
        clearToken()
      } finally {
        setLoading(false)
      }
    }
    bootstrap()
  }, [])

  const login = async ({ email, password }) => {
    const { token, user: base } = await authApi.login({ email, password })
    setToken(token)
    const full = await usersApi.me() // re-fetch to get every field (login response is trimmed)
    const hydrated = await hydrateUser(full)
    setUser(hydrated)
    return hydrated
  }

  const signup = async ({ name, email, password, isCreator }) => {
    const { token } = await authApi.register({
      name, email, password, role: isCreator ? 'CREATOR' : 'FAN',
    })
    setToken(token)
    const full = await usersApi.me()
    const hydrated = await hydrateUser(full)
    setUser(hydrated)
    return hydrated
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  const refreshUser = useCallback(async () => {
    if (!getToken()) return
    const base = await usersApi.me()
    const hydrated = await hydrateUser(base)
    setUser(hydrated)
  }, [])

  const toggleCreatorMode = async () => {
    if (!user) return
    await usersApi.switchRole(user.isCreator ? 'FAN' : 'CREATOR')
    await refreshUser()
  }

  const updateUser = async (patch) => {
    await usersApi.update(patch)
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  const subscribeToCreator = async (creatorUserId) => {
    const defaultCard = user?.wallet.paymentMethods.find((m) => m.isDefault)
    await subscriptionsApi.create(creatorUserId, defaultCard?.id)
    await refreshUser()
  }

  const unsubscribeFromCreator = async (creatorUserId) => {
    await subscriptionsApi.cancel(creatorUserId)
    await refreshUser()
  }

  const markNotificationsRead = async () => {
    await notificationsApi.markAllRead()
    setUser((prev) => (prev ? { ...prev, notifications: prev.notifications.map((n) => ({ ...n, read: true })) } : prev))
  }

  const startConversation = async (creatorUserId) => {
    const conv = await messagesApi.startConversation(creatorUserId)
    await refreshUser()
    return conv.id
  }

  const sendMessage = async (conversationId, text) => {
    await messagesApi.sendMessage(conversationId, text)
    setUser((prev) => {
      if (!prev) return prev
      const conversations = prev.conversations.map((c) =>
        c.id === conversationId ? { ...c, messages: [...c.messages, { from: 'me', text, time: 'just now' }] } : c
      )
      return { ...prev, conversations }
    })
  }

  const addPost = async (post) => {
    await postsApi.create(post)
    await refreshUser()
  }

  const deletePost = async (postId) => {
    await postsApi.remove(postId)
    setUser((prev) => (prev ? { ...prev, myPosts: prev.myPosts.filter((p) => p.id !== postId) } : prev))
  }

  const updateCreatorProfile = async (patch) => {
    await creatorsApi.updateMyProfile({
      category: patch.category,
      monthlyPrice: patch.price != null ? Math.round(patch.price * 100) : undefined,
      coverUrl: patch.cover,
    })
    await refreshUser()
  }

  const addPaymentMethod = async (card) => {
    // card: { brand, last4, exp: "MM/YY", name }. Real card capture must go
    // through your payment processor's hosted fields — see
    // services/paymentProvider.ts on the backend. `providerToken` is a
    // placeholder here since there's no real processor wired yet.
    const [expMonth, expYearShort] = (card.exp || '01/30').split('/')
    await paymentMethodsApi.create({
      providerToken: 'demo-token',
      brand: card.brand,
      last4: card.last4,
      expMonth: Number(expMonth),
      expYear: 2000 + Number(expYearShort),
      name: card.name,
    })
    await refreshUser()
  }

  const removePaymentMethod = async (id) => {
    await paymentMethodsApi.remove(id)
    await refreshUser()
  }

  const setDefaultPaymentMethod = async (id) => {
    await paymentMethodsApi.setDefault(id)
    await refreshUser()
  }

  const linkBankAccount = async (bankAccount) => {
    await payoutsApi.linkBankAccount({
      providerToken: 'demo-token',
      bankName: bankAccount.bankName,
      accountHolder: bankAccount.accountHolder,
      last4: bankAccount.last4,
    })
    await refreshUser()
  }

  const withdrawFunds = async (amount) => {
    await payoutsApi.withdraw(Math.round(amount * 100))
    await refreshUser()
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    toggleCreatorMode,
    updateUser,
    subscribeToCreator,
    unsubscribeFromCreator,
    markNotificationsRead,
    startConversation,
    sendMessage,
    addPost,
    deletePost,
    updateCreatorProfile,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    linkBankAccount,
    withdrawFunds,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

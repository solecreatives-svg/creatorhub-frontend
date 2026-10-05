// Maps backend API response shapes onto the flat shapes the frontend
// components were originally built against (back when they read directly
// from src/data/mockData.js). Keeping this mapping in one place means the
// page components didn't need to be rewritten to talk to a real API.

const FALLBACK_AVATAR = 'https://i.pravatar.cc/150?img=1'
const FALLBACK_COVER = 'https://picsum.photos/seed/creatorhub/1200/400'

export function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

// Compact follower/subscriber counts, e.g. 8420 -> "8.4K", 1500000 -> "1.5M".
export function formatCount(n) {
  const num = Number(n) || 0
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `${num}`
}

export function formatRelative(iso) {
  if (!iso) return ''
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.round(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  return `${days}d ago`
}

// CreatorProfile (backend) -> flat creator (frontend). Note: `id` here is
// deliberately the creator's User.id, not the CreatorProfile row id — see
// the comment at the top of creators.routes.ts on the backend.
export function normalizeCreator(c) {
  return {
    id: c.user.id,
    name: c.user.name,
    handle: c.user.handle,
    avatar: c.user.avatarUrl || FALLBACK_AVATAR,
    cover: c.coverUrl || FALLBACK_COVER,
    category: c.category,
    verified: false, // not modeled on the backend yet
    price: (c.monthlyPrice || 0) / 100,
    bio: c.user.bio || '',
    subscribers: c._count?.subscribers ?? 0,
    posts: c._count?.posts ?? 0, // not tracked yet — see wiring notes
    tags: [], // not modeled on the backend yet
  }
}

// Feed post (GET /posts) -> flat post + its creator, for PostCard.
export function normalizeFeedPost(p) {
  return {
    post: {
      id: p.id,
      creatorId: p.creator.id,
      type: p.type,
      image: p.mediaUrl,
      caption: p.caption,
      likes: p.likeCount,
      comments: p.commentCount,
      locked: p.locked,
      timestamp: formatRelative(p.createdAt),
    },
    creator: {
      id: p.creator.id,
      name: p.creator.name,
      avatar: p.creator.avatarUrl || FALLBACK_AVATAR,
      price: (p.creator.creatorProfile?.monthlyPrice || 0) / 100,
    },
  }
}

// Own post (GET /posts/mine) -> flat post, for the creator dashboard.
export function normalizeMyPost(p) {
  return {
    id: p.id,
    type: p.type,
    image: p.mediaUrl,
    caption: p.caption,
    likes: p.likeCount,
    comments: p.commentCount,
    locked: p.locked,
    moderationStatus: p.moderationStatus,
    csamScanStatus: p.csamScanStatus,
    timestamp: formatRelative(p.createdAt),
  }
}

// Subscription (GET /subscriptions, includes creator + transactions) ->
// used to build user.subscriptions, user.subscriptionDetails, and
// user.wallet.transactions all at once.
export function normalizeSubscription(s) {
  return {
    creatorId: s.creator.user.id,
    name: s.creator.user.name,
    handle: s.creator.user.handle,
    avatar: s.creator.user.avatarUrl || FALLBACK_AVATAR,
    price: s.priceCents / 100,
    transactions: s.transactions.map((t) => ({
      id: t.id,
      label: `Subscription — ${s.creator.user.name}`,
      amount: -(t.amountCents / 100),
      date: formatDate(t.createdAt),
    })),
  }
}

// Conversation (GET /messages/conversations) -> the {id, creatorId, creator,
// unread, messages: [{from, text, time}]} shape Messages.jsx expects.
export function normalizeConversation(c, currentUserId) {
  return {
    id: c.id,
    creatorId: c.creatorId,
    creator: {
      id: c.creator.id,
      name: c.creator.name,
      handle: c.creator.handle,
      avatar: c.creator.avatarUrl || FALLBACK_AVATAR,
    },
    unread: 0, // read/unread isn't tracked on the backend yet — see wiring notes
    messages: c.messages.map((m) => ({
      from: m.senderId === currentUserId ? 'me' : 'creator',
      text: m.text,
      time: formatRelative(m.createdAt),
    })),
  }
}

export function normalizePaymentMethod(pm) {
  return {
    id: pm.id,
    brand: pm.brand,
    last4: pm.last4,
    exp: `${String(pm.expMonth).padStart(2, '0')}/${String(pm.expYear).slice(-2)}`,
    name: pm.name || '',
    isDefault: pm.isDefault,
  }
}

export function normalizeNotification(n) {
  return { id: n.id, type: n.type, text: n.text, time: formatRelative(n.createdAt), read: n.read }
}

export function normalizePayout(p) {
  return {
    id: p.id,
    amount: p.amountCents / 100,
    date: formatDate(p.paidAt || p.requestedAt),
    status: p.status === 'PAID' ? 'Paid' : p.status === 'FAILED' ? 'Failed' : 'Processing',
    method: 'Linked bank account',
  }
}

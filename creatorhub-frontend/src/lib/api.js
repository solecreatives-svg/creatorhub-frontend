// Thin fetch wrapper around the CreatorHub backend (creatorhub-backend/).
// Every call in this file talks to a real API — nothing here reads or
// writes localStorage directly except the auth token itself.

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const TOKEN_KEY = 'creatorhub_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }
  return data
}

// --- Auth ---
export const authApi = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload, auth: false }),
}

// --- Current user ---
export const usersApi = {
  me: () => request('/users/me'),
  update: (patch) => request('/users/me', { method: 'PATCH', body: patch }),
  switchRole: (role) => request('/users/me/role', { method: 'PATCH', body: { role } }),
}

// --- Creators / explore ---
export const creatorsApi = {
  list: (category) => request(`/creators${category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : ''}`, { auth: false }),
  get: (id) => request(`/creators/${id}`, { auth: false }),
  me: () => request('/creators/me'),
  updateMyProfile: (patch) => request('/creators/me', { method: 'PATCH', body: patch }),
}

// --- Posts ---
export const postsApi = {
  list: (creatorId) => request(`/posts${creatorId ? `?creatorId=${creatorId}` : ''}`, { auth: false }),
  mine: () => request('/posts/mine'),
  create: (payload) => request('/posts', { method: 'POST', body: payload }),
  remove: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
}

// --- Subscriptions ---
// Both take the creator's User.id (the same id used everywhere else for a
// creator on the frontend) — the backend resolves it to the right internal
// records.
export const subscriptionsApi = {
  list: () => request('/subscriptions'),
  create: (creatorUserId, paymentMethodId) =>
    request('/subscriptions', { method: 'POST', body: { creatorUserId, paymentMethodId } }),
  cancel: (creatorUserId) => request(`/subscriptions/${creatorUserId}`, { method: 'DELETE' }),
}

// --- Messages ---
export const messagesApi = {
  listConversations: () => request('/messages/conversations'),
  startConversation: (creatorId) => request('/messages/conversations', { method: 'POST', body: { creatorId } }),
  sendMessage: (conversationId, text) =>
    request(`/messages/conversations/${conversationId}/messages`, { method: 'POST', body: { text } }),
}

// --- Notifications ---
export const notificationsApi = {
  list: () => request('/notifications'),
  markAllRead: () => request('/notifications/read-all', { method: 'PATCH' }),
}

// --- Fan payment methods (wallet) ---
export const paymentMethodsApi = {
  list: () => request('/payment-methods'),
  create: (payload) => request('/payment-methods', { method: 'POST', body: payload }),
  setDefault: (id) => request(`/payment-methods/${id}/default`, { method: 'PATCH' }),
  remove: (id) => request(`/payment-methods/${id}`, { method: 'DELETE' }),
}

// --- Creator payouts ---
export const payoutsApi = {
  summary: () => request('/payouts/summary'),
  history: () => request('/payouts'),
  linkBankAccount: (payload) => request('/payouts/bank-account', { method: 'POST', body: payload }),
  withdraw: (amountCents) => request('/payouts', { method: 'POST', body: { amountCents } }),
}

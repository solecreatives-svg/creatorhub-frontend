// Mock data for CreatorHub demo. Everything here is fake/placeholder content
// used to simulate a live subscription platform without any real backend.

export const categories = [
  'Model',
  'Footballer',
  'Entrepreneur',
  'Fitness & Coaching',
  'Art & Illustration',
  'Music',
  'Cooking',
  'Photography',
  'Writing',
  'Gaming',
  'Wellness',
  'Fashion',
  'Comedy',
]

export const creators = [
  {
    id: 'c1',
    name: 'Maya Ortiz',
    handle: 'mayafit',
    avatar: 'https://i.pravatar.cc/150?img=47',
    cover: 'https://picsum.photos/seed/mayafit/1200/400',
    category: 'Fitness & Coaching',
    verified: true,
    price: 12,
    bio: 'Certified strength coach. Weekly programs, form checks, and live Q&As for people who want to actually enjoy training.',
    subscribers: 8420,
    posts: 214,
    tags: ['strength training', 'mobility', 'nutrition'],
  },
  {
    id: 'c2',
    name: 'Leo Nakamura',
    handle: 'leodraws',
    avatar: 'https://i.pravatar.cc/150?img=12',
    cover: 'https://picsum.photos/seed/leodraws/1200/400',
    category: 'Art & Illustration',
    verified: true,
    price: 8,
    bio: 'Digital illustrator sharing process videos, brush packs, and monthly character breakdowns.',
    subscribers: 15280,
    posts: 388,
    tags: ['illustration', 'procreate', 'character design'],
  },
  {
    id: 'c3',
    name: 'Sasha Volkov',
    handle: 'sashasounds',
    avatar: 'https://i.pravatar.cc/150?img=32',
    cover: 'https://picsum.photos/seed/sashasounds/1200/400',
    category: 'Music',
    verified: false,
    price: 6,
    bio: 'Producer posting unreleased tracks, stem breakdowns, and beat-making tutorials.',
    subscribers: 4310,
    posts: 96,
    tags: ['production', 'lo-fi', 'sample packs'],
  },
  {
    id: 'c4',
    name: 'Priya Chandran',
    handle: 'priyacooks',
    avatar: 'https://i.pravatar.cc/150?img=44',
    cover: 'https://picsum.photos/seed/priyacooks/1200/400',
    category: 'Cooking',
    verified: true,
    price: 10,
    bio: 'Home-cook turned recipe developer. New recipe every week plus a private cooking club chat.',
    subscribers: 22190,
    posts: 512,
    tags: ['recipes', 'meal prep', 'baking'],
  },
  {
    id: 'c5',
    name: 'Owen Baxter',
    handle: 'owenshoots',
    avatar: 'https://i.pravatar.cc/150?img=15',
    cover: 'https://picsum.photos/seed/owenshoots/1200/400',
    category: 'Photography',
    verified: false,
    price: 9,
    bio: 'Street and portrait photographer. Lightroom presets, gear breakdowns, and raw edit sessions.',
    subscribers: 6120,
    posts: 174,
    tags: ['street photography', 'presets', 'portraits'],
  },
  {
    id: 'c6',
    name: 'Nadia Farouk',
    handle: 'nadiawrites',
    avatar: 'https://i.pravatar.cc/150?img=25',
    cover: 'https://picsum.photos/seed/nadiawrites/1200/400',
    category: 'Writing',
    verified: true,
    price: 7,
    bio: 'Serialized fiction, first drafts, and behind-the-scenes notes on building a writing habit.',
    subscribers: 9870,
    posts: 260,
    tags: ['fiction', 'serials', 'writing craft'],
  },
]

export const posts = [
  {
    id: 'p1',
    creatorId: 'c1',
    type: 'image',
    image: 'https://picsum.photos/seed/post1/900/700',
    caption: 'New 4-week mobility program just went up for subscribers 💪 link in the pinned post.',
    likes: 482,
    comments: 36,
    locked: false,
    timestamp: '2h ago',
  },
  {
    id: 'p2',
    creatorId: 'c1',
    type: 'image',
    image: 'https://picsum.photos/seed/post2/900/700',
    caption: 'Full form breakdown on the trap bar deadlift, subscriber-only video inside.',
    likes: 301,
    comments: 22,
    locked: true,
    timestamp: '1d ago',
  },
  {
    id: 'p3',
    creatorId: 'c2',
    type: 'image',
    image: 'https://picsum.photos/seed/post3/900/700',
    caption: 'Process breakdown for this month’s character commission — layers and brush settings included.',
    likes: 1204,
    comments: 88,
    locked: true,
    timestamp: '5h ago',
  },
  {
    id: 'p4',
    creatorId: 'c2',
    type: 'image',
    image: 'https://picsum.photos/seed/post4/900/700',
    caption: 'Free sketch dump for everyone, enjoy!',
    likes: 940,
    comments: 51,
    locked: false,
    timestamp: '2d ago',
  },
  {
    id: 'p5',
    creatorId: 'c4',
    type: 'image',
    image: 'https://picsum.photos/seed/post5/900/700',
    caption: 'This week’s recipe: brown butter miso pasta. Full method in the subscriber post.',
    likes: 2210,
    comments: 143,
    locked: true,
    timestamp: '8h ago',
  },
  {
    id: 'p6',
    creatorId: 'c5',
    type: 'image',
    image: 'https://picsum.photos/seed/post6/900/700',
    caption: 'Shot on the way home tonight. Full edit + preset pack for subs.',
    likes: 388,
    comments: 19,
    locked: true,
    timestamp: '3h ago',
  },
  {
    id: 'p7',
    creatorId: 'c6',
    type: 'text',
    caption: 'Chapter 12 of "The Long Way Round" is up now for subscribers. Things get messy.',
    likes: 560,
    comments: 74,
    locked: true,
    timestamp: '12h ago',
  },
  {
    id: 'p8',
    creatorId: 'c3',
    type: 'image',
    image: 'https://picsum.photos/seed/post8/900/700',
    caption: 'New beat pack dropping this weekend for subscribers — sneak peek attached.',
    likes: 275,
    comments: 14,
    locked: true,
    timestamp: '1d ago',
  },
]

export const conversationsSeed = [
  {
    id: 'm1',
    creatorId: 'c1',
    unread: 2,
    messages: [
      { from: 'creator', text: 'Hey! Thanks for subscribing 🎉 let me know if you have any training questions.', time: '2d ago' },
      { from: 'me', text: 'Thank you! Starting the mobility program tomorrow.', time: '2d ago' },
      { from: 'creator', text: 'Love it. Send me a video of your hip flexor stretch when you get a chance, happy to check your form.', time: '1d ago' },
      { from: 'creator', text: 'No rush btw, whenever works for you.', time: '5h ago' },
    ],
  },
  {
    id: 'm2',
    creatorId: 'c4',
    unread: 0,
    messages: [
      { from: 'creator', text: 'Welcome to the cooking club! Weekly menu drops every Sunday.', time: '5d ago' },
      { from: 'me', text: 'Excited to try the miso pasta recipe!', time: '4d ago' },
      { from: 'creator', text: 'You are going to love it, let me know how it turns out 😊', time: '4d ago' },
    ],
  },
  {
    id: 'm3',
    creatorId: 'c2',
    unread: 1,
    messages: [
      { from: 'creator', text: 'Thanks for the sub! Feel free to send character ideas for the monthly poll.', time: '1w ago' },
      { from: 'creator', text: 'This month’s poll just went live, cast your vote!', time: '3h ago' },
    ],
  },
]

export const notificationsSeed = [
  { id: 'n1', type: 'new_post', text: 'Maya Ortiz posted a new subscriber-only video.', time: '2h ago', read: false },
  { id: 'n2', type: 'message', text: 'Leo Nakamura sent you a message.', time: '3h ago', read: false },
  { id: 'n3', type: 'renewal', text: 'Your subscription to Priya Chandran renews in 3 days.', time: '6h ago', read: true },
  { id: 'n4', type: 'like', text: 'Sasha Volkov liked your comment.', time: '1d ago', read: true },
  { id: 'n5', type: 'new_post', text: 'Nadia Farouk posted a new chapter.', time: '2d ago', read: true },
]

export const walletSeed = {
  balance: 0,
  paymentMethods: [
    { id: 'pm1', brand: 'Visa', last4: '4242', exp: '08/28', name: 'Alex Rivera', isDefault: true },
    { id: 'pm2', brand: 'Mastercard', last4: '8821', exp: '02/27', name: 'Alex Rivera', isDefault: false },
  ],
  transactions: [
    { id: 't1', label: 'Subscription — Maya Ortiz', amount: -12, date: 'Jul 24, 2026' },
    { id: 't2', label: 'Subscription — Priya Chandran', amount: -10, date: 'Jul 20, 2026' },
    { id: 't3', label: 'Tip — Leo Nakamura', amount: -5, date: 'Jul 18, 2026' },
    { id: 't4', label: 'Subscription — Leo Nakamura', amount: -8, date: 'Jul 12, 2026' },
    { id: 't5', label: 'Subscription — Sasha Volkov', amount: -6, date: 'Jul 3, 2026' },
  ],
}

// Creator payout / withdrawal data — separate from fan wallet above.
export const creatorWalletSeed = {
  availableBalance: 342.5,
  pendingBalance: 118,
  minimumPayout: 20,
  bankAccount: {
    bankName: 'Chase Bank',
    accountHolder: 'Alex Rivera',
    last4: '6690',
  },
  payoutHistory: [
    { id: 'po1', amount: 780, date: 'Jul 1, 2026', status: 'Paid', method: 'Chase Bank •••• 6690' },
    { id: 'po2', amount: 720, date: 'Jun 1, 2026', status: 'Paid', method: 'Chase Bank •••• 6690' },
    { id: 'po3', amount: 640, date: 'May 1, 2026', status: 'Paid', method: 'Chase Bank •••• 6690' },
  ],
}

// Creator-dashboard-only data (used when the current user is in "creator" mode)
export const creatorStats = {
  monthlyRevenue: [420, 480, 510, 560, 590, 640, 700, 690, 740, 810, 860, 920],
  monthLabels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  subscriberGrowth: [120, 140, 155, 170, 190, 205, 230, 250, 270, 300, 330, 360],
  totalRevenue: 8420,
  activeSubscribers: 360,
  newThisMonth: 42,
  churnRate: 3.2,
  recentSubscribers: [
    { id: 's1', name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/100?img=5', since: '2 days ago', tier: 'Monthly — $12' },
    { id: 's2', name: 'Amara Chen', avatar: 'https://i.pravatar.cc/100?img=9', since: '4 days ago', tier: 'Monthly — $12' },
    { id: 's3', name: 'Diego Ramirez', avatar: 'https://i.pravatar.cc/100?img=33', since: '1 week ago', tier: 'Annual — $120' },
    { id: 's4', name: 'Hana Kobayashi', avatar: 'https://i.pravatar.cc/100?img=41', since: '1 week ago', tier: 'Monthly — $12' },
    { id: 's5', name: 'Tom Richardson', avatar: 'https://i.pravatar.cc/100?img=52', since: '2 weeks ago', tier: 'Monthly — $12' },
  ],
  payouts: [
    { id: 'po1', amount: 780, date: 'Jul 1, 2026', status: 'Paid' },
    { id: 'po2', amount: 720, date: 'Jun 1, 2026', status: 'Paid' },
    { id: 'po3', amount: 640, date: 'May 1, 2026', status: 'Paid' },
  ],
}

export function findCreator(id) {
  return creators.find((c) => c.id === id)
}

export function postsByCreator(id) {
  return posts.filter((p) => p.creatorId === id)
}

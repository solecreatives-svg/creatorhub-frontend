# CreatorHub

A full-featured subscription-platform frontend (Fanvue-style UI/UX, general/SFW niche) built with React, React Router, and Tailwind CSS. This talks to a real backend — see `creatorhub-backend/` — for accounts, posts, subscriptions, messages, and payouts.

## Note on `node_modules`

If you see a partial `node_modules` folder in this project, delete it before installing — it's leftover from build verification and may be incomplete. Deleting it is safe; `npm install` will recreate it.

## Setup

**1. Start the backend first.** This app has nothing to talk to without it — follow `creatorhub-backend/README.md` (Steps 1–5) to get the API running at `http://localhost:4000`.

**2. Point this app at it:**
```bash
cp .env.example .env
```
The default in `.env.example` already matches the backend's default port, so you usually don't need to edit it.

**3. Install and run:**
```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Logging in

Signing up creates a real account in the backend's database (with a hashed password) — use any email/password combo you want on the Sign Up page. Signing up lets you choose to join as a **fan** or a **creator**. Fans can also switch into creator mode any time from the sidebar toggle.

Some actions will show an error by design until you configure a real vendor on the backend (payment processing, identity verification) — see `creatorhub-backend/README.md`, Step 7, for exactly which ones and why.

## Pages

**Public / marketing**
- `/` — Landing page
- `/explore` — Browse and filter creators
- `/creator/:id` — Public creator profile (locked posts until subscribed)
- `/pricing` — Pricing and FAQs
- `/about`, `/terms`, `/privacy`
- `/login`, `/signup`

**Fan (logged in)**
- `/home` — Personalized feed
- `/messages` — Direct messages with subscribed creators
- `/notifications`
- `/subscriptions` — Manage active subscriptions
- `/wallet` — Payment method + transaction history
- `/settings` — Profile, account, notification prefs, danger zone

**Creator dashboard (creator mode)**
- `/dashboard` — Revenue & subscriber overview with charts
- `/dashboard/posts` — Manage your posts
- `/dashboard/upload` — Create a new post
- `/dashboard/subscribers` — Subscriber list
- `/dashboard/earnings` — Revenue chart + payout history
- `/dashboard/settings` — Creator profile & pricing settings

Accounts, posts, subscriptions, messages, notifications, payment methods, and payouts all come from the real backend now. The category list (`categories`) and the creator dashboard's revenue/subscriber charts (`creatorStats`) still read from `src/data/mockData.js` — those haven't been wired to real data yet.

import React from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const fanFaqs = [
  { q: 'How much does it cost to join as a fan?', a: 'Creating a fan account is completely free. You only pay for the individual creator subscriptions you choose.' },
  { q: 'Can I cancel a subscription anytime?', a: 'Yes. Cancel from your Subscriptions page and you will keep access until the end of the current billing period.' },
  { q: 'Is my payment information secure?', a: 'This is a demo product, so no real payment information is ever collected or stored.' },
]

const creatorFaqs = [
  { q: 'What percentage does CreatorHub take?', a: 'Creators keep 85% of subscription revenue. CreatorHub takes a flat 15% platform fee, no hidden costs.' },
  { q: 'How often are payouts sent?', a: 'Payouts are issued monthly on the 1st, directly to your linked bank account.' },
  { q: 'Can I set my own subscription price?', a: 'Yes, you have full control over your monthly price, and can offer discounts for annual plans.' },
]

export default function Pricing() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="text-4xl font-extrabold text-white">Simple, transparent pricing</h1>
        <p className="mt-3 text-white/60">No monthly fees for creators or fans — we only make money when you do.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div className="card p-8">
          <h2 className="text-xl font-bold text-white">For fans</h2>
          <p className="text-4xl font-extrabold text-white mt-4">Free <span className="text-base font-medium text-white/50">to join</span></p>
          <p className="text-sm text-white/50 mt-1">Pay only for the creators you subscribe to, starting at $5/month.</p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {['Browse and discover creators', 'Direct messaging with creators you subscribe to', 'Cancel anytime, no contracts', 'One login for every creator you support'].map((f) => (
              <li key={f} className="flex items-start gap-2"><Check size={16} className="text-brand-600 mt-0.5 shrink-0" />{f}</li>
            ))}
          </ul>
          <Link to="/signup" className="btn-primary w-full mt-8">Create a free account</Link>
        </div>

        <div className="card p-8 border-2 border-brand-600">
          <h2 className="text-xl font-bold text-white">For creators</h2>
          <p className="text-4xl font-extrabold text-white mt-4">85% <span className="text-base font-medium text-white/50">revenue share</span></p>
          <p className="text-sm text-white/50 mt-1">Keep 85% of every subscription. We take a flat 15% platform fee.</p>
          <ul className="mt-6 space-y-3 text-sm text-white/80">
            {['Set your own subscription price', 'Unlimited photo, video, and text posts', 'Full analytics and earnings dashboard', 'Monthly payouts, no minimum threshold'].map((f) => (
              <li key={f} className="flex items-start gap-2"><Check size={16} className="text-brand-600 mt-0.5 shrink-0" />{f}</li>
            ))}
          </ul>
          <Link to="/signup" className="btn-dark w-full mt-8">Start creating</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-bold text-white mb-4">Fan questions</h3>
          <div className="space-y-4">
            {fanFaqs.map((f) => (
              <div key={f.q} className="card p-4">
                <p className="font-semibold text-sm text-white">{f.q}</p>
                <p className="text-sm text-white/60 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Creator questions</h3>
          <div className="space-y-4">
            {creatorFaqs.map((f) => (
              <div key={f.q} className="card p-4">
                <p className="font-semibold text-sm text-white">{f.q}</p>
                <p className="text-sm text-white/60 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

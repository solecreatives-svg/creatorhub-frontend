import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export const faqs = [
  {
    q: 'How much does it cost to sell subscriptions on CreatorHub?',
    a: "It's free to sign up as a fan or a creator. Creators keep 85% of their subscription revenue — there are no monthly fees, only a share of what you earn.",
  },
  {
    q: 'How do creator payouts work?',
    a: 'Fan subscriptions renew automatically every month. Your earnings build up in your creator wallet, and you can withdraw to your linked bank account once you pass the minimum payout threshold.',
  },
  {
    q: 'Can I switch between fan and creator mode?',
    a: 'Yes — every account can toggle creator mode on from the sidebar at any time. You can be a fan of other creators and run your own page simultaneously.',
  },
  {
    q: "What kind of creators is CreatorHub for?",
    a: 'Coaches, artists, musicians, models, footballers, entrepreneurs, streamers, chefs — anyone with an audience who wants to turn fans into predictable monthly income.',
  },
  {
    q: 'Can fans send direct messages to creators?',
    a: 'Yes, subscribers get direct messaging access to the creators they support, so you can build real relationships beyond just posts.',
  },
  {
    q: 'Is exclusive subscriber content protected?',
    a: 'Posts marked subscribers-only are blurred and locked for anyone who hasn’t subscribed, and every account goes through identity verification before it can publish.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-semibold text-white text-sm sm:text-base">{item.q}</span>
          <ChevronDown
            size={18}
            className={`shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-400' : ''}`}
          />
        </button>
      </h3>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-white/60 leading-relaxed pr-8">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">CreatorHub FAQ: fees, payouts, and getting started</h2>
        <p className="mt-3 text-white/60">Answers about subscription fees, creator payouts, fan messaging, and content protection.</p>
      </div>
      <div className="card px-4 sm:px-8">
        {faqs.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  )
}

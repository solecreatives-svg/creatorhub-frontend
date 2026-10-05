import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How much does it cost to join CreatorHub?',
    a: "It's free to sign up as a fan or a creator. Creators keep 85% of their subscription revenue — there are no monthly fees, only a share of what you earn.",
  },
  {
    q: 'How do payouts work?',
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
    q: 'Can fans message creators directly?',
    a: 'Yes, subscribers get direct messaging access to the creators they support, so you can build real relationships beyond just posts.',
  },
  {
    q: 'Is my content protected?',
    a: 'Posts marked subscribers-only are blurred and locked for anyone who hasn’t subscribed, and every account goes through identity verification before it can publish.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-white">{item.q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-400' : ''}`}
        />
      </button>
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
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl font-extrabold text-white">Frequently asked questions</h2>
        <p className="mt-3 text-white/60">Everything you need to know before you join CreatorHub.</p>
      </div>
      <div className="card px-6 sm:px-8">
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

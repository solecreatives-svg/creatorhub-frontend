import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Lock, MessageCircle, DollarSign, Image as ImageIcon, ShieldCheck, Star, Users } from 'lucide-react'
import { creatorsApi } from '../lib/api'
import { normalizeCreator, formatCount } from '../lib/normalize'
import ClientFeedback from '../components/ui/testimonial'
import { CreatorCarousel } from '../components/ui/creator-carousel'
import { FeaturesGrid } from '../components/ui/features-grid'
import { GlareFeatureGrid } from '../components/ui/glare-feature-grid'
import FAQ from '../components/ui/faq'
import { WordCycleHero } from '../components/ui/word-cycle-hero'
import GlyphPortal from '../components/ui/glyph-portal'

const steps = [
  {
    title: 'Create your profile',
    text: 'Set up your page in minutes — add a bio, cover photo, and pick your subscription price.',
    icon: Sparkles,
  },
  {
    title: 'Post exclusive content',
    text: 'Share photos, videos, and posts that only your subscribers can see.',
    icon: ImageIcon,
  },
  {
    title: 'Chat with your fans',
    text: 'Build real relationships with direct messages and personalized shoutouts.',
    icon: MessageCircle,
  },
  {
    title: 'Get paid monthly',
    text: 'Subscriptions renew automatically. Track earnings and payouts from your dashboard.',
    icon: DollarSign,
  },
]

export default function Landing() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    creatorsApi
      .list()
      .then((data) => setCreators(data.map(normalizeCreator)))
      .catch(() => setCreators([])) // public marketing page — fail quietly if the backend isn't up
  }, [])

  return (
    <div>
      {/* Hero */}
      <GlyphPortal
        word="CREATORHUB"
        scrollLength={2.2}
        enterLabel="Enter CreatorHub"
        style={{ '--gp-paper': '#000000', '--gp-ink': '#ffffff', '--gp-field': '#0a0f14', '--gp-foreground': '#ffffff' }}
        background={
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'scale(var(--gp-field-scale,1))',
              background:
                'radial-gradient(circle at 20% 15%, rgba(14,165,233,0.35), transparent 40%), radial-gradient(circle at 80% 75%, rgba(56,189,248,0.2), transparent 45%), linear-gradient(135deg,#000000 0%,#0a0f14 60%,#000000 100%)',
            }}
          />
        }
        front={
          <>
            <div className="absolute top-[6%] left-1/2 -translate-x-1/2 text-center px-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1.5 border border-brand-500/30">
                <Sparkles size={14} /> Now open to all creators
              </span>
            </div>
            <div
              className="absolute left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-xl"
              style={{ top: 'calc(var(--gp-word-bottom, 55%) + 24px)' }}
            >
              <p className="text-white/70 text-base sm:text-lg">
                Turn your biggest fans into your most reliable income — exclusive content, direct messaging, and
                predictable monthly revenue.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="btn-primary text-base px-6 py-3">
                  Start earning today
                </Link>
                <Link to="/explore" className="btn bg-white/10 text-white hover:bg-white/20 text-base px-6 py-3">
                  Explore creators
                </Link>
              </div>
            </div>
          </>
        }
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Every kind of creator. One home for all of them.
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            CreatorHub is a subscription platform for coaches, artists, musicians, models, and creators of every
            kind.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-1">
              <ShieldCheck size={16} className="text-brand-300" /> Secure payments
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-brand-300" /> 4.8/5 creator rating
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {creators.slice(0, 4).map((c) => (
              <div key={c.id} className="rounded-xl bg-white/10 border border-white/10 p-3">
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover mb-2" />
                <p className="text-sm font-semibold text-white">{c.name}</p>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wide bg-white/15 text-white/80 rounded-full px-2 py-0.5 mb-1.5 mt-0.5">
                  {c.category}
                </span>
                <p className="text-xs text-white/60 flex items-center gap-1 mb-2">
                  <Users size={11} /> {formatCount(c.subscribers)} followers
                </p>
                <p className="text-xs font-bold text-white">${c.price}/mo</p>
              </div>
            ))}
          </div>
        </div>
      </GlyphPortal>

      {/* Logos / stats */}
      <section className="border-y border-white/10 bg-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold text-white">18k+</p>
            <p className="text-sm text-white/50">Active creators</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">2.4M</p>
            <p className="text-sm text-white/50">Monthly fans</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">$41M</p>
            <p className="text-sm text-white/50">Paid to creators</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-white">85%</p>
            <p className="text-sm text-white/50">Avg. revenue share</p>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <FeaturesGrid />

      {/* Glare feature cards */}
      <GlareFeatureGrid />

      {/* Chosen by creators */}
      <section className="bg-ink-950 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
            Chosen by the creators redefining what's possible.
          </h2>
          <p className="mt-3 text-white/50">Drag the cards, or just watch them go.</p>
        </div>
        <CreatorCarousel />
      </section>

      {/* Niche spotlight */}
      <WordCycleHero
        label="Every niche has a home here."
        eyebrow={null}
        showCta={false}
        subtitle="Musicians, models, and artists already building their pages here."
      />

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-white">How CreatorHub works</h2>
          <p className="mt-3 text-white/60">Everything you need to run a subscription business, without the overhead.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ title, text, icon: Icon }, i) => (
            <div key={title} className="card p-6">
              <div className="w-11 h-11 rounded-xl bg-brand-500/15 text-brand-600 flex items-center justify-center mb-4">
                <Icon size={20} />
              </div>
              <p className="text-xs font-semibold text-brand-600 mb-1">STEP {i + 1}</p>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured creators */}
      <section className="bg-ink-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-extrabold">Discover creators</h2>
              <p className="mt-2 text-white/40">A taste of what's already live on CreatorHub.</p>
            </div>
            <Link to="/explore" className="hidden sm:inline text-sm font-semibold text-brand-400 hover:text-brand-300">
              View all →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.slice(0, 3).map((c) => (
              <div key={c.id} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <img src={c.cover} alt="" className="h-32 w-full object-cover" />
                <div className="p-5 -mt-8">
                  <div className="flex items-end justify-between">
                    <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full border-4 border-ink-950 object-cover" />
                    <span className="mb-1 text-[11px] font-semibold uppercase tracking-wide bg-brand-500/15 text-brand-300 border border-brand-500/30 rounded-full px-2.5 py-1">
                      {c.category}
                    </span>
                  </div>
                  <h3 className="font-bold mt-2">{c.name}</h3>
                  <p className="text-sm text-white/40">@{c.handle}</p>
                  <p className="text-sm text-white/30 mt-2 line-clamp-2">{c.bio}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-white/40">
                      <Users size={13} /> {formatCount(c.subscribers)} followers
                    </span>
                    <span className="text-sm font-bold text-brand-400">${c.price}/mo</span>
                  </div>
                  <Link to={`/creator/${c.id}`} className="mt-4 block text-center text-xs font-semibold bg-brand-600 text-white rounded-full px-3 py-2 hover:bg-brand-500 transition-colors">
                    View profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <ClientFeedback />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 text-white p-10 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to build your subscriber base?</h2>
          <p className="mt-4 text-brand-100 max-w-xl mx-auto">
            Join thousands of creators already earning predictable income on CreatorHub. Free to sign up, no monthly fees.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/signup" className="btn bg-ink-900 text-brand-300 hover:bg-brand-500/15 px-6 py-3">Create your page</Link>
            <Link to="/pricing" className="btn bg-white/10 text-white hover:bg-white/20 px-6 py-3">See pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

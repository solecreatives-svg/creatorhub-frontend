import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'How top creators price their subscriptions',
    excerpt: 'A look at how coaches, artists, and entrepreneurs on CreatorHub set a price fans are happy to pay every month.',
    tag: 'Creator tips',
    date: 'Sep 24, 2026',
    cover: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=600&fit=crop&q=80',
  },
  {
    title: 'From 0 to 10,000 followers: a creator playbook',
    excerpt: 'The exact posting cadence, messaging habits, and content mix that helped new creators find their first fans.',
    tag: 'Growth',
    date: 'Sep 12, 2026',
    cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&q=80',
  },
  {
    title: 'Inside CreatorHub payouts: how the money moves',
    excerpt: 'A plain-language walkthrough of subscriptions, platform fees, and how payouts land in a creator wallet.',
    tag: 'Platform',
    date: 'Aug 30, 2026',
    cover: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&h=600&fit=crop&q=80',
  },
  {
    title: 'Models, footballers, and entrepreneurs: who thrives here',
    excerpt: "CreatorHub isn't just for one niche — here's how creators across very different fields are building income.",
    tag: 'Community',
    date: 'Aug 18, 2026',
    cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&h=600&fit=crop&q=80',
  },
]

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold text-white">CreatorHub Blog</h1>
        <p className="mt-3 text-white/60">Notes on growing a creator business, product updates, and stories from the community.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.title} className="card overflow-hidden group cursor-pointer">
            <div className="h-48 w-full overflow-hidden">
              <img
                src={post.cover}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-white/40 mb-3">
                <span className="bg-brand-500/15 text-brand-300 font-semibold uppercase tracking-wide rounded-full px-2.5 py-1">
                  {post.tag}
                </span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-white/60 mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-400">
                Read more <ArrowRight size={14} />
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-white/50 mb-4">Want to be featured in a future post?</p>
        <Link to="/signup" className="btn-primary px-6 py-3">
          Join as a creator
        </Link>
      </div>
    </div>
  )
}

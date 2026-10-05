import React from 'react'
import { Link } from 'react-router-dom'
import { Users, Globe2, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-white">Built for creators, by creators</h1>
      <p className="mt-4 text-lg text-white/60">
        CreatorHub started with a simple idea: creators deserve a direct, sustainable relationship with the people who
        support their work — without ads, algorithms, or unpredictable payouts standing in the way.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mt-12">
        <div className="card p-6">
          <Users className="text-brand-600 mb-3" size={24} />
          <h3 className="font-bold text-white">Community first</h3>
          <p className="text-sm text-white/60 mt-2">Every feature we ship is shaped by feedback from the creators using the platform every day.</p>
        </div>
        <div className="card p-6">
          <Globe2 className="text-brand-600 mb-3" size={24} />
          <h3 className="font-bold text-white">Open to everyone</h3>
          <p className="text-sm text-white/60 mt-2">Fitness, art, music, cooking, writing — if you make things people love, there's a place for you here.</p>
        </div>
        <div className="card p-6">
          <Heart className="text-brand-600 mb-3" size={24} />
          <h3 className="font-bold text-white">Fair by design</h3>
          <p className="text-sm text-white/60 mt-2">Creators keep 85% of every subscription. No hidden fees, no surprise deductions.</p>
        </div>
      </div>

      <div className="mt-14 card p-8">
        <h2 className="text-xl font-bold text-white mb-2">Our story</h2>
        <p className="text-sm text-white/80 leading-relaxed">
          CreatorHub launched in 2024 with a handful of independent coaches and illustrators looking for an alternative
          to ad-supported platforms. Today, thousands of creators across fitness, art, music, cooking, and writing use
          CreatorHub to turn their most engaged fans into predictable monthly income. We're a small, remote-first team
          obsessed with building tools that respect both creators and the people who support them.
        </p>
      </div>

      <div className="text-center mt-14">
        <Link to="/signup" className="btn-primary text-base px-6 py-3">Join CreatorHub</Link>
      </div>
    </div>
  )
}

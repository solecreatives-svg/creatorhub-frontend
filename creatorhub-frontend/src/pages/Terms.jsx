import React from 'react'

const sections = [
  { h: '1. Acceptance of terms', p: 'By accessing or using CreatorHub, you agree to be bound by these Terms of Service. This is a demo product built for illustration purposes and does not process real payments or store real personal data.' },
  { h: '2. Accounts', p: 'You are responsible for maintaining the confidentiality of your account and for all activity that occurs under it. You must provide accurate information when creating an account.' },
  { h: '3. Creator content', p: 'Creators retain ownership of the content they publish. By posting content, creators grant fans a limited, non-transferable license to view that content for personal, non-commercial use.' },
  { h: '4. Subscriptions and billing', p: 'Subscriptions renew automatically each billing period until cancelled. Fans may cancel at any time and will retain access through the end of the current period.' },
  { h: '5. Prohibited conduct', p: 'Users may not upload unlawful content, infringe on intellectual property rights, harass other users, or attempt to circumvent platform payment systems.' },
  { h: '6. Termination', p: 'CreatorHub reserves the right to suspend or terminate accounts that violate these terms or applicable law.' },
  { h: '7. Disclaimers', p: 'CreatorHub is provided "as is" without warranties of any kind. This demo is for illustrative purposes only.' },
  { h: '8. Contact', p: 'Questions about these terms can be directed to our support team via the Help Center.' },
]

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-sm text-white/50 mt-2">Last updated: July 2026</p>

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-bold text-white mb-2">{s.h}</h2>
            <p className="text-sm text-white/60 leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

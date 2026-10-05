import React from 'react'

const sections = [
  { h: '1. Overview', p: 'This Privacy Policy describes how CreatorHub would handle information in a production environment. This is a demo build — no real data is collected, transmitted, or stored outside of your browser\'s local storage.' },
  { h: '2. Information we collect', p: 'In a live product, we would collect account information (name, email), content you upload, payment metadata, and usage analytics to operate and improve the platform.' },
  { h: '3. How we use information', p: 'Information would be used to provide the service, process subscriptions, personalize recommendations, and communicate important account updates.' },
  { h: '4. Sharing of information', p: 'We would not sell personal information. Limited data may be shared with payment processors and infrastructure providers strictly to operate the service.' },
  { h: '5. Data retention', p: 'Account data would be retained for as long as your account is active, and deleted within 30 days of account closure upon request.' },
  { h: '6. Your rights', p: 'Users would be able to access, correct, or delete their personal information at any time from account settings.' },
  { h: '7. Security', p: 'Reasonable technical and organizational measures would be used to protect user data against unauthorized access.' },
  { h: '8. Contact', p: 'Privacy questions can be directed to our support team via the Help Center.' },
]

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
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

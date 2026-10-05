import React from 'react'

// Lightweight dependency-free bar chart used across the creator dashboard.
export default function BarChart({ data, labels, prefix = '', height = 160 }) {
  const max = Math.max(...data, 1)

  return (
    <div>
      <div className="flex items-end gap-2" style={{ height }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
            <div
              className="w-full rounded-t-md bg-brand-500/150 group-hover:bg-brand-600 transition-colors relative"
              style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
              title={`${prefix}${v}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {labels.map((l) => (
          <div key={l} className="flex-1 text-center text-[10px] text-white/50">{l}</div>
        ))}
      </div>
    </div>
  )
}

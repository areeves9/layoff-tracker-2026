import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0]
    return (
      <div style={{
        background: '#1a1a1d',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '10px 14px',
        borderRadius: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
      }}>
        <p style={{ color: '#f0ede8', fontWeight: 700 }}>{d.payload.label}</p>
        <p style={{ color: d.fill, marginTop: '3px' }}>~{(d.value / 1000).toFixed(0)}k jobs cut</p>
      </div>
    )
  }
  return null
}

export default function SectorChart({ sectors }) {
  const sorted = [...sectors].sort((a, b) => b.estimated_jobs - a.estimated_jobs)

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
      >
        <XAxis
          type="number"
          tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fill: '#4a4845' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="label"
          width={175}
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fill: '#8a8784' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="estimated_jobs" radius={[0, 3, 3, 0]} barSize={18}>
          {sorted.map((entry, i) => (
            <Cell key={i} fill={entry.color} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

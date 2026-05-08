import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload
    return (
      <div style={{
        background: '#1a1a1d',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '10px 14px',
        borderRadius: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        maxWidth: '220px',
      }}>
        <p style={{ color: '#f0ede8', fontWeight: 700 }}>{d.company}</p>
        <p style={{ color: '#8a8784', marginTop: '2px' }}>{d.month} — {d.reason}</p>
        <p style={{ color: payload[0].fill, marginTop: '4px', fontWeight: 700 }}>
          {d.jobs.toLocaleString()} jobs cut
        </p>
      </div>
    )
  }
  return null
}

export default function CompanyChart({ layoffs, sectorColor, activeSector, onSelect }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const filtered = activeSector === 'all'
    ? layoffs
    : layoffs.filter(l => l.sector === activeSector)

  const sorted = [...filtered].sort((a, b) => b.jobs - a.jobs).slice(0, 30)
  const chartHeight = Math.max(300, sorted.length * 28 + 40)

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
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
          dataKey="company"
          width={isMobile ? 100 : 160}
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fill: '#8a8784' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="jobs" radius={[0, 3, 3, 0]} barSize={16} onClick={d => onSelect(d)} style={{ cursor: 'pointer' }}>
          {sorted.map((entry, i) => (
            <Cell
              key={i}
              fill={sectorColor[entry.sector] || '#4a4845'}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

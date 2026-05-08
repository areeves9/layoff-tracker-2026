import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const MONTH_ORDER = ['January', 'February', 'March', 'April', 'May', 'Ongoing']

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
      }}>
        <p style={{ color: '#f0ede8', fontWeight: 700 }}>{d.month}</p>
        <p style={{ color: '#e84040', marginTop: '3px' }}>{d.jobs.toLocaleString()} jobs cut</p>
        {d.month === 'Ongoing' && (
          <p style={{ color: '#4a4845', marginTop: '3px', fontSize: '0.68rem' }}>no confirmed end date</p>
        )}
      </div>
    )
  }
  return null
}

export default function MonthChart({ layoffs }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  const byMonth = {}
  layoffs.forEach(r => {
    byMonth[r.month] = (byMonth[r.month] || 0) + r.jobs
  })

  const data = MONTH_ORDER
    .filter(m => byMonth[m])
    .map(m => ({ month: m, jobs: byMonth[m] }))

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 20, left: 0, bottom: 0 }}>
        <XAxis
          dataKey="month"
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fill: '#8a8784' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={m => m === 'Ongoing' ? 'Ongoing' : m.slice(0, 3)}
        />
        <YAxis
          tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          tick={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fill: '#4a4845' }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="jobs" radius={[3, 3, 0, 0]} barSize={isMobile ? 20 : 32}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.month === 'Ongoing' ? '#4a4845' : '#e84040'}
              fillOpacity={entry.month === 'Ongoing' ? 0.6 : 0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

export default function CompanyDonut({ company, onClose, sectorColor }) {
  if (!company) return null

  const pct = ((company.jobs / company.workforce) * 100).toFixed(1)
  const remaining = company.workforce - company.jobs
  const color = sectorColor[company.sector] || '#e84040'

  const data = [
    { name: 'Cut', value: company.jobs },
    { name: 'Remaining', value: remaining },
  ]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-bright)',
          borderRadius: '6px',
          padding: '2rem',
          width: '100%',
          maxWidth: '380px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: '1rem', lineHeight: 1,
          }}
        >
          ✕
        </button>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
          {company.sector} · {company.month}
        </p>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          {company.company}
        </h2>

        <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx={100} cy={100}
              innerRadius={62} outerRadius={90}
              startAngle={90} endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} fillOpacity={0.9} />
              <Cell fill="#1e1e21" />
            </Pie>
          </PieChart>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 700, color, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {pct}%
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
              of workforce
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '1.5rem' }}>
          {[
            { label: 'Jobs cut', value: company.jobs.toLocaleString(), color },
            { label: 'Total workforce', value: company.workforce.toLocaleString(), color: 'var(--text-primary)' },
            { label: 'Remaining', value: remaining.toLocaleString(), color: 'var(--text-secondary)' },
            { label: 'Reason', value: company.reason, color: 'var(--text-muted)', small: true },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', padding: '0.9rem 1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: s.small ? '0.68rem' : '1rem', fontWeight: s.small ? 400 : 700, color: s.color, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'center' }}>
          Workforce figures are approximate pre-layoff headcounts
        </p>
      </div>
    </div>
  )
}

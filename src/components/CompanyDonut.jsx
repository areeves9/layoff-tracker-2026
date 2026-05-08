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
        background: 'rgba(0,0,0,0.75)',
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
          borderRadius: '8px',
          padding: 'clamp(1.25rem, 5vw, 2rem)',
          width: '100%',
          maxWidth: '380px',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Close button — 44px touch target */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer',
            fontSize: '1.1rem', borderRadius: '4px',
          }}
        >
          ✕
        </button>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
          {company.sector} · {company.month}
        </p>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.1rem, 4vw, 1.3rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '1.5rem', paddingRight: '2rem' }}>
          {company.company}
        </h2>

        <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
          <PieChart width={180} height={180}>
            <Pie
              data={data}
              cx={90} cy={90}
              innerRadius={55} outerRadius={82}
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {pct}%
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
              of workforce
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '1.25rem' }}>
          {[
            { label: 'Jobs cut', value: company.jobs.toLocaleString(), color },
            { label: 'Total workforce', value: company.workforce.toLocaleString(), color: 'var(--text-primary)' },
            { label: 'Remaining', value: remaining.toLocaleString(), color: 'var(--text-secondary)' },
            { label: 'Reason', value: company.reason, color: 'var(--text-muted)', small: true },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface)', padding: '0.85rem 0.9rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
                {s.label}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: s.small ? '0.75rem' : '1rem', fontWeight: s.small ? 400 : 700, color: s.color, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>
          Workforce figures are approximate pre-layoff headcounts
        </p>
      </div>
    </div>
  )
}

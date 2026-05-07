import React from 'react'

export default function SummaryStats({ summary }) {
  const stats = [
    { label: 'Total jobs tracked', value: summary.total_jobs_tracked.toLocaleString() + '+' },
    { label: 'Tech jobs cut', value: summary.tech_jobs_cut.toLocaleString() },
    { label: 'Daily pace', value: summary.daily_rate.toLocaleString() + '/day' },
    { label: 'Companies cutting', value: summary.companies_cutting.toLocaleString() + '+' },
    { label: 'Jan YoY increase', value: '+' + summary.jan_yoy_increase_pct + '%' },
    { label: 'Employers planning cuts', value: summary.employers_planning_cuts_pct + '%' },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1px',
      background: 'var(--border)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '2rem',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: 'var(--surface)',
          padding: '1.25rem 1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.4rem',
          }}>
            {s.label}
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
          }}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  )
}

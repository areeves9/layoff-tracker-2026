import React, { useState, useMemo } from 'react'
import data from './data/layoffs.json'
import CompanyChart from './components/CompanyChart.jsx'
import SectorChart from './components/SectorChart.jsx'
import MonthChart from './components/MonthChart.jsx'
import LayoffTable from './components/LayoffTable.jsx'
import SummaryStats from './components/SummaryStats.jsx'

const SECTOR_LABELS = Object.fromEntries(
  data.sectors.map(s => [s.sector, s.label])
)

export default function App() {
  const [activeSector, setActiveSector] = useState('all')
  const [sortBy, setSortBy] = useState('jobs')
  const [search, setSearch] = useState('')

  const sectors = ['all', ...data.sectors.map(s => s.sector)]

  const computed = useMemo(() => {
    const totalJobs = data.layoffs.reduce((s, r) => s + r.jobs, 0)
    const totalCompanies = data.layoffs.length
    const techJobs = data.layoffs.filter(r => r.sector === 'tech').reduce((s, r) => s + r.jobs, 0)
    const sectorTotals = {}
    data.layoffs.forEach(r => { sectorTotals[r.sector] = (sectorTotals[r.sector] || 0) + r.jobs })
    return { totalJobs, totalCompanies, techJobs, sectorTotals }
  }, [])

  const sectorsWithActual = data.sectors.map(s => ({ ...s, jobs: computed.sectorTotals[s.sector] || 0 }))

  const filtered = useMemo(() => {
    let rows = [...data.layoffs]
    if (activeSector !== 'all') {
      rows = rows.filter(r => r.sector === activeSector)
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      rows = rows.filter(r => r.company.toLowerCase().includes(q))
    }
    rows.sort((a, b) => sortBy === 'jobs' ? b.jobs - a.jobs : a.company.localeCompare(b.company))
    return rows
  }, [activeSector, sortBy, search])

  const sectorColor = Object.fromEntries(data.sectors.map(s => [s.sector, s.color]))

  return (
    <div>
      <header style={{ padding: '3rem 0 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
            LAYOFF TRACKER
          </h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            2026 — snapshot
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '560px' }}>
          A running tally of major workforce reductions across all industries in 2026.
          Data sourced from company announcements, SEC filings, and WARN Act notices.
        </p>
        <p style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Last updated: {data.meta.last_updated} — edit <code style={{ color: 'var(--text-secondary)' }}>src/data/layoffs.json</code> to update
        </p>
      </header>

      <SummaryStats summary={data.summary} computed={computed} />

      <section className="section" style={{ marginTop: '3rem' }}>
        <SectionLabel>Jobs cut by sector</SectionLabel>
        <SectorChart sectors={sectorsWithActual} />
      </section>

      <section className="section" style={{ marginTop: '3rem' }}>
        <SectionLabel>Jobs cut by month</SectionLabel>
        <MonthChart layoffs={data.layoffs} />
      </section>

      <section className="section" style={{ marginTop: '3rem' }}>
        <SectionLabel>Jobs cut by company</SectionLabel>
        <CompanyChart layoffs={data.layoffs} sectorColor={sectorColor} activeSector={activeSector} />
      </section>

      <section className="section" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <SectionLabel style={{ margin: 0 }}>All layoffs</SectionLabel>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                padding: '3px 10px',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                background: 'transparent',
                color: 'var(--text-primary)',
                outline: 'none',
                width: '160px',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--border-bright)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '4px' }}>FILTER:</span>
            {sectors.map(s => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  border: `1px solid ${activeSector === s ? 'var(--border-bright)' : 'var(--border)'}`,
                  borderRadius: '3px',
                  background: activeSector === s ? 'var(--surface-2)' : 'transparent',
                  color: activeSector === s ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.15s',
                }}
              >
                {s === 'all' ? 'All' : SECTOR_LABELS[s]?.split('/')[0].trim()}
              </button>
            ))}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginLeft: '8px' }}>SORT:</span>
            {['jobs', 'alpha'].map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  border: `1px solid ${sortBy === s ? 'var(--border-bright)' : 'var(--border)'}`,
                  borderRadius: '3px',
                  background: sortBy === s ? 'var(--surface-2)' : 'transparent',
                  color: sortBy === s ? 'var(--text-primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.15s',
                }}
              >
                {s === 'jobs' ? '# Jobs' : 'A→Z'}
              </button>
            ))}
          </div>
        </div>
        <LayoffTable layoffs={filtered} sectorColor={sectorColor} sectorLabels={SECTOR_LABELS} />
      </section>

      <footer style={{ marginTop: '4rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Sources: {data.meta.sources.map((s, i) => (
            <span key={i}><a href={s} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{new URL(s).hostname}</a>{i < data.meta.sources.length - 1 ? ' · ' : ''}</span>
          ))}
        </p>
      </footer>
    </div>
  )
}

function SectionLabel({ children, style = {} }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginBottom: '1rem',
      ...style
    }}>
      {children}
    </p>
  )
}

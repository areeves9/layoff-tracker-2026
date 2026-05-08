import React from 'react'

export default function LayoffTable({ layoffs, sectorColor, sectorLabels }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <div className="table-scroll">
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
      }}>
        <thead>
          <tr style={{ background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
            {[
              { label: 'Company' },
              { label: 'Jobs Cut' },
              { label: 'Sector' },
              { label: 'Month', className: 'col-month' },
              { label: 'Stated Reason', className: 'col-reason' },
            ].map(h => (
              <th key={h.label} className={h.className || ''} style={{
                padding: '10px 14px',
                textAlign: 'left',
                color: 'var(--text-muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontSize: '0.72rem',
                whiteSpace: 'nowrap',
              }}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {layoffs.map((row, i) => (
            <tr
              key={i}
              className="table-row"
              style={{
                background: i % 2 === 0 ? 'var(--surface)' : 'var(--bg)',
                borderBottom: '1px solid var(--border)',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--surface)' : 'var(--bg)'}
            >
              <td style={{ padding: '11px 14px', color: 'var(--text-primary)', fontWeight: 700 }}>
                {row.company}
              </td>
              <td style={{ padding: '11px 14px', color: '#e84040', fontWeight: 700 }}>
                {row.jobs.toLocaleString()}
              </td>
              <td style={{ padding: '11px 14px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  background: (sectorColor[row.sector] || '#686563') + '22',
                  color: sectorColor[row.sector] || '#686563',
                  border: `1px solid ${(sectorColor[row.sector] || '#686563')}44`,
                }}>
                  {sectorLabels[row.sector]?.split('/')[0].trim() || row.sector}
                </span>
              </td>
              <td className="col-month" style={{ padding: '11px 14px', color: 'var(--text-secondary)' }}>
                {row.month}
              </td>
              <td className="col-reason" style={{ padding: '11px 14px', color: 'var(--text-muted)', maxWidth: '280px' }}>
                {row.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

# 2026 Layoff Tracker

A living snapshot of major workforce reductions across all industries in 2026.

Built with React + Vite + Recharts. Data lives in a single JSON file — no database, no backend.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Updating the Data

All layoff data lives in `src/data/layoffs.json`. Edit it directly to add new layoffs.

### Adding a new layoff entry

Add an object to the `layoffs` array:

```json
{
  "company": "Acme Corp",
  "jobs": 2500,
  "sector": "tech",
  "month": "May",
  "reason": "AI restructuring"
}
```

**Sector options:** `tech` | `finance` | `energy` | `retail` | `health` | `other`

### Updating summary stats

Update the `summary` object at the top of the JSON with new aggregate numbers when available.

### Updating the last_updated date

Change `meta.last_updated` to today's date in `YYYY-MM-DD` format.

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy anywhere that serves static files — Vercel, Render static site, GitHub Pages, Netlify, etc.

## Data Sources

- https://layoffhedge.com/company/
- https://intellizence.com/insights/layoff-downsizing/major-companies-that-announced-mass-layoffs/
- https://www.trueup.io/layoffs
- https://layoffalert.org/layoffs-2026
- https://www.cheapism.com/2026-layoffs-major-american-companies/

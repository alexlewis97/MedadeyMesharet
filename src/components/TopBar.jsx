import React from 'react'
import { META, DIVISIONS } from '../data.js'

const PERIODS = ['רבעון אחרון', 'רבעון קודם', 'שנה נוכחית', 'שנה קודמת']
const RANKS = ['כל הדרגות', 'סמל - רס"ל', 'רס"ר - רס"ן', 'סא"ל ומעלה']

export default function TopBar({ filters, onChange }) {
  return (
    <div className="topbar">
      <div className="filters">
        <FilterSelect
          value={filters.division || 'כל החטיבות'}
          options={['כל החטיבות', ...DIVISIONS.map((d) => d.name)]}
          onChange={(v) => onChange({ ...filters, division: v === 'כל החטיבות' ? null : v })}
        />
        <FilterSelect
          value={filters.period}
          options={PERIODS}
          onChange={(v) => onChange({ ...filters, period: v })}
        />
        <FilterSelect
          value={filters.rank}
          options={RANKS}
          onChange={(v) => onChange({ ...filters, rank: v })}
        />
      </div>
      <div className="update-tag">
        עדכון אחרון: פברואר {META.period.year}
        <span className="dot" />
      </div>
    </div>
  )
}

function FilterSelect({ value, options, onChange }) {
  return (
    <div className="filter">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="chev">▾</span>
    </div>
  )
}

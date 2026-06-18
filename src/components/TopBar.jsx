import React, { useState, useRef, useEffect } from 'react'
import { META, DIVISIONS } from '../data.js'

const PERIODS = ['רבעון אחרון', 'רבעון קודם', 'שנה נוכחית', 'שנה קודמת']

export default function TopBar({ filters, onChange, periodDisabled }) {
  return (
    <div className="topbar">
      <div className="filters">
        <FilterSelect
          value={filters.division || 'כל החטיבות'}
          options={['כל החטיבות', ...DIVISIONS.map((d) => d.name)]}
          active={!!filters.division}
          onChange={(v) => onChange({ ...filters, division: v === 'כל החטיבות' ? null : v })}
        />
        <FilterSelect
          value={filters.period}
          options={PERIODS}
          active={filters.period !== 'רבעון אחרון'}
          disabled={periodDisabled}
          onChange={(v) => onChange({ ...filters, period: v })}
        />
      </div>
      <div className="update-tag">
        עדכון אחרון: פברואר {META.period.year}
        <span className="dot" />
      </div>
    </div>
  )
}

function FilterSelect({ value, options, active, disabled, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // סגירה בלחיצה מחוץ לרכיב
  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div className={'filter' + (active ? ' active' : '') + (disabled ? ' disabled' : '')} ref={ref}>
      <button className="filter-btn" onClick={() => !disabled && setOpen((o) => !o)} disabled={disabled}>
        <span className="filter-value">{value}</span>
        <svg className={'chev' + (open ? ' rot' : '')} width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && !disabled && (
        <div className="filter-menu">
          {options.map((o) => (
            <button
              key={o}
              className={'filter-option' + (o === value ? ' selected' : '')}
              onClick={() => {
                onChange(o)
                setOpen(false)
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

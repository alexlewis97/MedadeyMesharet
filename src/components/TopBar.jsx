import React from 'react'
import { META } from '../data.js'

const FILTERS = ['רבעון אחרון', 'כל האוכלוסיות', 'כל הדרגות', 'כל המשרדים', 'כל החטיבות']

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="filters">
        {FILTERS.map((f) => (
          <div className="filter" key={f}>
            {f}
            <span className="chev">▾</span>
          </div>
        ))}
      </div>
      <div className="update-tag">
        עדכון אחרון: פברואר {META.period.year}
        <span className="dot" />
      </div>
    </div>
  )
}

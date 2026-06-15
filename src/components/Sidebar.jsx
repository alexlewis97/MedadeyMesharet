import React from 'react'
import { CONTENT_WORLDS, worldScore, worldTarget, overallScore } from '../data.js'

export default function Sidebar({ active, onSelect }) {
  const overall = overallScore()
  return (
    <aside className="sidebar">
      <div className="brand">
        איכות השירות
        <span className="logo">לוגו</span>
      </div>

      <div className="nav-group-label">ראשי</div>
      <button
        className={'nav-item' + (active === '__home' ? ' active' : '')}
        onClick={() => onSelect('__home')}
      >
        <span className="num score-pill">{overall}</span>
        <span>תמונת מצב</span>
      </button>

      <div className="nav-group-label">תחומים</div>
      {CONTENT_WORLDS.map((w) => {
        const s = worldScore(w)
        const delta = s - worldTarget(w)
        return (
          <button
            key={w}
            className={'nav-item' + (active === w ? ' active' : '')}
            onClick={() => onSelect(w)}
          >
            <span className={'num ' + (delta >= 0 ? 'up' : 'down')}>
              {Math.abs(delta)} {delta >= 0 ? '↑' : '↓'}
            </span>
            <span>{w}</span>
            <span className="score-pill">{s}</span>
          </button>
        )
      })}

      <div className="sidebar-footer">
        <span>פותח ע"י יחידת שחר</span>
        <img className="footer-logo" src="/shahar.jpg" alt="יחידת שחר" />
        <img className="footer-logo" src="/bina.jpg" alt="בינה" />
      </div>
    </aside>
  )
}

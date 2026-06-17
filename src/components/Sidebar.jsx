import React from 'react'
import { CONTENT_WORLDS, worldScore, overallScore } from '../data.js'

export default function Sidebar({ active, onSelect }) {
  const overall = overallScore()
  return (
    <aside className="sidebar">
      <div className="brand">
        <img className="brand-logo" src="/bina.jpg" alt="אגף התקשוב" />
        איכות השירות
      </div>

      <div className="nav-group-label">ראשי</div>
      <button
        className={'nav-item' + (active === '__home' ? ' active' : '')}
        onClick={() => onSelect('__home')}
      >
        <span>תמונת מצב</span>
        <span className="num score-pill">{overall}</span>
      </button>

      <div className="nav-group-label">תחומים</div>
      {CONTENT_WORLDS.map((w) => {
        const s = worldScore(w)
        return (
          <button
            key={w}
            className={'nav-item' + (active === w ? ' active' : '')}
            onClick={() => onSelect(w)}
          >
            <span>{w}</span>
            <span className="score-pill">{s}</span>
          </button>
        )
      })}

      <div className="sidebar-footer">
        <img className="footer-logo" src="/shahar.jpg" alt="יחידת שחר" />
        <img className="footer-logo" src="/bina.jpg" alt="חטיבת בינה" />
        <span>פותח ע"י יחידת שחר</span>
      </div>
    </aside>
  )
}

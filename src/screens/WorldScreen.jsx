import React, { useState } from 'react'
import {
  metricsOfWorld, worldScore, worldTarget, metricScoresByEntity,
} from '../data.js'

export default function WorldScreen({ world, onOpenUnit }) {
  const [drill, setDrill] = useState(null) // null = חטיבות, אחרת שם חטיבה -> יחידות
  const defs = metricsOfWorld(world)
  const score = worldScore(world)
  const delta = score - worldTarget(world)

  return (
    <div>
      <h1 className="page-title">
        <span>{world}</span>
        {score}
        <span className={'delta ' + (delta >= 0 ? 'up' : 'down')}>
          {Math.abs(delta)}{delta >= 0 ? '↑' : '↓'}
        </span>
      </h1>

      <div className="breadcrumb">
        {drill ? (
          <>
            <button onClick={() => setDrill(null)}>כל החטיבות</button>
            <span>›</span>
            <span>{drill} — לחיצה על יחידה לפירוט הקטגוריות</span>
          </>
        ) : (
          <span>לחיצה על חטיבה להצגת היחידות שתחתיה</span>
        )}
      </div>

      {/* לכל מדד - גרף עמודות; עד 2 גרפים בשורה */}
      <div className="metrics-grid">
        {defs.map((def) => (
          <MetricScores
            key={def.metric}
            def={def}
            drill={drill}
            onDrill={setDrill}
            onOpenUnit={(unit) => onOpenUnit(world, drill, unit)}
          />
        ))}
      </div>
    </div>
  )
}

function MetricScores({ def, drill, onDrill, onOpenUnit }) {
  const rows = metricScoresByEntity(def.world, def.metric, drill)
  const max = Math.max(...rows.map((r) => r.score))

  return (
    <div className="panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 className="panel-title">{def.metric}</h3>
          <p className="panel-sub">
            ציון לכל {drill ? 'יחידה' : 'חטיבה'} מול היעד · {def.period === 'annual' ? 'שנתי' : 'רבעוני'} ·{' '}
            {def.focus === 'positive' ? 'במיקוד חיובי' : 'במיקוד שלילי'}
          </p>
        </div>
      </div>

      <div
        className="bar-rank"
        style={{ gridTemplateColumns: `repeat(${rows.length}, 1fr)` }}
      >
        {rows.map((r) => (
          <div
            key={r.name}
            className="col clickable"
            onClick={() => (drill ? onOpenUnit(r.name) : onDrill(r.name))}
            title={drill ? 'הצג פירוט קטגוריות' : 'הצג יחידות'}
          >
            <div className="v">{r.score}</div>
            <div className="track">
              <div
                className="b"
                style={{
                  height: `${r.score}%`,
                  background: r.score === max ? 'var(--blue)' : 'var(--blue-soft)',
                }}
              />
              <div className="target-line" style={{ bottom: `${Math.min(98, r.target)}%` }} />

              <div className="bar-hover">
                <div className="bar-hover-head">
                  <span>{r.name}</span>
                  <span className="bh-target">יעד / {r.target}</span>
                  <strong>{r.score}</strong>
                </div>
                <div className="bar-hover-row">
                  <span className="bh-name">ציון נוכחי</span>
                  <span className="bh-val"><strong>{r.score}</strong></span>
                </div>
                <div className="bar-hover-row">
                  <span className="bh-name">יעד לפעם הבאה</span>
                  <span className="bh-val"><strong>{r.target}</strong></span>
                </div>
                <div className="bar-hover-row">
                  <span className="bh-name">אוכלוסיית המדד</span>
                  <span className="bh-val"><strong>{r.population}</strong></span>
                </div>
              </div>
            </div>
            <div className="lbl">{r.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

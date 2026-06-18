import React from 'react'
import { worldMetrics } from '../data.js'
import {
  DonutChart, CategoryBarChart, DivisionBarChart, DashedBar, PercentOnly, PALETTE,
} from '../components/Charts.jsx'

// מסך עולם תוכן - תצוגת תחקור עומק לכל המדדים בתחום
export default function WorldScreen({ world, division, onDivisionChange }) {
  const metrics = worldMetrics(world, division)
  const SMALL = ['percentOnly', 'dashedBar']
  const smallMetrics = metrics.filter((m) => SMALL.includes(m.graphType))
  const bigMetrics = metrics.filter((m) => !SMALL.includes(m.graphType))

  return (
    <div>
      <div className="world-title-row">
        <h1 className="page-title">
          <span>{world}</span>
        </h1>
        <div className="breadcrumb">
          <button onClick={() => onDivisionChange(null)}>כל החטיבות</button>
          {division && (
            <>
              <span>›</span>
              <span>{division} (יחידות)</span>
            </>
          )}
        </div>
      </div>

      {/* שורה עליונה - גרפים קטנים, בחצי גודל */}
      {smallMetrics.length > 0 && (
        <div className="metrics-grid-small">
          {smallMetrics.map((m) => (
            <MetricPanel key={m.metric} m={m} division={division} onDrill={onDivisionChange} small />
          ))}
        </div>
      )}

      {/* שורות הגרפים הגדולים */}
      <div className="metrics-grid">
        {bigMetrics.map((m) => (
          <MetricPanel key={m.metric} m={m} division={division} onDrill={onDivisionChange} />
        ))}
      </div>
    </div>
  )
}

function MetricPanel({ m, division, onDrill, small }) {
  return (
    <div className={'panel metric-panel' + (small ? ' metric-panel-small' : '')}>
      <div className="metric-head">
        <h3 className="panel-title">{m.metric}</h3>
        <p className="panel-sub">{m.note}</p>
      </div>

      <div className="metric-body">
        <MetricChart m={m} />
      </div>

      {/* ציוני החטיבות בתחתית הגרף - לחיצה על חטיבה לתחקור היחידות */}
      {m.scores.length > 0 && (
        <div className="score-strip">
          <div className="score-strip-title">התפלגות ציונים:</div>
          {m.scores.map((s) => (
            <button
              className={'score-strip-cell' + (s.isUnit ? '' : ' drillable')}
              key={s.fullName}
              onClick={() => !s.isUnit && onDrill(s.fullName)}
              title={s.isUnit ? '' : 'הצג יחידות'}
            >
              <div className="ss-score">{s.score}</div>
              <div className="ss-name">{s.name}</div>
            </button>
          ))}
          <div className="score-strip-cell total">
            <div className="ss-score">{m.totalScore}</div>
            <div className="ss-name">ציון אגפי</div>
          </div>
        </div>
      )}
    </div>
  )
}

function MetricChart({ m }) {
  switch (m.graphType) {
    case 'donut':
      return (
        <div className="chart-with-legend">
          <DonutChart
            data={m.categories.map((c, i) => ({ name: c, value: m.counts[i] }))}
            size={180}
            centerTop={m.total.toLocaleString()}
            centerBottom={m.unit}
          />
          <Legend categories={m.categories} percentages={m.percentages} />
        </div>
      )

    case 'survey':
      return <CategoryBarChart categories={m.categories} counts={m.percentages} height={220} suffix="%" />

    case 'bar':
      return <CategoryBarChart categories={m.categories} counts={m.counts} height={210} />

    case 'divisionBar':
      return <DivisionBarChart data={m.perDivision} valueUnit={m.valueUnit} height={220} />

    case 'dashedBar':
      return <DashedBar percent={m.singlePercent} count={m.singleCount} countUnit={m.countUnit} />

    case 'percentOnly':
      return <PercentOnly percent={m.singlePercent} note={m.note} />

    default:
      return null
  }
}

function Legend({ categories, percentages }) {
  return (
    <div className="metric-legend">
      {categories.map((c, i) => (
        <div className="ml-row" key={c}>
          <span className="ml-pct">{percentages[i]}%</span>
          <span className="ml-name">{c}</span>
          <span className="ml-sw" style={{ background: PALETTE[i % PALETTE.length] }} />
        </div>
      ))}
    </div>
  )
}

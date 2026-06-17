import React from 'react'
import { worldMetrics, worldScore, worldTarget } from '../data.js'
import {
  DonutChart, CategoryBarChart, DivisionBarChart, DashedBar, PercentOnly, PALETTE,
} from '../components/Charts.jsx'

// מסך עולם תוכן - תצוגת תחקור עומק לכל המדדים בתחום
export default function WorldScreen({ world, division }) {
  const metrics = worldMetrics(world, division)
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

      {division && (
        <div className="breadcrumb"><span>מסונן לפי: {division}</span></div>
      )}

      <div className="metrics-grid">
        {metrics.map((m) => (
          <MetricPanel key={m.metric} m={m} division={division} />
        ))}
      </div>
    </div>
  )
}

function MetricPanel({ m, division }) {
  // האם הסינון פעיל אך המדד לא מושפע ממנו
  const filterIgnored = division && !m.respondsToFilter

  return (
    <div className="panel metric-panel">
      <div className="metric-head">
        <h3 className="panel-title">
          {m.metric} <span className="metric-score">(ציון: {m.totalScore})</span>
        </h3>
        <p className="panel-sub">{m.note}</p>
        {filterIgnored && (
          <div className="filter-flag">מדד אגפי — אינו מושפע מסינון החטיבה</div>
        )}
      </div>

      <div className="metric-body">
        <MetricChart m={m} />
      </div>

      {/* ציוני החטיבות בתחתית הגרף */}
      {m.scores.length > 0 && (
        <div className="score-strip">
          <div className="score-strip-cell total">
            <div className="ss-score">{m.totalScore}</div>
            <div className="ss-name">סה"כ</div>
          </div>
          {m.scores.map((s) => (
            <div className="score-strip-cell" key={s.name}>
              <div className="ss-score">{s.score}</div>
              <div className="ss-name">{s.name}</div>
            </div>
          ))}
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
          <Legend categories={m.categories} percentages={m.percentages} />
          <DonutChart
            data={m.categories.map((c, i) => ({ name: c, value: m.counts[i] }))}
            size={180}
            centerTop={m.total.toLocaleString()}
            centerBottom={m.unit}
          />
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

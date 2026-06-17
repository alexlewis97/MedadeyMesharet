import React, { useState } from 'react'
import { DIVISIONS, worldMetrics, worldScore, worldTarget } from '../data.js'
import { DonutChart, PieChartSimple, CategoryBarChart, KpiPercent, PALETTE } from '../components/Charts.jsx'

// מסך עולם תוכן מאוחד - כל המדדים, ברירת מחדל כל היחידות + סינון לפי חטיבה
export default function WorldScreen({ world }) {
  const [division, setDivision] = useState(null) // null = כל היחידות
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

      {/* סינון לפי חטיבה */}
      <div className="metric-tabs">
        <button
          className={'metric-tab' + (division === null ? ' active' : '')}
          onClick={() => setDivision(null)}
        >
          כל החטיבות
        </button>
        {DIVISIONS.map((d) => (
          <button
            key={d.name}
            className={'metric-tab' + (division === d.name ? ' active' : '')}
            onClick={() => setDivision(d.name)}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="metrics-grid">
        {metrics.map((m) => (
          <MetricPanel key={m.metric} m={m} division={division} />
        ))}
      </div>
    </div>
  )
}

function MetricPanel({ m, division }) {
  return (
    <div className="panel metric-panel">
      <div>
        <h3 className="panel-title">{m.metric}</h3>
        <p className="panel-sub">
          {division ? `יחידות ${division}` : 'ממוצע / התפלגות בחטיבות'} ·{' '}
          {m.period === 'annual' || m.period === '2026' ? 'שנתי' : 'רבעוני'}
        </p>
      </div>

      <MetricChart m={m} />

      {/* התפלגות ציונים - לכל חטיבה/יחידה בתחתית הגרף */}
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
    </div>
  )
}

function MetricChart({ m }) {
  // bar = כמויות ; donut/pie = אחוזים ; kpi = מדד בינארי אחוזי
  if (m.graphType === 'bar') {
    return <CategoryBarChart categories={m.categories} counts={m.counts} height={210} />
  }

  if (m.graphType === 'kpi') {
    // אחוז הקטגוריה הראשונה (החיובית)
    const percent = m.percentages[0] || 0
    return (
      <div className="chart-with-legend">
        <KpiPercent percent={percent} label={m.categories[0]} size={170} />
        <Legend categories={m.categories} percentages={m.percentages} />
      </div>
    )
  }

  // donut (עם מרכז סה"כ) או pie
  return (
    <div className="chart-with-legend">
      <Legend categories={m.categories} percentages={m.percentages} />
      {m.graphType === 'donut' ? (
        <DonutChart
          data={m.categories.map((c, i) => ({ name: c, value: m.counts[i] }))}
          size={180}
          centerTop={m.total.toLocaleString()}
          centerBottom={m.unit}
        />
      ) : (
        <PieChartSimple
          data={m.categories.map((c, i) => ({ name: c, value: m.counts[i] }))}
          size={180}
        />
      )}
    </div>
  )
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

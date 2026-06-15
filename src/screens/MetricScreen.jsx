import React from 'react'
import { unitBreakdown } from '../data.js'
import { DonutChart, CategoryBarChart, PALETTE } from '../components/Charts.jsx'

// מסך 3 - פירוט הקטגוריות עבור יחידה ספציפית, לכל מדדי עולם התוכן
export default function MetricScreen({ world, division, unit, onBack }) {
  const metrics = unitBreakdown(world, unit)

  return (
    <div>
      <h1 className="page-title">
        <span>{world}</span>
      </h1>

      <div className="breadcrumb">
        <button onClick={onBack}>{world}</button>
        <span>›</span>
        <span>{division}</span>
        <span>›</span>
        <span>{unit}</span>
      </div>

      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="panel" key={m.metric}>
            <div>
              <h3 className="panel-title">{m.metric}</h3>
              <p className="panel-sub">
                כמות בכל קטגוריה · יחידת מדידה: {m.unit} ·{' '}
                {m.period} · {graphLabel(m.graphType)}
              </p>
            </div>

            <div className="legend">
              {m.categories.map((c, i) => (
                <div className="it" key={c}>
                  <span className="sw" style={{ background: PALETTE[i % PALETTE.length] }} />
                  {c}
                </div>
              ))}
            </div>

            {m.graphType === 'bar' || m.graphType === 'number' ? (
              <CategoryBarChart categories={m.categories} counts={m.counts} height={220} />
            ) : (
              <DonutChart
                data={m.categories.map((c, i) => ({ name: c, value: m.counts[i] }))}
                size={200}
              />
            )}

            <div className="chart-caption">
              סה"כ {m.counts.reduce((s, x) => s + x, 0).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function graphLabel(t) {
  if (t === 'bar') return 'תרשים עמודות'
  if (t === 'number') return 'תצוגת עמודות'
  return 'תרשים עוגה'
}

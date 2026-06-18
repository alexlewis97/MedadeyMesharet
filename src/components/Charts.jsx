import React from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts'

// פלטת צבעים בהשראת ה-figma (כחולים וסגולים)
export const PALETTE = ['#1f2a52', '#2f6bff', '#7b8ff0', '#9d7bd8', '#c3b6e8']

export function DonutChart({ data, size = 170, centerTop, centerBottom }) {
  // data: [{ name, value }]
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={size * 0.3}
            outerRadius={size / 2 - 6}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            stroke="#fff"
            strokeWidth={2}
            cornerRadius={6}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<PieTip total={total} />} wrapperStyle={{ direction: 'rtl' }} />
        </PieChart>
      </ResponsiveContainer>
      {(centerTop || centerBottom) && (
        <div className="donut-center">
          {centerTop && <div className="donut-center-top">{centerTop}</div>}
          {centerBottom && <div className="donut-center-bottom">{centerBottom}</div>}
        </div>
      )}
    </div>
  )
}

export function PieChartSimple({ data, size = 170 }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  return (
    <div style={{ width: size, height: size, margin: '0 auto' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={0}
            outerRadius={size / 2 - 4}
            startAngle={90}
            endAngle={-270}
            stroke="#fff"
            strokeWidth={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<PieTip total={total} />} wrapperStyle={{ direction: 'rtl' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// מד KPI אחוזי למדד בינארי
export function KpiPercent({ percent, label, size = 170 }) {
  const data = [
    { name: 'חיובי', value: percent },
    { name: 'יתר', value: 100 - percent },
  ]
  return (
    <div style={{ width: size, height: size, margin: '0 auto', position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={size * 0.34}
            outerRadius={size / 2 - 6}
            startAngle={90}
            endAngle={-270}
            stroke="none"
            cornerRadius={8}
          >
            <Cell fill="#2f6bff" />
            <Cell fill="#eef1f8" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <div className="donut-center-top" style={{ color: '#2f6bff' }}>{percent}%</div>
        {label && <div className="donut-center-bottom">{label}</div>}
      </div>
    </div>
  )
}

function PieTip({ active, payload, total }) {
  if (!active || !payload || !payload.length) return null
  const p = payload[0]
  return (
    <div className="tooltip-box">
      {p.name}: {p.value} ({Math.round((p.value / total) * 100)}%)
    </div>
  )
}

// תווית ציר עכביש - שם עולם התוכן + ציון/יעד. בצדדים: בשורה אחת מקבילה לקצה
function WorldTick({ x, y, payload, data, cx, cy }) {
  const item = data.find((d) => d.axis === payload.value)
  const score = item ? item.score : 0
  const target = item ? item.target : 100

  // הסטה רדיאלית החוצה מהמרכז כדי שהתוויות לא יתנגשו עם הפוליגון
  const dx = x - cx
  const dy = y - cy
  const isMiddle = Math.abs(dx) < 30
  // לצדדים דרושה הסטה אופקית גדולה יותר, לעליון/תחתון מספיק מעט
  const PUSH = isMiddle ? 16 : 80
  const tx = isMiddle ? x : x + (dx > 0 ? PUSH : -PUSH)
  const ty = isMiddle ? y + (dy < 0 ? -PUSH : PUSH) : y

  const badgeW = 32
  const badgeH = 21
  const gap = 6
  const badgesW = badgeW * 2 + gap

  // כל התוויות באותו מבנה: שם למעלה, שתי תגיות (ציון/יעד) ממורכזות מתחתיו
  const nameY = ty - 10
  const badgeY = ty + 4
  const badgesX = tx - badgesW / 2

  return (
    <g>
      <text x={tx} y={nameY} textAnchor="middle" fill="#3a3f5c" fontSize="13" fontWeight="700">
        {payload.value}
      </text>
      <g transform={`translate(${badgesX}, ${badgeY})`}>
        <rect width={badgeW} height={badgeH} rx="6" fill="#e8edff" />
        <text x={badgeW / 2} y={badgeH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="#4762e5" fontSize="12" fontWeight="700">{score}</text>
      </g>
      <g transform={`translate(${badgesX + badgeW + gap}, ${badgeY})`}>
        <rect width={badgeW} height={badgeH} rx="6" fill="#ece9fb" />
        <text x={badgeW / 2} y={badgeH / 2 + 1} textAnchor="middle" dominantBaseline="central" fill="#8b7fe8" fontSize="12" fontWeight="700">{target}</text>
      </g>
    </g>
  )
}

function SpiderLegend() {
  return (
    <div className="radar-legend">
      <span className="rdl-item"><span className="rdl-sw score" /> ציון</span>
      <span className="rdl-item"><span className="rdl-sw target" /> יעד</span>
    </div>
  )
}

export function SpiderChart({ data, height = 345 }) {
  // data: [{ axis, score, target }]
  return (
    <div style={{ position: 'relative' }}>
      <SpiderLegend />
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RadarChart data={data} outerRadius="78%" margin={{ top: 70, right: 130, bottom: 70, left: 130 }}>
            <PolarGrid stroke="#d4d9e6" strokeDasharray="5 5" gridType="polygon" />
            <PolarAngleAxis dataKey="axis" tick={<WorldTick data={data} />} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            {/* יעד - סגול */}
            <Radar name="יעד" dataKey="target" stroke="#8b7fe8" strokeWidth={2} fill="#8b7fe8" fillOpacity={0.12} />
            {/* ציון - כחול */}
            <Radar name="ציון" dataKey="score" stroke="#4762e5" strokeWidth={2.5} fill="#4762e5" fillOpacity={0.28} />
            <Tooltip content={<RadarTip />} wrapperStyle={{ direction: 'rtl' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RadarTip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  const score = payload.find((p) => p.dataKey === 'score')?.value
  const target = payload.find((p) => p.dataKey === 'target')?.value
  return (
    <div className="tooltip-box">
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div style={{ color: '#2f6bff' }}>ציון: {score}</div>
      <div style={{ color: '#9db9ff' }}>יעד: {target}</div>
    </div>
  )
}

export function CategoryBarChart({ categories, counts, height = 220, suffix = '' }) {
  const data = categories.map((c, i) => ({ name: c, value: counts[i] }))
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 4 }}>
          <XAxis dataKey="name" reversed tick={{ fontSize: 11, fill: '#8b90a9' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<BarTip suffix={suffix} />} wrapperStyle={{ direction: 'rtl' }} cursor={{ fill: 'rgba(47,107,255,0.06)' }} />
          <Bar dataKey="value" radius={[10, 10, 4, 4]} label={{ position: 'top', fontSize: 12, fill: '#1f2547', formatter: (v) => `${v}${suffix}` }}>
            {data.map((_, i) => (
              <Cell key={i} fill="#2f6bff" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function BarTip({ active, payload, label, suffix = '' }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="tooltip-box">
      {label}: {payload[0].value}{suffix}
    </div>
  )
}

// גרף עמודות לפי חטיבה - ערך (אחוז או כמות) לכל חטיבה
export function DivisionBarChart({ data, valueUnit = 'percent', height = 210 }) {
  // data: [{ name, value }]
  const max = Math.max(...data.map((d) => d.value), valueUnit === 'percent' ? 100 : 1)
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 24, right: 8, left: 8, bottom: 4 }} barCategoryGap="25%">
          <XAxis dataKey="name" reversed tick={{ fontSize: 11, fill: '#8b90a9' }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, max]} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload && payload.length ? (
                <div className="tooltip-box">
                  {label}: {payload[0].value}{valueUnit === 'percent' ? '%' : ''}
                </div>
              ) : null
            }
            wrapperStyle={{ direction: 'rtl' }}
            cursor={{ fill: 'rgba(47,107,255,0.06)' }}
          />
          <Bar
            dataKey="value"
            radius={[10, 10, 4, 4]}
            label={{
              position: 'top',
              fontSize: 12,
              fontWeight: 700,
              fill: '#1f2547',
              formatter: (v) => (valueUnit === 'percent' ? `${v}%` : v),
            }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill="#2f6bff" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// מד אחוז בסגמנטים - אחוז גדול + כמות, ושורת "כדורים" שמתמלאת מימין לפי האחוז
export function DashedBar({ percent, count, countUnit }) {
  const SEGMENTS = 12
  const filled = Math.round((percent / 100) * SEGMENTS)
  return (
    <div className="seg-bar">
      <div className="seg-bar-head">
        <span className="seg-bar-pct">{percent}%</span>
        <span className="seg-bar-count">{count.toLocaleString()} {countUnit}</span>
      </div>
      <div className="seg-bar-track">
        {Array.from({ length: SEGMENTS }).map((_, i) => (
          // מילוי מימין: הכדורים הימניים (האינדקסים הגבוהים) נדלקים
          <span key={i} className={'seg-pill' + (i >= SEGMENTS - filled ? ' on' : '')} />
        ))}
      </div>
    </div>
  )
}

// תצוגת אחוז בלבד (ללא גרף)
export function PercentOnly({ percent, note }) {
  return (
    <div className="percent-only">
      <div className="percent-only-num">{percent}%</div>
      {note && <div className="percent-only-note">{note}</div>}
    </div>
  )
}

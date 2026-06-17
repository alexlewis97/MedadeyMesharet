import React from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
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
          <Tooltip content={<PieTip total={total} />} />
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
          <Tooltip content={<PieTip total={total} />} />
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

// תווית ציר עכביש - שם עולם התוכן + ציון/יעד מתחתיו
function WorldTick({ x, y, payload, data }) {
  const item = data.find((d) => d.axis === payload.value)
  return (
    <g>
      <text x={x} y={y} textAnchor="middle" fill="#3a3f5c" fontSize="12" fontWeight="600">
        {payload.value}
      </text>
      {item && (
        <text x={x} y={y + 16} textAnchor="middle" fontSize="11">
          <tspan fill="#2f6bff" fontWeight="700">{item.score}</tspan>
          <tspan fill="#aeb2c7"> / {item.target}</tspan>
        </text>
      )}
    </g>
  )
}

export function SpiderChart({ data, height = 340 }) {
  // data: [{ axis, score, target }]
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="68%" margin={{ top: 30, right: 60, bottom: 20, left: 60 }}>
          <PolarGrid stroke="#e3e7f2" />
          <PolarAngleAxis dataKey="axis" tick={<WorldTick data={data} />} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="יעד" dataKey="target" stroke="#9db9ff" fill="#9db9ff" fillOpacity={0.35} />
          <Radar name="ציון" dataKey="score" stroke="#3a3aff" fill="#5b6dff" fillOpacity={0.45} />
          <Tooltip content={<RadarTip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
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

export function CategoryBarChart({ categories, counts, height = 220 }) {
  const data = categories.map((c, i) => ({ name: c, value: counts[i] }))
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 8, left: 8, bottom: 4 }}>
          <XAxis dataKey="name" reversed tick={{ fontSize: 11, fill: '#8b90a9' }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip content={<BarTip />} cursor={{ fill: 'rgba(47,107,255,0.06)' }} />
          <Bar dataKey="value" radius={[10, 10, 4, 4]} label={{ position: 'top', fontSize: 12, fill: '#1f2547' }}>
            {data.map((_, i) => (
              <Cell key={i} fill={i === maxIndex(counts) ? '#2f6bff' : '#9db9ff'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function maxIndex(arr) {
  let mi = 0
  for (let i = 1; i < arr.length; i++) if (arr[i] > arr[mi]) mi = i
  return mi
}

function BarTip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="tooltip-box">
      {label}: {payload[0].value}
    </div>
  )
}

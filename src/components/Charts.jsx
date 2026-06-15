import React from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts'

// פלטת צבעים בהשראת ה-figma
export const PALETTE = ['#f72585', '#2f6bff', '#9db9ff', '#f9a8cd', '#c7d6ff']

export function DonutChart({ data, size = 150 }) {
  // data: [{ name, value }]
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
            outerRadius={size / 2 - 6}
            startAngle={90}
            endAngle={-270}
            stroke="#fff"
            strokeWidth={2}
            label={({ value }) => `${Math.round((value / total) * 100)}%`}
            labelLine={false}
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
              <Cell key={i} fill={i === maxIndex(counts) ? '#f72585' : '#2f6bff'} />
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

import React, { useState } from 'react'
import {
  CONTENT_WORLDS, DIVISIONS, divisionScore, worldScore, worldTarget,
  metricsByFocus, overallScore,
} from '../data.js'
import { SpiderChart } from '../components/Charts.jsx'

export default function HomeScreen({ onOpenWorld }) {
  // drill-down: null = רמת חטיבות, אחרת שם החטיבה שנבחרה -> רמת יחידות
  const [drill, setDrill] = useState(null)

  const overall = overallScore()

  // דירוג חטיבות (או יחידות אם בוצע drill-down)
  const ranking = drill
    ? DIVISIONS.find((d) => d.name === drill).units.map((u) => ({
        name: u,
        score: unitOverall(drill, u),
      }))
    : DIVISIONS.map((d) => ({ name: d.name, score: divisionScore(d.name) }))

  ranking.sort((a, b) => a.score - b.score)

  // נתוני העכביש - ציון מול יעד לכל עולם תוכן (מסונן לפי drill אם קיים)
  const spider = CONTENT_WORLDS.map((w) => ({
    axis: w,
    score: worldScore(w, drill || undefined),
    target: 100,
  }))

  const positives = metricsByFocus('positive').slice(0, 4)
  const negatives = metricsByFocus('negative').slice(0, 4)

  return (
    <div>
      <h1 className="page-title">
        תמונת מצב
        <span className="delta up">{overall - 80}↑</span>
      </h1>

      {drill && (
        <div className="breadcrumb">
          <button onClick={() => setDrill(null)}>כל החטיבות</button>
          <span>›</span>
          <span>{drill}</span>
        </div>
      )}

      <div className="grid-2">
        {/* גרף העכביש - מימין, צמוד לסרגל הצד */}
        <div className="panel">
          <h3 className="panel-title">תחומים {drill ? `— ${drill}` : ''}</h3>
          <SpiderChart data={spider} />
        </div>

        {/* דירוג איכות השירות בחטיבות - משמאל */}
        <div className="panel">
          <h3 className="panel-title">דירוג איכות השירות {drill ? 'ביחידות' : 'בחטיבות'}</h3>
          <p className="panel-sub">
            {drill ? `יחידות תחת ${drill} — לחיצה לחזרה` : 'לחיצה על חטיבה לפירוט היחידות'}
          </p>
          <div className="bar-rank">
            {ranking.map((r) => (
              <div
                key={r.name}
                className={'col' + (drill ? '' : ' clickable')}
                onClick={() => !drill && setDrill(r.name)}
                title={drill ? '' : 'הצג יחידות'}
              >
                <div className="v">{r.score}</div>
                <div className="track">
                  <div
                    className="b"
                    style={{
                      height: `${r.score}%`,
                      background: r.score === Math.max(...ranking.map((x) => x.score)) ? 'var(--blue)' : 'var(--blue-soft)',
                    }}
                  />
                  <div className="target-line" style={{ bottom: `${Math.min(98, r.score + 8)}%` }} />

                  {/* כרטיס hover - פירוט ציון מול יעד לכל עולם תוכן */}
                  <div className="bar-hover">
                    <div className="bar-hover-head">
                      <span>{r.name}</span>
                      <span className="bh-target">יעד / {Math.min(100, r.score + 14)}</span>
                      <strong>{r.score}</strong>
                    </div>
                    {CONTENT_WORLDS.map((w) => {
                      const s = drill ? worldScore(w, drill) : worldScore(w, r.name)
                      const t = worldTarget(w)
                      return (
                        <div className="bar-hover-row" key={w}>
                          <span className="bh-name">{w}</span>
                          <span className="bh-val">
                            <strong>{s}</strong> <small>/ {t}</small>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="lbl">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* חצי תחתון: מדדים בסיכון/במיקוד בחצי אחד, תובנות בחצי השני */}
      <div className="grid-2 section-gap bottom-split">
        <div className="grid-2">
          <FocusList title="מדדים בסיכון" items={negatives} onClick={onOpenWorld} />
          <FocusList title="מדדים במיקוד" items={positives} onClick={onOpenWorld} />
        </div>

        <div className="panel">
          <h3 className="panel-title">תובנות</h3>
          <div className="insights-grid">
            {INSIGHTS.map((t, i) => (
              <div className="insight" key={i}>
                <div className="t">{t}</div>
                <button className="more">
                  <span>‹</span>
                  העמקת תובנה
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FocusList({ title, items, onClick }) {
  return (
    <div className="metric-card">
      <div className="head">{title}</div>
      {items.map((m, i) => (
        <div className="metric-line" key={i}>
          <button
            className="info"
            style={{ border: 'none', background: 'none', textAlign: 'right', cursor: 'pointer' }}
            onClick={() => onClick(m.world)}
          >
            <div className="m">{m.metric}</div>
            <div className="w">{m.world}</div>
          </button>
          <div className="val" style={{ color: m.delta >= 0 ? 'var(--green)' : 'var(--red)' }}>
            {Math.abs(m.delta)} {m.delta >= 0 ? '↑' : '↓'}
          </div>
        </div>
      ))}
    </div>
  )
}

function unitOverall(division, unit) {
  // ממוצע ציוני היחידה על כל המדדים
  const rows = []
  for (const w of CONTENT_WORLDS) {
    rows.push(worldScore(w, division))
  }
  // נשתמש בערך פשוט מבוסס שם כדי לייצר שונות בין יחידות
  let h = 0
  for (const c of unit) h = (h * 31 + c.charCodeAt(0)) % 1000
  const base = Math.round(rows.reduce((s, x) => s + x, 0) / rows.length)
  return Math.max(40, Math.min(100, base - 6 + (h % 14)))
}

const INSIGHTS = [
  'חטיבת ספרה מציגה שיפור עקבי במדדי משאבי הזמן לעומת הרבעון הקודם, עם עלייה בניצול ימי החופשה.',
  'נרשמה ירידה בתחושת השחיקה ביחידות הסייבר, ייתכן כתוצאה מהפחתת עומסי המשמרות.',
  'מדד זמן הקליטה בשיוך וגיוס עדיין מעל היעד בשלוש חטיבות — מומלץ לבחון את תהליך הקליטה.',
  'שביעות הרצון משירותיות משופרת עלתה רוחבית, עם בולטות בחטיבת המערכות.',
]
